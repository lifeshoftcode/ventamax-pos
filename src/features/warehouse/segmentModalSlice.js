import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    formData: {
        id: "",
        name: "",
        shortName: "",
        description: "",
        rowShelfId: "",
        capacity: 0,
        createdAt: null,
        createdBy: "",
        updatedAt: null,
        updatedBy: "",
        deletedAt: null,
        deletedBy: "",
    },
    path: [], // Nueva propiedad para almacenar la ruta
    loading: false,
    error: null,
};

const segmentModalSlice = createSlice({
    name: 'segmentModal', // Updated slice name
    initialState,
    reducers: {
        openSegmentForm: (state, action) => {
            state.isOpen = true;
            const data = action.payload.data;
            state.path = action.payload.path || []; // Almacenar la ruta
            if (data) {
                state.formData = data;
            } else {
                state.formData = initialState.formData;
            }
        },
        closeSegmentForm: (state) => {
            state.isOpen = false;
            state.formData = initialState.formData;
            state.path = []; // Limpiar la ruta
        },
        setSegmentLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSegmentError: (state, action) => {
            state.error = action.payload;
        },
        clearSegmentForm: (state) => {
            state.formData = initialState.formData;
            state.error = null;
            state.loading = false;
        },
        updateSegmentFormData: (state, action) => {
            state.formData = {
                ...state.formData,
                ...action.payload,
            };
        },
    },
});

// Exportar acciones y reducer
export const { 
    openSegmentForm, 
    closeSegmentForm, 
    setSegmentLoading, 
    setSegmentError,
    clearSegmentForm,
    updateSegmentFormData,
} = segmentModalSlice.actions;

export default segmentModalSlice.reducer;

// Selector para obtener el estado completo del segmento
export const selectSegmentState = (state) => state.segmentModal;