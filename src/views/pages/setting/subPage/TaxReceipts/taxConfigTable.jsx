import { useState } from "react"

// Datos estáticos para las cabeceras de la tabla
export const settingDataTaxTable = [
    { name: 'NOMBRE' },
    { name: 'TIPO' },
    { name: 'SERIE' },
    { name: 'SECUENCIA' },
    { name: 'INCREMENTO' },
    { name: 'CANTIDAD' }
];

// IDs para los tipos de consumidores
export const consumerIds = {
    id1: 'CONSUMIDOR FINAL',
    id2: 'CONSUMIDOR FISCAL'
};

// Configuración de filas (estática, sin depender de hooks)
export const rowConfig = [
    {
        propertyId: consumerIds.id1,
        type: 'text',
        propertyToChangeValue: 'name',
        maxCharacters: 30,
    },
    {
        propertyId: consumerIds.id1,
        type: 'number',
        propertyToChangeValue: 'type',
        maxCharacters: 10,
    },
    {
        propertyId: consumerIds.id1,
        type: 'number',
        propertyToChangeValue: 'serie',
        maxCharacters: 10,
    },
    {
        propertyId: consumerIds.id1,
        type: 'number',
        propertyToChangeValue: 'sequence',
        maxCharacters: 10,
    },
    {
        propertyId: consumerIds.id1,
        type: 'number',
        propertyToChangeValue: 'increase',
        maxCharacters: 10,
    },
    {
        propertyId: consumerIds.id1,
        type: 'number',
        propertyToChangeValue: 'quantity',
        maxCharacters: 10,
    }
];

// Custom hook para manejar la configuración de recibos
export const useReceiptSettings = () => {
    const [receiptSettings, setReceiptSettings] = useState([
        {
            name: consumerIds.id1,
            type: String,
            serie: Number,
            sequence: '',
            increase: '',
            quantity: ''
        },
        {
            name: consumerIds.id2,
            type: '',
            serie: '',
            sequence: '',
            increase: '',
            quantity: ''
        }
    ]);
    
    // Añadimos los métodos para el array y setArray a la configuración de filas
    const getConfigWithArrayHandlers = () => {
        return rowConfig.map(config => ({
            ...config,
            array: receiptSettings,
            setArray: setReceiptSettings
        }));
    };
    
    return { 
        receiptSettings, 
        setReceiptSettings,
        rowConfigWithHandlers: getConfigWithArrayHandlers()
    };
};

// Esta función es para mantener compatibilidad con el código existente
// pero ya no utiliza hooks internamente
export const Data = () => {
    // Ahora devolvemos los datos estáticos sin usar hooks
    return {
        settingDataTaxTable,
        ids: consumerIds,
        row: rowConfig
    };
}
