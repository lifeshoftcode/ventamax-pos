import { validateInvoiceCart } from "../../utils/invoiceValidation";
import { getCashCountStrategy } from "../../notification/cashCountNotification/cashCountNotificacion";
import { checkOpenCashReconciliation } from "../../firebase/cashCount/useIsOpenCashReconciliation";
import { fbGetAndUpdateTaxReceipt } from "../../firebase/taxReceipt/fbGetAndUpdateTaxReceipt";
import { fbUpsertClient } from "../../firebase/client/fbUpsertClient";
import { GenericClient } from "../../features/clientCart/clientCartSlice";
import { fbUpdateProductsStock } from "../../firebase/products/fbUpdateProductsStock";
import { fbAddInvoice } from "../../firebase/invoices/fbAddInvoice";
import { fbAddAR } from "../../firebase/accountsReceivable/fbAddAR";
import { fbAddInstallmentAR } from "../../firebase/accountsReceivable/fbAddInstallmentAR";
import { fbGenerateInvoiceFromPreorder } from "../../firebase/invoices/fbGenerateInvoiceFromPreorder";
import { Timestamp } from "firebase/firestore";
import { DateTime } from "luxon";
import { getInsurance } from "../../firebase/insurance/insuranceService";
import { addInsuranceAuth } from "../../firebase/insurance/insuranceAuthService";

const NCF_TYPES = {
    'CREDITO FISCAL': 'CREDITO FISCAL',
    'CONSUMIDOR FINAL': 'CONSUMIDOR FINAL'
}

export async function processInvoice({
    user,
    cart,
    client,
    accountsReceivable,
    insuranceAR,
    insuranceAuth,
    ncfType,
    taxReceiptEnabled = false,
    setLoading = () => { },
    dispatch,
    dueDate = null,
    insuranceEnabled = false,
    isTestMode = false,
}) {
    try {
        setLoading({ status: true, message: "Procesando factura..." });
        verifyCartItems(cart);

        // En modo de prueba, mostrar notificación y procesar sin guardar en base de datos
        if (isTestMode) {
            setLoading({ status: true, message: "Procesando factura en modo prueba..." });
            return await processTestModeInvoice({
                user,
                cart,
                client,
                accountsReceivable,
                insuranceAR,
                insuranceAuth,
                ncfType,
                taxReceiptEnabled,
                dueDate,
                insuranceEnabled,
            });
        }

        const { cashCount } = await validateCashReconciliation({ user, dispatch, });

        if (!cashCount) {
            throw new Error('No se puede procesar la factura sin cuadre de caja');
        }

        const [ncfCode, clientData] = await Promise.all([
            handleTaxReceiptGeneration({ user, taxReceiptEnabled, ncfType }),
            retrieveAndUpdateClientData({ user, client }),
        ]);

        const invoice = cart?.preorderDetails?.isOrWasPreorder
            ? await generalInvoiceFromPreorder({ user, cart, cashCount, ncfCode })
            : await generateFinalInvoice({ user, cart, clientData, ncfCode, cashCount, dueDate });

        await adjustProductInventory({ user, products: cart.products, invoice });

        // Procesar cuentas por cobrar normales si existen
        console.log("cart?.isAddedToReceivables", cart?.isAddedToReceivables)
        console.log("accountsReceivable?.totalInstallments", accountsReceivable?.totalInstallments)
        if (cart?.isAddedToReceivables && accountsReceivable?.totalInstallments) {
            await manageReceivableAccounts({ user, accountsReceivable, invoice });
        }

        // Procesar cuentas por cobrar de seguros médicos si existen
        if (insuranceEnabled && insuranceAR?.totalInstallments) {
            const arData = {
                ...insuranceAR,
                clientId: client.id,
                invoiceId: invoice.id,
            };
            const authDataId = await addInsuranceAuth(user, insuranceAuth, clientData.clientId)

            await manageInsuranceReceivableAccounts({ user, arData, invoice, insuranceAuth, authDataId });
        }

        return { invoice }

    } catch (error) {
        throw error
    } 
}

function checkIfHasDueDate({ cart, dueDate }) {
    if (!dueDate) {
        return cart;
    }
    const date = Timestamp.fromMillis(dueDate);
    return {
        ...cart,
        dueDate: date,
        hasDueDate: true
    }
}

function verifyCartItems(cart) {
    const { isValid, message } = validateInvoiceCart(cart);
    if (!isValid) {
        throw new Error(message)
    }
}
async function validateCashReconciliation({ user, dispatch, transaction }) {
    try {
        const { state, cashCount } = await checkOpenCashReconciliation(user, transaction);

        if (state === 'open') {
            return { cashCount };
        }

        if (['closed', 'closing', 'none'].includes(state)) {
            const cashCountStrategy = getCashCountStrategy(state, dispatch)
            cashCountStrategy.handleConfirm()
            return { cashCount: null };
        }
    } catch (error) {
        throw new Error(`Error al validar cuadre de caja: ${error.message}`);
    }
}

async function handleTaxReceiptGeneration({ user, taxReceiptEnabled, ncfType }) {
    if (!user || !taxReceiptEnabled) return null;
    
    try {
        return await fbGetAndUpdateTaxReceipt(user, ncfType);
    } catch (error) {
        console.error(`Error processing tax receipt for type ${ncfType}:`, error.message);
        throw new Error('Failed to process tax receipt');
    }
}

async function retrieveAndUpdateClientData({ user, client }) {
    if (!client) { return { client: GenericClient }; }
    if (!client.id) { return { client: GenericClient }; }
    try {
        await fbUpsertClient(user, client);
        return { clientId: client.id, client };
    } catch (error) {
        throw new Error(`Error al actualizar los datos del cliente: ${error.message}`);
    }
}

