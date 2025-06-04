// src/utils/documentHeightCalculator.js

// Constantes basadas en los estilos del PDF
const STYLES = {
  title: { fontSize: 14, lineHeight: 1.15, marginBottom: 6 },
  headerInfo: { fontSize: 10, lineHeight: 1.15, marginVertical: 1 },  default: { fontSize: 10, lineHeight: 1.15 },
  totalsValue: { fontSize: 10, lineHeight: 1.15, marginVertical: 1 }
};

const LAYOUT = {
  pageWidth: 515, // A4 width minus margins (595 - 2*40)
  logoWidth: 120,
  logoMargin: 4,
  separatorMargin: 10, // top + bottom
  clientBlockMargin: 9, // top + bottom
  headerMargin: 12, // top margin
  footerSignatureHeight: 25, // línea + texto
  paymentMethodSpacing: 4
};

/**
 * Calcula la altura precisa de un texto considerando fuente y ancho
 */
export function calculateTextHeight(text, fontSize = 10, lineHeight = 1.15, maxWidth = LAYOUT.pageWidth) {
  if (!text) return 0;
  
  // Estimación más precisa basada en caracteres por línea según el tamaño de fuente
  const avgCharWidth = fontSize * 0.6; // Aproximación para Roboto
  const charsPerLine = Math.floor(maxWidth / avgCharWidth);
  const lines = Math.ceil(text.length / charsPerLine);
  
  return lines * fontSize * lineHeight;
}

/**
 * Estima la altura (en pt) que ocupará un bloque de texto.
 *
 * @param {string} text              – El texto a mostrar.
 * @param {object} options
 * @param {number} options.charsPerLine – Promedio de caracteres caben en una línea (p. ej. 40).
 * @param {number} options.lineHeight   – Altura de línea (pt), p. ej. 15.
 * @param {number} options.marginTop    – Margen superior (pt) que aplicas antes de este bloque.
 * @returns {number} Altura estimada (pt).
 */
export function estimateTextHeight(text, {
  charsPerLine = 40,
  lineHeight = 15,
  marginTop = 8,
} = {}) {
  const len = text?.length || 0;
  const lines = Math.ceil(len / charsPerLine) || 1;
  return marginTop + lines * lineHeight;
}
/**
 * Calcula la altura necesaria para el header dinámico con precisión máxima
 * Considera todos los elementos reales: logo, información del negocio, separadores y cliente
 */
export function calcHeaderHeight(biz, d) {
  let height = LAYOUT.headerMargin; // margen superior inicial
  
  // 1. Logo (si existe)
  if (biz.logoUrl) {
    height += 80 + LAYOUT.logoMargin; // altura del logo + margen inferior
  }
  
  // 2. Información del negocio (columna izquierda)
  let businessInfoHeight = 0;
  
  // Título del negocio
  if (biz.name) {
    businessInfoHeight += STYLES.title.fontSize * STYLES.title.lineHeight + STYLES.title.marginBottom;
  }
  
  // Información adicional del negocio
  const businessFields = [
    biz.address,
    biz.tel ? `Tel: ${biz.tel}` : null,
    biz.email,
    biz.rnc ? `RNC: ${biz.rnc}` : null
  ].filter(Boolean);
  
  businessFields.forEach(field => {
    businessInfoHeight += calculateTextHeight(field, STYLES.headerInfo.fontSize) + (STYLES.headerInfo.marginVertical * 2);
  });
  
  // 3. Información de la factura (columna derecha)
  let invoiceInfoHeight = 0;
  
  // Título del comprobante
  const comprobanteTitle = getComprobanteTitle(d.NCF || d.comprobante);
  invoiceInfoHeight += STYLES.title.fontSize * STYLES.title.lineHeight + STYLES.title.marginBottom;
  
  // Campos de la factura
  const invoiceFields = [
    `Fecha: ${formatDateForCalculation(d.date)}`,
    `${getComprobanteLabel(d.NCF || d.comprobante)}: ${d.NCF || d.comprobante || '-'}`,
    `No: ${d.numberID || '-'}`,
    d.type === 'preorder' && d.preorderDetails?.date ? `Fecha de Pedido: ${formatDateForCalculation(d.preorderDetails.date)}` : null,
    d.dueDate ? `Vence: ${formatDateForCalculation(d.dueDate)}` : null
  ].filter(Boolean);
  
  invoiceFields.forEach(field => {
    invoiceInfoHeight += calculateTextHeight(field, STYLES.headerInfo.fontSize) + (STYLES.headerInfo.marginVertical * 2);
  });
  
  // Tomar la altura mayor entre las dos columnas
  height += Math.max(businessInfoHeight, invoiceInfoHeight);
  
  // 4. Separador horizontal
  height += LAYOUT.separatorMargin;
  
  // 5. Bloque de información del cliente (si existe y no es genérico)
  if (shouldShowClientBlock(d)) {
    let clientHeight = 0;
    const clientFields = [
      `Cliente: ${d.client.name}`,
      d.client?.address?.trim() ? `Dirección: ${d.client.address.trim()}` : null,
      d.client?.tel?.trim() ? `Tel: ${d.client.tel.trim()}` : null,
      d.client?.personalID?.trim() ? `RNC cliente: ${d.client.personalID.trim()}` : null
    ].filter(Boolean);
    
    clientFields.forEach(field => {
      clientHeight += calculateTextHeight(field, STYLES.headerInfo.fontSize) + (STYLES.headerInfo.marginVertical * 2);
    });
    
    height += clientHeight + LAYOUT.clientBlockMargin;
  }
  
  return Math.ceil(height);
}

