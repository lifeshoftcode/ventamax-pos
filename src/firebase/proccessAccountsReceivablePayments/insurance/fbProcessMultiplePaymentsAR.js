import { collection, doc, getDoc, getDocs, query, runTransaction, Timestamp, where, writeBatch } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../../firebaseconfig';
import { defaultPaymentsAR } from '../../../schema/accountsReceivable/paymentAR';
import { defaultInstallmentPaymentsAR } from '../../../schema/accountsReceivable/installmentPaymentsAR';
import { fbGetInvoice } from '../../invoices/fbGetInvoice';
import { fbAddAccountReceivablePaymentReceipt } from '../../accountsReceivable/fbAddAccountReceivablePaymentReceipt';

const THRESHOLD = 1e-10;
// Función mejorada para redondear a dos decimales y evitar problemas de precisión
const roundToTwoDecimals = (num) => {
    // Asegurarse de que el número no sea NaN o indefinido
    if (num === undefined || isNaN(num)) return 0;
    // Redondear a 2 decimales y convertir a número
    return parseFloat(parseFloat(num).toFixed(2));
};

/**
 * Procesa pagos múltiples para cuentas por cobrar de aseguradoras.
 * @param {Object} user - Usuario que realiza el pago
 * @param {Object} data - Datos del pago múltiple
 * @param {Function} callback - Función de callback para manejar el recibo generado
 * @returns {Promise<Object>} - Promesa que resuelve con el recibo de pago
 */
