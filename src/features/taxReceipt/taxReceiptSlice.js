import { createSlice } from '@reduxjs/toolkit'
import { increaseSequence } from './increaseSequence'
import { fbUpdateTaxReceipt } from '../../firebase/taxReceipt/fbUpdateTaxReceipt'

export const updateComprobante = (state, name) => {
    const comprobante = state.data.find((item) => item.data.name === name);
    if (comprobante) {
        const { type, serie, sequence, increase, quantity } = comprobante.data;
        comprobante.data.quantity = String(Number(quantity) - 1);
        comprobante.data.sequence = increaseSequence(sequence, increase, 10);
        state.ncfCode = type + serie + increaseSequence(sequence, increase, 10);
    }
}

export const generateNCFCode = (receipt) => {
    if (receipt) {
        const { type, series, sequence, increase, quantity } = receipt.data;
        // Decrease the quantity
        receipt.data.quantity = String(Number(quantity) - 1);
        // Increase and format the sequence
        receipt.data.sequence = increaseSequence(sequence, increase, 10);
        // Build and assign the NCF code
        const ncfCode = type + series + increaseSequence(sequence, increase, 10);
        return ncfCode;
    }
}

export function getUpdatedSequenceForInvoice(comprobanteName, comprobantes) {
    // Encuentra el comprobante por nombre
    const comprobanteIndex = comprobantes.findIndex(c => c.data.name === comprobanteName);

    // No se encontró el comprobante, manejar según sea necesario
    if (comprobanteIndex === -1) { return null }

    // Crear una copia del comprobante para modificar
    const comprobante = { ...comprobantes[comprobanteIndex].data };

    // Actualizar la cantidad y la secuencia
    comprobante.quantity = String(Number(comprobante.quantity) - 1);
    comprobante.sequence = increaseSequence(comprobante.sequence, comprobante.increase);

    // Formatear y devolver la nueva secuencia
    return `${comprobante.type}${comprobante.serie}${comprobante.sequence}`;
}

const initialState = {
    settings: {
        taxReceiptEnabled: false,
    },
    data: [],
    ncfCode: null,
    ncfType: "",
    availableTypes: [] // Lista de tipos de comprobantes disponibles
}

export const taxReceiptSlice = createSlice({
    name: 'taxReceipt',
    initialState,
    reducers: {
        getTaxReceiptData: (state, action) => {
            state.data = action.payload;
            // Actualizar la lista de tipos de comprobantes disponibles
            state.availableTypes = action.payload.map(item => item.data.name);
        },
        IncreaseEndConsumer: (state, action) => {
            if (state.settings.taxReceiptEnabled) {
                // Si se proporciona un nombre específico del comprobante, usar ese
                const name = action.payload || 'CONSUMIDOR FINAL';
                updateComprobante(state, name);
            }
        },
        IncreaseTaxCredit: (state, action) => {
            if (state.settings.taxReceiptEnabled) {
                // Si se proporciona un nombre específico del comprobante, usar ese
                const name = action.payload || 'CREDITO FISCAL';
                updateComprobante(state, name);
            }
        },
        // Nuevo action para aumentar cualquier comprobante por su nombre
        IncreaseSpecificReceipt: (state, action) => {
            if (state.settings.taxReceiptEnabled && action.payload) {
                updateComprobante(state, action.payload);
            }
        },
        toggleTaxReceiptSettings: (state, action) => {
            state.settings.taxReceiptEnabled = action.payload; // Cambia el estado de activación
        },
        updateTaxCreditInFirebase: (state) => {
            const taxReceipt = state.data
            fbUpdateTaxReceipt(taxReceipt)
        },
        selectTaxReceiptType: (state, actions) => {
            state.ncfType = actions.payload;
        },
        clearTaxReceiptData: (state) => {
            state.ncfStatus = false
            state.ncfCode = null
        }
    }
})

export const { 
    getTaxReceiptData, 
    clearTaxReceiptData, 
    IncreaseEndConsumer, 
    IncreaseTaxCredit,
    IncreaseSpecificReceipt, 
    selectTaxReceiptType, 
    updateTaxCreditInFirebase, 
    toggleTaxReceiptSettings 
} = taxReceiptSlice.actions;

//selectors
export default taxReceiptSlice.reducer

export const selectTaxReceiptData = (state) => state.taxReceipt.data;
export const selectNcfType = (state) => state.taxReceipt.ncfType;
export const selectNcfCode = (state) => state.taxReceipt.ncfCode;
export const selectTaxReceiptEnabled = (state) => state.taxReceipt.settings.taxReceiptEnabled;
export const selectTaxReceipt = (state) => state.taxReceipt;
export const selectAvailableReceiptTypes = (state) => state.taxReceipt.availableTypes;