/**
 * Calcula la altura necesaria para el footer dinámico con máxima precisión
 * Considera firmas, métodos de pago, tabla de totales y comentarios
 */
export function calcFooterHeight(biz, d) {
  let height = 0;
  
  // 1. Bloque de firmas (siempre presente)
  height += LAYOUT.footerSignatureHeight * 2; // "Despachado Por" y "Recibido Conforme"
  
  // 2. Métodos de pago (si existen)
  const paymentMethods = d.paymentMethod?.filter(m => m?.status) || [];
  if (paymentMethods.length > 0) {
    // Título "Métodos de Pago"
    height += STYLES.default.fontSize * STYLES.default.lineHeight + LAYOUT.paymentMethodSpacing;
    
    // Cada método de pago
    paymentMethods.forEach(method => {
      const methodText = getPaymentMethodText(method);
      height += calculateTextHeight(methodText, STYLES.default.fontSize) + STYLES.default.lineHeight;
    });
  }
  
  // 3. Tabla de totales
  let totalRows = 2; // Sub-Total + ITBIS (siempre presentes)
  
  if (d.discount?.value) totalRows += 1; // fila de descuento
  if (d.delivery?.status) totalRows += 1; // fila de delivery
  totalRows += 1; // fila de Total final
  
  // Cada fila de totales
  height += totalRows * (STYLES.totalsValue.fontSize * STYLES.totalsValue.lineHeight + (STYLES.totalsValue.marginVertical * 2));
  
  // 4. Comentario de factura (si existe)
  if (d.invoiceComment?.trim()) {
    height += calculateTextHeight(
      d.invoiceComment.trim(),
      STYLES.default.fontSize,
      STYLES.default.lineHeight,
      LAYOUT.pageWidth
    ) + 8; // margen superior
  }
  
  // 5. Mensaje de factura del negocio (si existe)
  if (biz?.invoice?.invoiceMessage?.trim()) {
    height += calculateTextHeight(
      biz.invoice.invoiceMessage.trim(),
      STYLES.default.fontSize,
      STYLES.default.lineHeight,
      LAYOUT.pageWidth
    ) + 4; // margen superior
  }
  
  // 6. Margen inferior mínimo
  height += 20;
  
  return Math.ceil(height);
}

// Funciones auxiliares para mejorar la precisión

function shouldShowClientBlock(d) {
  const rawName = d.client?.name?.trim() || '';
  return rawName && rawName.toLowerCase() !== 'generic client';
}

function getComprobanteTitle(ncf) {
  if (!ncf) return 'RECIBO DE PAGO';
  if (ncf.startsWith('B01')) return 'FACTURA DE CRÉDITO FISCAL';
  if (ncf.startsWith('B02')) return 'FACTURA DE CONSUMO';
  return 'COMPROBANTE FISCAL';
}

function getComprobanteLabel(ncf) {
  return ncf ? 'NCF' : 'Número de Recibo';
}

function formatDateForCalculation(date) {
  if (!date) return '-';
  if (date.seconds) {
    const ts = date.seconds * 1000 + Math.floor(date.nanoseconds / 1e6);
    return new Date(ts).toLocaleDateString('es-DO');
  }
  return new Date(date).toLocaleDateString('es-DO');
}

function getPaymentMethodText(method) {
  const methodNames = {
    cash: 'Efectivo',
    transfer: 'Transferencia',
    card: 'Tarjeta'
  };
  
  const methodName = methodNames[method.method?.toLowerCase()] || method.method;
  const value = Number(method.value || 0).toFixed(2);
  const reference = method.reference ? ` - Ref: ${method.reference}` : '';
  
  return `${methodName}: ${value}${reference}`;
}