async function adjustProductInventory({ user, products, invoice }) {
    await fbUpdateProductsStock(products, user, invoice)
}

async function generateFinalInvoice({ user, cart, cashCount, ncfCode, clientData, dueDate }) {
    try {
        const cartWithDueDate = dueDate ? checkIfHasDueDate({ cart, dueDate }) : cart;
        const bill = {
            ...cartWithDueDate,
            NCF: ncfCode,
            client: clientData.client,
            cashCountId: cashCount.id
        }
        return await fbAddInvoice(bill, user) || bill;
    } catch (error) {
        throw new Error(`Error al generar la factura final: ${error.message}`);
    }
}

async function manageReceivableAccounts({ user, accountsReceivable, invoice }) {
    try {
        if (!invoice?.isAddedToReceivables) return;
        if (!accountsReceivable?.totalInstallments) {
            throw new Error('Installments data is missing')
        }
        const ar = await fbAddAR({ user, accountsReceivable })
        await fbAddInstallmentAR({ user, ar })
    } catch (error) {
        throw new Error(`Error al gestionar cuentas por cobrar: ${error.message}`);
    }
}

async function manageInsuranceReceivableAccounts({ user, arData, invoice, insuranceAuth, authDataId }) {
    try {
        // Log the input object to see what's being passed
        console.log("------------------------------------------------insuranceAR Object:", JSON.stringify(arData));
        console.log("insuranceAuth Object:", JSON.stringify(insuranceAuth));
        if (!arData?.totalInstallments) {
            throw new Error('Datos de cuotas de seguro faltantes');
        }

        const { insuranceName } = await getInsurance(user, insuranceAuth.insuranceId);

        // Normalizar la estructura para que sea compatible con fbAddAR
        const normalizedAR = {
            ...arData,
            invoiceId: invoice.id,
            clientId: invoice?.client?.id,
            paymentFrequency: arData.paymentFrequency || 'monthly',
            totalInstallments: arData.totalInstallments || 1,
            installmentAmount: arData.installmentAmount || 0,
            totalReceivable: arData.totalReceivable || 0,  // Usado en lugar de amount
            currentBalance: arData.currentBalance || arData.totalReceivable || 0, // Usado en lugar de arBalance
            createdAt: arData.createdAt || DateTime.now().toMillis(),
            updatedAt: arData.updatedAt || DateTime.now().toMillis(),
            paymentDate: arData.paymentDate,
            isActive: arData.isActive !== undefined ? arData.isActive : true, // Usado en lugar de status
            isClosed: arData.isClosed !== undefined ? arData.isClosed : false,
            type: 'insurance',
            insurance: {
                authId: authDataId,
                name: insuranceName,
                insuranceId: insuranceAuth.insuranceId,
                authNumber: insuranceAuth.authNumber,
            },
            comments: arData.comments || ''
        };

        // Log the normalized object to verify it has the correct properties
        console.log("Normalized AR Object:", JSON.stringify(normalizedAR, null, 2));

        // Usar las mismas funciones que para cuentas por cobrar normales
        const ar = await fbAddAR({ user, accountsReceivable: normalizedAR });
        await fbAddInstallmentAR({ user, ar });
        console.log("ar created: ------------------- ", ar)
    } catch (error) {
        console.error("Error en manageInsuranceReceivableAccounts:", error);
        throw new Error(`Error al gestionar cuentas por cobrar de seguro: ${error.message}`);
    }
}

async function generalInvoiceFromPreorder({ user, cart, cashCount, ncfCode }) {
    try {
        if (!cart?.preorderDetails?.isOrWasPreorder || !cart?.status == "pending") {
            throw new Error("Invalid preorder data");
        }
        const bill = {
            ...cart,
            NCF: ncfCode,
            cashCountId: cashCount.id
        }
        await fbGenerateInvoiceFromPreorder(user, bill);
        return bill;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Procesa una factura en modo de prueba sin guardar en la base de datos
 * Retorna un mock de factura para visualización
 */
async function processTestModeInvoice({
    user,
    cart,
    client,
    accountsReceivable,
    insuranceAR,
    insuranceAuth,
    ncfType,
    taxReceiptEnabled,
    dueDate,
    insuranceEnabled,
}) {
    try {
        console.log('🧪 Procesando factura en MODO PRUEBA - No se guardará en base de datos');
        
        // Generar un mock de NCF para prueba
        const mockNcfCode = taxReceiptEnabled ? `TEST-${ncfType}-${Date.now()}` : null;
        
        // Generar datos mock del cliente
        const mockClientData = client || { 
            id: 'test-client-id', 
            name: 'Cliente de Prueba',
            ...GenericClient 
        };

        // Crear factura mock con estructura similar a la real
        const mockInvoice = {
            id: `TEST-INVOICE-${Date.now()}`,
            ...cart,
            NCF: mockNcfCode,
            client: mockClientData,
            cashCountId: 'test-cash-count-id',
            createdAt: new Date().toISOString(),
            testMode: true, // Marcar como factura de prueba
            status: 'test-preview',
            timestamp: Date.now(),
        };

        // Si hay fecha de vencimiento, agregarla
        if (dueDate) {
            mockInvoice.dueDate = new Date(dueDate);
            mockInvoice.hasDueDate = true;
        }

        // Simular tiempo de procesamiento
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('✅ Factura de prueba generada exitosamente:', mockInvoice);
        
        return { invoice: mockInvoice };

    } catch (error) {
        console.error('❌ Error en modo de prueba:', error);
        throw new Error(`Error en modo de prueba: ${error.message}`);
    }
}