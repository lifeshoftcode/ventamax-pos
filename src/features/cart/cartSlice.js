import { createSlice } from "@reduxjs/toolkit";
import { initialState, defaultDelivery } from "./default/default";
import { GenericClient } from "../clientCart/clientCartSlice";
import { roundDecimals } from "../../utils/pricing";
import { nanoid } from "nanoid";
import { updateAllTotals } from "./utils/updateAllTotals";

const calculateChange = (payment, totalPurchase) => (payment - totalPurchase);

export const cartSlice = createSlice({
    name: 'factura',
    initialState,
    reducers: {
        toggleCart: (state) => {
            const isOpen = state.isOpen;
            state.isOpen = !isOpen;
        },
        loadCart: (state, actions) => {
            const cart = actions.payload;
            if (cart?.id) {
                state.data = cart;
            }

        },
        setClient: (state, actions) => {
            const client = actions.payload;
            if (client?.id) {
                state.data.client = client;
            }
            if (client?.delivery?.status === true) {
                state.data.delivery = client?.delivery
            } else {
                state.data.delivery = defaultDelivery
            }

        },
        setDefaultClient: (state) => {
            state.data.client = GenericClient
        },
        setPaymentAmount: (state, actions) => {
            const paymentValue = actions.payload
            const isPreOrderEnabled = state.settings.isPreOrderEnabled;

            if (isPreOrderEnabled && state.data.status === 'preorder' && !state.data.isPreOrder) {
                throw new Error("Debe marcar la factura como preorden antes de proceder al pago.");
            }

            const paymentMethod = state.data.paymentMethod.find((item) => item.status === true)
            if (paymentMethod) {
                state.data.payment.value = Number(paymentValue)
                paymentMethod.value = Number(paymentValue)
            }

        },
        changePaymentValue: (state, actions) => {
            const paymentValue = actions.payload
            state.data.payment.value = Number(paymentValue)
        },
        updateProductFields: (state, action) => {
            const { id, data } = action.payload;
            const product = state.data.products.find(
                p => p.id === id || p.cid === id
            );
            if (product) {
                Object.assign(product, data);
            }

        },
        addTaxReceiptInState: (state, actions) => {
            state.data.NCF = actions.payload
        },
        setTaxReceiptEnabled: (state, actions) => {
            const taxReceiptEnabled = actions.payload
            state.settings.taxReceipt.enabled = taxReceiptEnabled
        },
        toggleInvoicePanelOpen: (state) => {
            state.settings.isInvoicePanelOpen = !state.settings.isInvoicePanelOpen
        },
        setCartId: (state) => {
            const id = state.data.id
            if (!id) {
                state.data.id = nanoid()
            }
        },
        addPaymentMethod: (state, actions) => {
            const data = actions.payload
            state.data.paymentMethod = data
        },        setPaymentMethod: (state, actions) => {
            try {
                const paymentMethod = actions.payload;
                // Asegurarse de que paymentMethod tenga un value numérico
                if (paymentMethod.value !== undefined) {
                    paymentMethod.value = Number(paymentMethod.value) || 0;
                }
                
                const index = state.data.paymentMethod.findIndex(
                    (method) => method.method === paymentMethod.method
                );
                
                if (index !== -1) {
                    state.data.paymentMethod[index] = paymentMethod;
                }
                
                // Los totales se calcularán a través del middleware cartTotalsListener
                // que llama a recalcTotals() después de cada cambio en setPaymentMethod
            } catch (error) {
                console.error("Error in setPaymentMethod:", error);
            }
        },
        toggleReceivableStatus: (state, actions) => {
            const value = actions.payload
            if (value === undefined) {
                state.data.isAddedToReceivables = !state.data.isAddedToReceivables;
            } else {
                state.data.isAddedToReceivables = value;
            }
        },

        changeProductPrice: (state, action) => {
            const { id, pricing, saleUnit, price } = action.payload;
            const product = state.data.products.find((product) => product.id === id);
            if (product) {
                if (saleUnit) {
                    product.selectedSaleUnit = saleUnit
                } else if (pricing) {
                    product.pricing = pricing;
                    product.pricing.price = product.pricing.listPrice;
                    product.selectedSaleUnit = null;
                }
                if (price && product.selectedSaleUnit) {
                    product.selectedSaleUnit.pricing.price = price;
                } else if (price) {
                    product.pricing.price = price
                }
            }
        },
        changePaymentMethod: (state) => {
            const paymentMethod = state.data.paymentMethod
            const paymentMethodSelected = paymentMethod.findIndex((method) => method.status === true)
            if (paymentMethodSelected) {
                paymentMethodSelected
            }
        },
        addPaymentMethodAutoValue: (state) => {
            const totalPurchase = state.data.totalPurchase.value
            state.data.payment.value = totalPurchase
        },
        addProduct: (state, action) => {
            const product = action.payload;
            const checkingID = state.data.products.find((p) => p.id === product.id);
            const products = state.data.products;

            if (checkingID) {
                if (checkingID?.weightDetail?.isSoldByWeight) {
                    const productData = {
                        ...product,
                        cid: nanoid(8)
                    }
                    state.data.products = [...products, productData]
                } else {

                    // Object.assign(checkingID, product);
                    checkingID.productStockId = product.productStockId;
                    checkingID.batchId = product.batchId;
                    checkingID.stock = product.stock;
                    checkingID.amountToBuy += 1;
                }

            } else {
                const productData = {
                    ...product,
                    cid: checkingID?.weightDetail?.isSoldByWeight
                        ? nanoid(8)
                        : product.id,
                    insurance: product.insurance || { mode: null, value: 0 }
                }
                state.data.products = [...products, productData]
            }
        },
        deleteProduct: (state, action) => {
            const productFound = state.data.products.find((product) => product.cid === action.payload)
            if (productFound) {
                state.data.products.splice(state.data.products.indexOf(productFound), 1)
            }
            if (state.data.products.length === 0) {
                state.data.id = null
                state.data.products = []
            }
        },
        onChangeValueAmountToProduct: (state, action) => {
            const { id, value } = action.payload
            const productFound = state.data.products.find(product => product.id === id)
            if (productFound) {
                productFound.amountToBuy = Number(value)
            }
        },
        addAmountToProduct: (state, action) => {
            const { id } = action.payload
            const productFound = state.data.products.find((product) => product.id === id)
            if (productFound) {
                productFound.amountToBuy = productFound.amountToBuy + 1;
            }
        },
        diminishAmountToProduct: (state, action) => {
            const { id } = action.payload
            const productFound = state.data.products.find((product) => product.id === id)
            if (productFound) {
                productFound.amountToBuy -= 1;
                if (productFound.amountToBuy === 0) {
                    state.data.products.splice(state.data.products.indexOf(productFound), 1)
                }
            }
        },
         setCashPaymentToTotal: (state) => {
            const total = state.data.totalPurchase.value;
            // Ajustar array de métodos de pago
            state.data.paymentMethod = state.data.paymentMethod.map(m => ({
                ...m,
                value: m.method === 'cash' ? total : 0,
                status: m.method === 'cash'
            }));
            // También actualizar payment.value y change
            state.data.payment.value = total;
            state.data.change.value  = 0;
        },
        resetCart: (state) => ({

            ...initialState,
            settings: {
                ...initialState.settings,
                ...state.settings,
                billing: { ...state.settings.billing }
            }
        }),
        changeProductWeight: (state, action) => {
            const { id, weight } = action.payload
            const product = state.data.products.find((product) => product.cid === id)
            if (product) {
                product.weightDetail.weight = weight
            }
        },
        totalPurchaseWithoutTaxes: (state) => {
            const ProductsSelected = state.data.products;
            const result = ProductsSelected.reduce((total, product) => total + product.cost.total, 0);
            state.data.totalPurchaseWithoutTaxes.value = roundDecimals(result);
        },
        addDiscount: (state, action) => {
            const value = action.payload;
            state.data.discount.value = Number(value);
        },
        addSourceOfPurchase: (state, actions) => {
            const source = actions.payload
            state.data.sourceOfPurchase = source
        },
        togglePrintInvoice: (state) => {
            state.settings.printInvoice = !state.settings.printInvoice
        },
        toggleInvoicePanel: (state) => {
            state.settings.isInvoicePanelOpen = !state.settings.isInvoicePanelOpen;
        },
        setBillingSettings: (state, action) => {
            const { billingMode, isError, isLoading } = action.payload;
            state.settings.billing.billingMode = billingMode;
            state.settings.billing = {
                ...state.settings.billing,
                ...action.payload,
            }
            state.settings.billing.isLoading = isLoading;
            state.settings.billing.isError = isError;
        },
        updateProductInsurance: (state, action) => {
            const { id, mode, value } = action.payload;
            const product = state.data.products.find(p => p.id === id || p.cid === id);
            if (product) {
                product.insurance = { mode, value };
            }
        },
        updateInsuranceStatus: (state, action) => {
            state.data.insuranceEnabled = action.payload;

            if (!action.payload) {
                state.data.products.forEach(product => {
                    if (product.insurance) {
                        product.insurance = { mode: null, value: 0 };
                    }
                });
            }
        },        recalcTotals: (state, action) => {
            const paymentValue = action.payload !== undefined ? Number(action.payload) : null;
            updateAllTotals(state, paymentValue);
        },        addInvoiceComment: (state, action) => {
            state.data.invoiceComment = action.payload;
        },
        deleteInvoiceComment: (state) => {
            state.data.invoiceComment = '';
        },
        updateProductDiscount: (state, action) => {
            const { id, discount } = action.payload;
            const product = state.data.products.find(p => p.id === id || p.cid === id);
            if (product) {
                product.discount = discount;
                // Recalcular totales
                updateAllTotals(state);
            }
        },

    }
})

