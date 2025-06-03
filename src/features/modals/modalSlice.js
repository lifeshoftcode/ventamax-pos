import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { OPERATION_MODES } from "../../constants/modes";

const initialState = {
    modalAddClient: {
        isOpen: false
    },
    modalAddProd: {
        isOpen: false
    },
    modalUpdateProd: {
        isOpen: false,
        id: '',
        data: {}
    },
    modalCategory: {
        isOpen: false,
    },
    modalAddOrder: {
        isOpen: false,
    },
    modalAddPurchase: {
        isOpen: false
    },
    modalAddProvider: {
        isOpen: false
    },
    modalSetCustomPizza: {
        isOpen: false
    },
    modalToggleClient: {
        isOpen: false,
        mode: 'create',
        addClientToCart: false,
        data: null
    },
    modalToggleProvider: {
        isOpen: false,
        mode: 'create',
        data: null
    },
    modalToggleOrderNote: {
        isOpen: false,
        data: null
    },
    modalToggleAddCategory: {
        isOpen: false,
        data: null
    },
    modalToggleAddProductOutflow: {
        isOpen: false,
    },
    modalToggleSignUp: {
        isOpen: false,
        data: null,
        businessID: null
    },
    modalConfirmOpenCashReconciliation: {
        isOpen: false,
    },
    modalFileList: {
        isOpen: false,
        fileList: []
    },
    modalDeveloper: {
        isOpen: false,
        activeTab: 'console'
    }
}
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModalAddClient: (state) => { state.modalAddClient.isOpen = true },
        closeModalAddClient: (state) => { state.modalAddClient.isOpen = false },
        openModalAddProd: (state) => { state.modalAddProd.isOpen = true },
        closeModalAddProd: (state) => { state.modalAddProd.isOpen = false },
        openModalUpdateProd: (state, actions) => {
            state.modalUpdateProd.isOpen = true
            state.modalUpdateProd.prodId = actions.payload

        },
        closeModalUpdateProd: (state) => {
            state.modalUpdateProd.isOpen = false
            state.modalUpdateProd.prodId = ''
            state.modalUpdateProd.data = {}
        },
        openModalCategory: (state) => { state.modalCategory.isOpen = true },
        closeModalCategory: (state) => { state.modalCategory.isOpen = false },
        openModalAddOrder: (state) => {
            let isOpen = state.modalAddOrder.isOpen;
            state.modalAddOrder.isOpen = !isOpen;
        },
        closeModalAddOrder: (state) => {
            state.modalAddOrder.isOpen = false;
        },
        toggleAddPurchaseModal: (state) => {
            let isOpen = state.modalAddPurchase.isOpen;
            state.modalAddPurchase.isOpen = !isOpen;
        },
        openModalAddProvider: (state) => {
            let isOpen = state.modalAddOrder.isOpen;
            state.modalAddProvider.isOpen = !isOpen;
        },
        handleModalSetCustomPizza: (state) => {
            let isOpen = state.modalSetCustomPizza.isOpen;
            state.modalSetCustomPizza.isOpen = !isOpen;
        },
        toggleClientModal: (state, actions) => {
            // const mode = actions.payload.mode

            const { mode, addClientToCart } = actions.payload
            let isOpen = state.modalToggleClient.isOpen;
            state.modalToggleClient.isOpen = !isOpen;
            if (isOpen === false) {
                state.modalToggleClient.mode = OPERATION_MODES.CREATE.id
                state.modalToggleClient.data = null
            }
            if (addClientToCart) {
                state.modalToggleClient.addClientToCart = addClientToCart
            }
            if (mode === OPERATION_MODES.CREATE.id) {
                state.modalToggleClient.mode = mode
                state.modalToggleClient.data = null
                return
            }
            if (mode === OPERATION_MODES.UPDATE.id) {
                state.modalToggleClient.mode = mode
                state.modalToggleClient.data = actions.payload.data
                return
            }

        },
        toggleProviderModal: (state, actions) => {
            const create = OPERATION_MODES.CREATE.id;
            const update = OPERATION_MODES.UPDATE.id;

            const mode = actions.payload.mode
            let isOpen = state.modalToggleProvider.isOpen;
            state.modalToggleProvider.isOpen = !isOpen;
            if (isOpen === false) {
                state.modalToggleProvider.mode = create
                state.modalToggleProvider.data = null
            }
            if (mode === create) {
                state.modalToggleProvider.mode = mode
                state.modalToggleProvider.data = null
                return
            }
            if (mode === update) {
                state.modalToggleProvider.mode = mode
                state.modalToggleProvider.data = actions.payload.data
                return
            }
        },
        toggleViewOrdersNotes: (state, actions) => {
            const { data, isOpen } = actions.payload;
            state.modalToggleOrderNote.isOpen = !isOpen;

            if (isOpen === false) {
                state.modalToggleOrderNote.data = null;
                return
            }
            if (data !== null && data !== false && isOpen === true) {
                state.modalToggleOrderNote.data = data;
                state.modalToggleOrderNote.isOpen = true;
                if (data == null || data == false) {
                    state.modalToggleOrderNote.isOpen = false;
                    state.modalToggleOrderNote.data = null;
                    return
                }
                return
            }
        },
        toggleAddCategory: (state, actions) => {
            const { isOpen, data } = actions.payload;
            state.modalToggleAddCategory.isOpen = isOpen;

            if (isOpen === 'close') {
                state.modalToggleAddCategory.isOpen = false;
            }
            if (data) {
                state.modalToggleAddCategory.data = data;
            }
            if (data === null) {
                state.modalToggleAddCategory.data = null;
            }

        },
        toggleAddProductOutflow: (state, actions) => {
            const isOpen = state.modalToggleAddProductOutflow.isOpen;
            state.modalToggleAddProductOutflow.isOpen = !isOpen;
        },
        toggleSignUpUser: (state, action) => {
            if(action.payload?.data) {
                state.modalToggleSignUp.data = action.payload.data;
            }

            if(action.payload?.businessID) {
                state.modalToggleSignUp.businessID = action.payload.businessID;
            }

            if (action.payload?.isOpen === undefined) {
                const isOpen = state.modalToggleSignUp.isOpen;
                state.modalToggleSignUp.isOpen = !isOpen;
                return
            }
            if (action.payload?.isOpen === false) {
                state.modalToggleSignUp.isOpen = false;
                state.modalToggleSignUp.data = null;
                state.modalToggleSignUp.businessID = null;
                return
            }
            if (action.payload?.isOpen === true) {
                state.modalToggleSignUp.isOpen = true;
                return
            }
        },
        toggleConfirmOpenCashReconciliation: (state, action) => {
            const isOpen = state.modalConfirmOpenCashReconciliation.isOpen;
            state.modalConfirmOpenCashReconciliation.isOpen = !isOpen;
        },
        toggleFileListModal: (state, action) => {
            const data = action.payload;
            const isOpen = !state.modalFileList.isOpen;
           
            state.modalFileList.isOpen = isOpen;

            if (isOpen === false) {
                state.modalFileList.fileList = [];
            } else {
                state.modalFileList.fileList = data.fileList;

            }
        },
        toggleDeveloperModal: (state, action) => {
            const payload = action.payload;
            const isOpen = !state.modalDeveloper.isOpen;
            
            state.modalDeveloper.isOpen = isOpen;
            
            if (payload?.activeTab) {
                state.modalDeveloper.activeTab = payload.activeTab;
            }
        }
    }
})
export const {
    openModalAddClient,
    closeModalAddClient,
    openModalAddProd,
    closeModalAddProd,
    openModalAddOrder,
    closeModalAddOrder,
    openModalBilling,
    closeModalBilling,
    openModalUpdateProd,
    closeModalUpdateProd,
    openModalCategory,
    closeModalCategory,
    openModalAddProvider,
    handleModalSetCustomPizza,
    handleModalCreateClient,
    toggleAddPurchaseModal,
    toggleProviderModal,
    toggleClientModal,
    toggleViewOrdersNotes,
    toggleAddCategory,
    toggleAddProductOutflow,
    toggleSignUpUser,
    toggleConfirmOpenCashReconciliation,
    toggleFileListModal,
    toggleDeveloperModal

} = modalSlice.actions

