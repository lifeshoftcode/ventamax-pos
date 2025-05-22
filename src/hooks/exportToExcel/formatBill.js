import { useFormatPrice } from "../useFormatPrice";
import useFormatTimestamp from "../useFormatTimeStamp";

const unwrapInvoice = (raw) => raw?.data ?? raw?.ver?.data ?? raw ?? {};

const getPrimaryPaymentMethod = (paymentMethod = []) => (paymentMethod.find((pm) => pm.status) || {}).method ?? "N/A";

const getPrimaryPaymentValue = (paymentMethod = [], fallbackPayment) => {
  if (fallbackPayment?.value != null) return fallbackPayment.value;
  const pm = paymentMethod.find((pm) => pm.status);
  return pm ? pm.value : 0;
}
const formatBillResumen = (data) => {
  const {
    date,
    id,
    NCF,
    client = {},
    totalShoppingItems = {},
    totalTaxes = {},
    paymentMethod,
    payment,
    change = {},
    delivery = {},
    totalPurchase = {}
  } = data;

  return {
    ['Fecha']: useFormatTimestamp(date),
    ['ID']: id ?? 'N/A',
    ['Comprobante']: NCF ?? 'N/A',
    ['Nombre Cliente']: client.name || 'Cliente Genérico',
    ['Teléfono Cliente']: client.tel || 'N/A',
    ['Dirección Cliente']: client.address || 'N/A',
    ['RNC/Cédula']: client.personalID || 'N/A',
    ['Cantidad de Productos']: totalShoppingItems.value ?? 0,
    ['Total ITBIS']: useFormatPrice(totalTaxes.value ?? 0),
    ['Método de Pago']: getPrimaryPaymentMethod(paymentMethod),
    ['Pagado']: useFormatPrice(getPrimaryPaymentValue(paymentMethod, payment)),
    ['Delivery']: useFormatPrice(delivery.value ?? 0),
    ['Cambio']: useFormatPrice(change.value ?? 0),
    ['Total']: useFormatPrice(totalPurchase.value ?? 0),
  }
}
const formatBillDetailed = (facturas) => {
   const resultados = [];

  facturas.forEach((raw) => {
    const factura = unwrapInvoice(raw);
    const {
      products = [],
      client = {},
      NCF,
      date,
      id,
      totalPurchase = {},
    } = factura;

    products.forEach((product) => {
      resultados.push({
        Fecha: useFormatTimestamp(date),
        "Id Factura": id,
        Comprobante: NCF,
        Cliente: client.name || "Cliente Genérico",
        "ID Producto": product.id,
        Producto: product.name,
        Categoría: product.category,
        Tipo: product.type,
        Precio: useFormatPrice(
          product.pricing?.price ?? product.price?.unit ?? 0
        ),
        "Cantidad Facturada": product.amountToBuy,
        Total: useFormatPrice(totalPurchase.value ?? 0),
      });
    });
  });

  return resultados;
}

export const formatBill = ({ type, data }) => {
  switch (type) {
    case "Resumen":
      return formatBillResumen(data);
    case "Detailed":
      return formatBillDetailed(data);
    default:
      return [];
  }
}