export const {
    addAmountToProduct,
    setCartId,
    setClient,
    setPaymentAmount,
    addPaymentMethod,
    addDiscount,
    addPaymentMethodAutoValue,
    togglePrintWarranty,
    addProduct,
    addSourceOfPurchase,
    addTaxReceiptInState,
    resetCart,
    changeProductPrice,
    changeProductWeight,
    setCashPaymentToTotal,
    deleteProduct,
    setPaymentMethod,
    toggleReceivableStatus,
    diminishAmountToProduct,
    onChangeValueAmountToProduct,
    selectClientInState,
    setChange,
    loadCart,
    toggleInvoicePanelOpen,
    totalPurchase,
    totalPurchaseWithoutTaxes,
    totalShoppingItems,
    setTaxReceiptEnabled,
    updateProductFields,
    totalTaxes,
    updateClientInState,
    saveBillInFirebase,
    toggleCart,
    togglePrintInvoice,
    toggleInvoicePanel,
    setDefaultClient,
    setBillingSettings,
    updateProductInsurance,
    recalcTotals,
    updateInsuranceStatus,
    addInvoiceComment,
    deleteInvoiceComment,
    updateProductDiscount
} = cartSlice.actions

export const SelectProduct = (state) => state.cart.data.products;
export const SelectFacturaData = (state) => state.cart.data;
export const SelectClient = (state) => state.cart.data.client;
export const SelectDelivery = (state) => state.cart.data.delivery;
export const SelectTotalPurchaseWithoutTaxes = (state) => state.cart.data.totalPurchaseWithoutTaxes.value;
export const SelectTotalTaxes = (state) => state.cart.data.totalTaxes.value;
export const SelectTotalPurchase = (state) => state.cart.data.totalPurchase.value;
export const SelectTotalShoppingItems = (state) => state.cart.data.totalShoppingItems.value;
export const SelectChange = (state) => state.cart.data.change.value;
export const SelectSourceOfPurchase = (state) => state.cart.data.sourceOfPurchase;
export const SelectPaymentValue = (state) => state.cart.data.payment.value;
export const SelectDiscount = (state) => state.cart.data.discount.value;
export const SelectNCF = (state) => state.cart.data.NCF;
export const SelectCartPermission = () => state.cart.permission
export const SelectCartIsOpen = (state) => state.cart.isOpen
export const SelectCartData = (state) => state.cart.data
export const SelectInvoiceComment = (state) => state.cart.data.invoiceComment
export const SelectSettingCart = (state) => state.cart.settings
export const selectCart = (state) => state.cart
export const selectInsuranceEnabled = (state) => state.cart.data.insuranceEnabled;
export const selectProductsWithIndividualDiscounts = (state) => 
    state.cart.data.products.filter(product => product.discount && product.discount.value > 0);
export const selectTotalIndividualDiscounts = (state) => {
    const products = state.cart.data.products;
    const taxReceiptEnabled = state.taxReceipt?.enabled ?? true;
    
    return products.reduce((total, product) => {
        if (product.discount && product.discount.value > 0) {
            const productPrice = product.pricing?.price || product.price || 0;
            const taxPercentage = Number(product.pricing?.tax) || 0;
            const quantity = product.amountToBuy || 1;
            
            // Precio unitario con impuestos
            const unitPriceWithTax = taxReceiptEnabled ? 
                productPrice * (1 + taxPercentage / 100) : 
                productPrice;
            const totalPriceWithTax = unitPriceWithTax * quantity;
            
            let discountAmount = 0;
            
            if (product.discount.type === 'percentage') {
                discountAmount = totalPriceWithTax * (product.discount.value / 100);
            } else {
                // Para monto fijo, el descuento ya considera impuestos
                discountAmount = product.discount.value;
            }
            
            return total + discountAmount;
        }
        return total;
    }, 0);
};

export default cartSlice.reducer