export const SelectBillingModal = state => state.modal.modalBilling.isOpen;
export const SelectAddPurchaseModal = state => state.modal.modalAddPurchase.isOpen;
export const SelectAddProdModal = state => state.modal.modalAddProd.isOpen;
export const SelectAddClientModal = state => state.modal.modalAddClient.isOpen;
export const SelectUpdateProdModal = state => state.modal.modalUpdateProd.isOpen;
export const SelectCategoryModal = state => state.modal.modalCategory.isOpen;
export const SelectAddOrderModal = state => state.modal.modalAddOrder.isOpen;
export const SelectSetCustomPizzaModal = state => state.modal.modalSetCustomPizza.isOpen;
export const SelectClientModalData = state => state.modal.modalToggleClient;
export const SelectProviderModalData = state => state.modal.modalToggleProvider;
export const SelectViewOrdersNotesModalData = state => state.modal.modalToggleOrderNote;
export const SelectAddCategoryModal = state => state.modal.modalToggleAddCategory;
export const SelectAddProductOutflowModal = state => state.modal.modalToggleAddProductOutflow;
export const SelectSignUpUserModal = state => state.modal.modalToggleSignUp;
export const SelectConfirmOpenCashReconciliationModal = state => state.modal.modalConfirmOpenCashReconciliation;
export const SelectFileListModal = state => state.modal.modalFileList;
export const SelectDeveloperModal = state => state.modal.modalDeveloper;
export default modalSlice.reducer