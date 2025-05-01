import { getProductsInsuranceExtra, getProductsPrice, getProductsTax, getProductsTotalPrice, getTotalItems } from "../../../utils/pricing";

export const updateAllTotals = (state, paymentValue = null) => {
    const {
        settings: { taxReceipt: { enabled: taxReceiptEnabled } },
        data: {
            products,
            discount: { value: discountValue = 0 } = {},
            delivery: { value: deliveryValue = 0 } = {},
            paymentMethod,
            totalPurchase,
            totalInsurance,
            totalTaxes,
            totalShoppingItems,
            totalPurchaseWithoutTaxes,
            payment,
            change,
        },
    } = state;

    const totalPrice = getProductsTotalPrice(
        products,
        discountValue,
        deliveryValue,
        taxReceiptEnabled
    );
    const insurance = getProductsInsuranceExtra(products);
    const purchaseValue = totalPrice - insurance;
    const pay = paymentValue ?? purchaseValue;

    // Actualiza los totales
    totalPurchase.value = purchaseValue;
    Object.assign(totalInsurance, { value: insurance });
    totalTaxes.value = getProductsTax(products, taxReceiptEnabled);
    totalShoppingItems.value = getTotalItems(products);
    totalPurchaseWithoutTaxes.value = getProductsPrice(products);

    // Si hay pago en efectivo, asigna el total de la compra
    const cash = paymentMethod.find(m => m.method === 'cash' && m.status);
    if (cash) cash.value = purchaseValue;

    payment.value = pay;
    change.value = pay - purchaseValue;
};