export const fbProcessMultiplePaymentsAR = async (user, data, callback) => {
    try {
        const { accounts, paymentDetails, insuranceId, clientId } = data;
        const { totalPaid, paymentMethods, comments } = paymentDetails;

        if (!user?.businessID) {
            throw new Error('ID de negocio del usuario no disponible');
        }

        if (!accounts || accounts.length === 0) {
            throw new Error('No hay cuentas seleccionadas para el pago');
        }

        if (!totalPaid || isNaN(parseFloat(totalPaid)) || parseFloat(totalPaid) <= 0) {
            throw new Error('El monto total pagado debe ser mayor a cero');
        }

        // Crear un ID único para el pago
        const paymentId = nanoid();
        
        // Usaremos un batch en lugar de una transacción para evitar el error
        const batch = writeBatch(db);
        
        // 1. Crear el registro de pago principal
        const paymentsRef = doc(db, "businesses", user.businessID, "accountsReceivablePayments", paymentId);
        const paymentData = {
            ...defaultPaymentsAR,
            id: paymentId,
            paymentMethods: paymentMethods.filter(pm => pm.status),
            totalPaid: parseFloat(totalPaid),
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            comments,
            createdUserId: user?.uid,
            updatedUserId: user?.uid,
            isActive: true,
            isInsurancePayment: true,
            insuranceId,
            clientId
        };        batch.set(paymentsRef, paymentData);
        
        // Inicializar el clientId con el valor por defecto
        let extractedClientId = clientId;
        let clientData = null;
        
        console.log('Procesando datos de cliente para las cuentas seleccionadas...');
        
        // Solo buscar en la ubicación específica: account.accountData.client.id
        if (accounts && accounts.length > 0) {
            for (let i = 0; i < accounts.length; i++) {
                const account = accounts[i];
                console.log(`Procesando cuenta ${i+1}:`, account?.id);
                
                // Buscar directamente en la ubicación específica
                if (account.accountData && account.accountData.client && account.accountData.client.id) {
                    const accountClientId = account.accountData.client.id;
                    console.log(`ID de cliente encontrado en cuenta ${i+1}:`, accountClientId);
                    
                    // Usar el cliente de cada cuenta individual
                    extractedClientId = accountClientId;
                    clientData = account.accountData.client;
                    // No hacemos break porque queremos usar el clientId de la última cuenta procesada
                }
            }
        }
        
        console.log('Cliente final seleccionado:', extractedClientId);
        
        // 2. Preparar información para el recibo con el ID de cliente correcto
        const paymentReceipt = {
            receiptId: nanoid(),
            paymentId,
            clientId: extractedClientId, // Usar el ID extraído en lugar del original
            insuranceId,
            businessId: user.businessID,
            createdAt: Timestamp.now(),
            createdBy: user.uid,
            accounts: [],
            totalAmount: parseFloat(totalPaid),
            paymentMethod: paymentMethods.filter(pm => pm.status),
            change: 0 // Inicialmente no hay cambio
        };
        
        // 3. Primero, recopilar todos los datos necesarios (accounts, installments, invoices)
        const accountsData = [];
        let remainingAmount = parseFloat(totalPaid);
        
        // Recopilación de datos - SOLO LECTURAS
        for (const account of accounts) {
            if (remainingAmount <= THRESHOLD) break;
            
            // Obtener los datos completos de la cuenta
            const accountRef = doc(db, "businesses", user.businessID, "accountsReceivable", account.id);
            const accountSnapshot = await getDoc(accountRef);
            
            if (!accountSnapshot.exists()) {
                console.warn(`La cuenta ${account.id} no existe, omitiendo...`);
                continue;
            }
            
            const accountData = accountSnapshot.data();
            
            // Obtener las cuotas activas para esta cuenta
            const installmentsRef = collection(db, "businesses", user.businessID, "accountsReceivableInstallments");
            const installmentsQuery = query(
                installmentsRef, 
                where('arId', '==', account.id), 
                where('isActive', '==', true)
            );
            const installmentsSnapshot = await getDocs(installmentsQuery);
            
            if (installmentsSnapshot.empty) {
                console.warn(`La cuenta ${account.id} no tiene cuotas activas, omitiendo...`);
                continue;
            }
            
            const installments = installmentsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            // Ordenar las cuotas por fecha
            installments.sort((a, b) => {
                // Manejar valores nulos
                if (!a.installmentDate) return 1;
                if (!b.installmentDate) return -1;
                return a.installmentDate.toMillis ? 
                    (a.installmentDate.toMillis() - b.installmentDate.toMillis()) : 
                    (a.installmentDate - b.installmentDate);
            });
            
            // Obtener la factura si existe
            let invoiceData = null;
            if (accountData.invoiceId) {
                const invoice = await fbGetInvoice(user.businessID, accountData.invoiceId);
                if (invoice) {
                    invoiceData = invoice.data;
                }
            }
            
            // Guardar todos los datos recopilados
            accountsData.push({
                accountData,
                accountRef,
                installments,
                invoiceData,
                invoiceRef: invoiceData ? doc(db, "businesses", user.businessID, "invoices", accountData.invoiceId) : null
            });
        }
        
        // 4. Procesar pagos y preparar actualizaciones - AHORA REALIZAMOS LAS ESCRITURAS
        remainingAmount = parseFloat(totalPaid); // Reiniciar el monto restante
        
        for (const { accountData, accountRef, installments, invoiceData, invoiceRef } of accountsData) {
            if (remainingAmount <= THRESHOLD) break;
            
            // Procesar cada cuota
            let accountTotalPaid = 0;
            const paidInstallments = [];
            const installmentUpdates = [];
            const installmentPayments = [];
            
            for (const installment of installments) {
                if (remainingAmount <= THRESHOLD) break;
                
                // Aplicar el pago a esta cuota
                const amountToApply = Math.min(remainingAmount, parseFloat(installment.installmentBalance || 0));
                const newInstallmentBalance = roundToTwoDecimals(parseFloat(installment.installmentBalance || 0) - amountToApply);
                
                // Preparar actualización de cuota
                const installmentRef = doc(db, "businesses", user.businessID, "accountsReceivableInstallments", installment.id);
                batch.update(installmentRef, {
                    installmentBalance: newInstallmentBalance,
                    isActive: newInstallmentBalance > THRESHOLD
                });
                
                // Preparar registro de pago de cuota
                const installmentPaymentRef = doc(collection(db, "businesses", user.businessID, "accountsReceivableInstallmentPayments"));
                batch.set(installmentPaymentRef, {
                    ...defaultInstallmentPaymentsAR,
                    id: nanoid(),
                    installmentId: installment.id,
                    paymentId: paymentId,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                    paymentAmount: roundToTwoDecimals(amountToApply),
                    createdBy: user.uid,
                    updatedBy: user.uid,
                    isActive: true,
                    clientId,
                    arId: accountData.id,
                    insuranceId
                });
                
                // Registrar para el recibo
                paidInstallments.push({
                    number: installment.installmentNumber,
                    id: installment.id,
                    amount: roundToTwoDecimals(amountToApply),
                    status: newInstallmentBalance <= THRESHOLD ? 'paid' : 'partial',
                    remainingBalance: newInstallmentBalance
                });
                
                remainingAmount = roundToTwoDecimals(remainingAmount - amountToApply);
                accountTotalPaid = roundToTwoDecimals(accountTotalPaid + amountToApply);
            }
            
            // Si se aplicó algún pago, actualizar la cuenta
            if (accountTotalPaid > 0) {
                // Actualizar el balance de la cuenta
                const newArBalance = roundToTwoDecimals(parseFloat(accountData.arBalance || 0) - accountTotalPaid);
                const updatedPaidInstallments = [
                    ...(accountData.paidInstallments || []),
                    ...paidInstallments.filter(p => p.status === 'paid').map(p => p.id)
                ];
                
                batch.update(accountRef, {
                    arBalance: newArBalance,
                    lastPaymentDate: Timestamp.now(),
                    lastPayment: accountTotalPaid,
                    isActive: newArBalance > THRESHOLD,
                    isClosed: newArBalance <= THRESHOLD,
                    paidInstallments: updatedPaidInstallments
                });
                
                // Actualizar la factura si existe
                if (invoiceRef && invoiceData) {
                    const currentTotalPaid = invoiceData.totalPaid || 0;
                    const newTotalPaid = roundToTwoDecimals(currentTotalPaid + accountTotalPaid);
                    const newBalanceDue = roundToTwoDecimals(invoiceData.totalAmount - newTotalPaid);
                    
                    batch.update(invoiceRef, {
                        totalPaid: newTotalPaid,
                        balanceDue: newBalanceDue,
                        status: newBalanceDue <= THRESHOLD
                    });
                }
                
                // Agregar al recibo
                paymentReceipt.accounts.push({
                    arNumber: accountData.numberId,
                    arId: accountData.id,
                    invoiceNumber: invoiceData?.numberID,
                    invoiceId: invoiceData?.id,
                    paidInstallments,
                    remainingInstallments: accountData.totalInstallments - updatedPaidInstallments.length,
                    totalInstallments: accountData.totalInstallments,
                    totalPaid: accountTotalPaid,
                    arBalance: newArBalance,
                    insuranceName: accountData?.insurance?.name,
                    insuranceId: accountData?.insurance?.insuranceId
                });
            }
        }
        
        // Registrar cualquier cambio/devolución
        paymentReceipt.change = remainingAmount > 0 ? remainingAmount : 0;
          // Guardar el recibo en la colección paymentReceipts (para compatibilidad)
        const receiptRef = doc(db, "businesses", user.businessID, "paymentReceipts", paymentReceipt.receiptId);
        batch.set(receiptRef, paymentReceipt);
        
        // Ejecutar el batch con todas las operaciones
        await batch.commit();
          // Verificar que el clientId extraído sea válido antes de usarlo
        // Si no es válido, simplemente no pasamos el clientId para evitar errores
        let receiptParams = {
            user,
            paymentReceipt
        };
        
        // Solo incluir el clientId si es una cadena válida
        if (extractedClientId && typeof extractedClientId === 'string' && extractedClientId.trim() !== '') {
            console.log('Usando clientId válido para el recibo:', extractedClientId);
            receiptParams.clientId = extractedClientId;
        } else {
            console.log('No se pudo obtener un clientId válido para el recibo');
        }
        
        // Crear el recibo en la colección correcta: accountsReceivablePaymentReceipt
        const fullReceipt = await fbAddAccountReceivablePaymentReceipt(receiptParams);
        
        // Ejecutar callback con el recibo de pago completo
        if (callback) {
            callback(fullReceipt);
        }
        
        return fullReceipt;
    } catch (error) {
        console.error('Error procesando pagos múltiples:', error);
        throw error;
    }
};