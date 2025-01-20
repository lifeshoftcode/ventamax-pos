import { createSlice } from '@reduxjs/toolkit'
import { getDefaultTransactionCondition, getDefaultTransactionStatus, transactionConditions } from '../../constants/orderAndPurchaseState'
import { notification } from 'antd'
import { DateTime } from 'luxon'

const EmptyPurchase = {
    id: null,
    numberId: "",
    replenishments: [],
    condition: getDefaultTransactionCondition()?.id,
    note: "",
    orderId: "",
    invoiceNumber: "",
    proofOfPurchase: "",
    completedAt: null,
    deliveryAt: DateTime.now().toISO(),
    paymentAt: DateTime.now().toISO(),
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    status: getDefaultTransactionStatus().id,
    attachmentUrls: [],
    provider: null,
}

const EmptyProduct = {
    id: "",
    name: "",
    expirationDate: null,
    quantity: 0,
    unitMeasurement: '',
    baseCost: 0,
    taxPercentage: 0,
    freight: 0,
    otherCosts: 0,
    unitCost: 0,
    subtotal: 0, // Cambiado de subTotal a subtotal
}

const initialState = {
    mode: "create",
    productSelected: EmptyProduct,
    purchase: EmptyPurchase,
}
export const addPurchaseSlice = createSlice({
    name: 'addPurchase',
    initialState,
    reducers: {
        setAddPurchaseMode: (state, actions) => {
            state.mode = actions.payload
        },
        getOrderData: (state, actions) => {
            const data = actions.payload
            state.purchase = data ? data : EmptyPurchase
        },
        setProductSelected: (state, actions) => {
            const newValue = actions.payload
            state.productSelected = { ...state.productSelected, ...newValue }
        },
        SelectProduct: (state, actions) => {
            const product = actions.payload;
            let productData = {
                id: product.id,
                name: product.name,
                expirationDate: "",
                quantity: 0,
                unitMeasurement: '',
                baseCost: product.pricing?.cost || 0,
                taxPercentage: 0,
                freight: 0,
                otherCosts: 0,
                unitCost: 0,
                subtotal: 0 // Cambiado de subTotal a subtotal
            }
            const findProduct = state.purchase.replenishments.find((item) => item.id === productData.id);
            if (findProduct) {
                productData = {
                    ...productData,
                    ...findProduct,
                }
                notification.info({
                    message: `Edición del producto: ${product.name}`,
                    description: `Al agregar este producto, la cantidad y el costo por unidad serán actualizados con los valores ingresados.`,
                    duration: 0,
                });
            }
            state.productSelected = productData
        },
        AddProductToPurchase: (state) => {
            const findProduct = state.purchase.replenishments.find((item) => item.id === state.productSelected.id);
            if (findProduct) {
                const index = state.purchase.replenishments.indexOf(findProduct)
                state.purchase.replenishments[index] = state.productSelected
            } else {
                state.purchase.replenishments.push(state.productSelected);
            }
            state.productSelected = EmptyProduct;
        },
        updateStock: (state, actions) => {
            const { stock } = actions.payload
            state.productSelected.product.stock = stock
        },
        setPurchase: (state, actions) => {
            const { dates, ...rest } = actions.payload;

            state.purchase = {
                ...state.purchase,
                ...rest,
            };
        },
        getInitialCost: (state, actions) => {
            const { initialCost } = actions.payload
            state.productSelected.initialCost = initialCost
        },
        cleanPurchase: (state) => {
            state.productSelected = EmptyProduct
            state.purchase = EmptyPurchase
            state.mode = "add"
        },
        updateProduct: (state, actions) => {
            const { value, index } = actions.payload;

            state.purchase.replenishments[index] = {
                ...state.purchase.replenishments[index],
                ...value,
                unitCost: calculateUnitCost(value),
                subtotal: calculateSubTotal(value) // Cambiado de subTotal a subtotal
            };
        },
        addAttachmentToPurchase: (state, actions) => {
            state.purchase.attachmentUrls = [...state.purchase.attachmentUrls, actions.payload];
        },

        clearProductSelected: (state) => {
            state.productSelected = EmptyProduct
        },
        deleteReceiptImageFromPurchase: (state) => {
            state.purchase.receiptUrl = "";
        },
        deleteProductFromPurchase: (state, actions) => {
            const { id } = actions.payload
            state.purchase.replenishments = state.purchase.replenishments.filter(
                (item) => item.id !== id
            );
        },
    }
})

// Funciones auxiliares para cálculos
const calculateUnitCost = (product) => {
    const baseCost = Number(product.baseCost) || 0;
    const tax = (baseCost * (Number(product.taxPercentage) || 0)) / 100;
    const freight = Number(product.freight) || 0;
    const otherCosts = Number(product.otherCosts) || 0;

    return baseCost + tax + freight + otherCosts;
};

const calculateSubTotal = (product) => {
    const quantity = Number(product.quantity) || 0;
    const unitCost = calculateUnitCost(product);
    return quantity * unitCost;
};

export const {
    updateStock,
    setPurchase,
    getOrderData,
    updateProduct,
    cleanPurchase,
    SelectProduct,
    setAddPurchaseMode,
    getInitialCost,
    setProductSelected,
    clearProductSelected,
    AddProductToPurchase,
    getPendingPurchaseFromDB,
    addAttachmentToPurchase,
    deleteProductFromPurchase,
    deleteReceiptImageFromPurchase,
    handleSetFilterOptions
} = addPurchaseSlice.actions;

//selectors
export const SelectProductSelected = (state) => state.addPurchase.productSelected;
export const selectAddPurchaseList = (state) => state.addPurchase.pendingOrders;
export const selectProducts = (state) => state.addPurchase.products;
export const selectPurchase = (state) => state.addPurchase.purchase;
export const selectPurchaseState = (state) => state.addPurchase;

export default addPurchaseSlice.reducer