import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { getDefaultTransactionCondition, getDefaultTransactionStatus } from "../../constants/orderAndPurchaseState";
import { notification } from 'antd'; // Add missing import

const EmptyOrder = {
    condition: getDefaultTransactionCondition()?.id,
    numberId: "",
    id: "",
    createdAt: "",
    deletedAt: "",
    completedAt: "",
    deliveryAt: DateTime.now().toISO(),
    paymentAt: "",
    note: "",
    provider: null,
    replenishments: [],
    status: getDefaultTransactionStatus().id,
    attachmentUrls: [],
    receiptImgUrl: "",
    total: 0,
}
const EmptyProductSelected = {
    name: "",
    id: "",
    quantity: 0,
    baseCost: 0,
}
const initialState = {
    productSelected: EmptyProductSelected,
    order: EmptyOrder
}
const addOrderSlice = createSlice({
    name: 'addOrder',
    initialState,
    reducers: {
        getOrderData: (state, actions) => {
            const data = actions.payload
            state.order = data ? data : null
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
                quantity: 0,
                baseCost: product.pricing?.cost || 0
            }
            const findProduct = state.order.replenishments.find((item) => item.id === productData.id);
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
        AddProductToOrder: (state) => {
            const findProduct = state.order.replenishments.find((item) => item.id === state.productSelected.id);
            if (findProduct) {
                const index = state.order.replenishments.indexOf(findProduct)
                state.order.replenishments[index] = state.productSelected
            } else {
                state.order.replenishments.push(state.productSelected);
            }
            state.productSelected = EmptyProductSelected; // Fix reference
        },
        setOrder: (state, actions) => {
            const { dates, ...rest } = actions.payload;

            state.order = {
                ...state.order,
                ...rest,
            };
        },
        getInitialCost: (state, actions) => {
            const { initialCost } = actions.payload
            state.productSelected.initialCost = initialCost
        },
        cleanOrder: (state) => {
            state.productSelected = EmptyProductSelected // Fix reference
            state.order = EmptyOrder
            state.mode = "add"
        },
        updateProduct: (state, actions) => {
            const { value, index } = actions.payload;

            state.order.replenishments[index] = {
                ...state.order.replenishments[index],
                ...value,
                unitCost: calculateUnitCost(value),
                subtotal: calculateSubTotal(value) // Cambiado de subTotal a subtotal
            };
        },
        addAttachmentToOrder: (state, actions) => {
            state.order.attachmentUrls = [...state.order.attachmentUrls, actions.payload];
        },

        clearProductSelected: (state) => {
            state.productSelected = EmptyProductSelected
        },
        deleteReceiptImageFromOrder: (state) => {
            state.order.receiptUrl = "";
        },
        deleteProductFromOrder: (state, actions) => {
            const { id } = actions.payload
            state.order.replenishments = state.order.replenishments.filter(
                (item) => item.id !== id
            );
        },

    }
})
export const {
    setOrder,
    cleanOrder,
    getOrderData,
    SelectProduct,
    updateProduct,
    deleteProductFromOrder,
    deleteReceiptImageFromOrder,
    clearProductSelected,
    getInitialCost,
    AddProductToOrder,
    setProductSelected,
} = addOrderSlice.actions

export const selectProductSelected = state => state.addOrder.productSelected;
export const selectProducts = state => state.addOrder.order.replenishments;
export const selectOrder = state => state.addOrder.order;
export const selectOrderState = state => state.addOrder;
export const selectTotalOrder = state => state.addOrder.order.total;

export default addOrderSlice.reducer