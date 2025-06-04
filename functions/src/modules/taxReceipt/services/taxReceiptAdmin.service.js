import { nanoid } from "nanoid";
import { db, admin, serverTimestamp } from "../../../core/config/firebase.js";
import { https, logger } from "firebase-functions";
/**
 * Incrementa una secuencia de números según un valor específico
 * @param {string} sequence - Secuencia actual
 * @param {number} increase - Valor de incremento
 * @param {number} maxCharacters - Máximo de caracteres para la secuencia
 * @returns {string} Secuencia incrementada
 */
export const increaseSequence = (sequence, increase, maxChars = 10) => {
  const base = BigInt(sequence);
  const inc = BigInt(increase);
  let result = base + inc;
  
  // Convert to string and prevent wraparound
  const resultStr = result.toString();
  
  // If result exceeds max digits, cap it at max possible value instead of wrapping
  if (resultStr.length > maxChars) {
    return '9'.repeat(maxChars);
  }

  return resultStr.padStart(maxChars, '0');
}

/**
 * Genera un código NCF a partir de los datos del recibo fiscal
 * @param {Object} receiptData - Datos del recibo fiscal
 * @returns {Object} Objeto con el código NCF y los datos actualizados
 */
export const generateNCFCode = (receiptData) => {
  if (!receiptData || typeof receiptData !== 'object') {
    throw new https.HttpsError('invalid-argument', 'Datos del recibo inválidos');
  }
  const { type, serie, sequence, increase, quantity } = receiptData;

  if (
    !type || !serie ||
    isNaN(Number(sequence)) ||
    isNaN(Number(increase)) ||
    isNaN(Number(quantity))
  ) {
    throw new https.HttpsError(
      'invalid-argument',
      'Faltan o son inválidos: type, serie, sequence, increase o quantity'
    );
  }

  const qtyBefore = BigInt(quantity);
  const incValue = BigInt(increase);

  if (qtyBefore < incValue) {
    throw new https.HttpsError(
      'failed-precondition',
      `Cantidad insuficiente para generar NCF: disponible ${qtyBefore}, requerido ${incValue}`
    );
  }

  const newSequence = increaseSequence(sequence, increase, 10);
  const newQuantity = (qtyBefore - incValue).toString();
  const ncfCode = `${type}${serie}${newSequence}`;

  const updatedData = {
    ...receiptData,
    sequence: newSequence,
    quantity: newQuantity,
  }

  return { updatedData, ncfCode };
}

/**
 * Obtiene y actualiza un recibo fiscal según el nombre
 * @param {Object} user - Datos del usuario
 * @param {string} taxReceiptName - Nombre del tipo de comprobante fiscal
 * @returns {Promise<string|null>} Código NCF generado o null
 */
export async function getAndUpdateTaxReceipt(tx, { user, taxReceiptEnabled, taxReceiptName, taxReceiptSnap }) {
  if (!user?.businessID || !user?.uid || !taxReceiptName) {
    throw new https.HttpsError(
      'invalid-argument',
      'Parámetros inválidos en getAndUpdateTaxReceiptTransactional'
    );
  }
  if (!taxReceiptEnabled) {
    logger.warn("Recibo fiscal no habilitado", { uid: user.uid });
    return null;
  }

  const businessId = user.businessID;

  const taxReceipt = taxReceiptSnap.data().data;

  const { ncfCode, updatedData } = generateNCFCode(taxReceipt);

  const usageId = nanoid();

  const usageRef = db.collection('businesses')
    .doc(businessId)
    .collection('ncfUsage')
    .doc(usageId);

  tx.update(taxReceiptSnap.ref, { data: updatedData });

  tx.set(usageRef, {
    id: usageId,
    ncfCode,
    taxReceiptName,
    generatedAt: serverTimestamp(),
    userId: user.uid,
    status: 'pending' // Puede ser 'pending', 'used', 'voided'
  });

  logger.info("Tax receipt code generated", { traceId, ncfCode, usageId });

  return ncfCode;
}
