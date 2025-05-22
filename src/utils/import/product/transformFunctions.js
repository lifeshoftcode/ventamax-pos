import { warrantyOptions } from "../../../views/component/modals/ProductForm/components/sections/WarrantyInfo";

export const transformConfig = [
    {
        field: 'name',
        transform: (value) => value || ''
    },
    {
        field: 'image',
        transform: (value) => value || ''
    },
    {
        field: 'category',
        transform: (value) => value || ''
    },
    {
        field: 'pricing.cost',
        transform: (value) => {
            if (value === null || value === undefined || value === '') return 0;
            // Eliminar símbolos de moneda y espacios
            const cleanValue = typeof value === 'string' 
                ? value.replace(/[$€£¥₩₹₽]/g, '').replace(/\s/g, '')
                : value;
            const numValue = parseFloat(cleanValue);
            return isNaN(numValue) ? 0 : numValue;
        }
    },
    {
        field: 'pricing.price',
        transform: (value) => {
            if (value === null || value === undefined || value === '') return 0;
            // Eliminar símbolos de moneda y espacios
            const cleanValue = typeof value === 'string' 
                ? value.replace(/[$€£¥₩₹₽]/g, '').replace(/\s/g, '')
                : value;
            const numValue = parseFloat(cleanValue);
            return isNaN(numValue) ? 0 : numValue;
        }
    },
    {
        field: 'pricing.listPrice',
        transform: (value) => {
            if (value === null || value === undefined || value === '') return 0;
            // Eliminar símbolos de moneda y espacios
            const cleanValue = typeof value === 'string' 
                ? value.replace(/[$€£¥₩₹₽]/g, '').replace(/\s/g, '')
                : value;
            const numValue = parseFloat(cleanValue);
            return isNaN(numValue) ? 0 : numValue;
        }
    },
    {
        field: 'pricing.avgPrice',
        transform: (value) => {
            if (value === null || value === undefined || value === '') return 0;
            // Eliminar símbolos de moneda y espacios
            const cleanValue = typeof value === 'string' 
                ? value.replace(/[$€£¥₩₹₽]/g, '').replace(/\s/g, '')
                : value;
            const numValue = parseFloat(cleanValue);
            return isNaN(numValue) ? 0 : numValue;
        }
    },
    {
        field: 'pricing.minPrice',
        transform: (value) => {
            if (value === null || value === undefined || value === '') return 0;
            // Eliminar símbolos de moneda y espacios
            const cleanValue = typeof value === 'string' 
                ? value.replace(/[$€£¥₩₹₽]/g, '').replace(/\s/g, '')
                : value;
            const numValue = parseFloat(cleanValue);
            return isNaN(numValue) ? 0 : numValue;
        }
    },
    {
        field: 'pricing.tax', // Nuevo
        transform: (value) => {
            if (value === null || value === undefined || value === '') return '0';
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            if(isNaN(numValue)) return 0;
            const tax = numValue < 1 ? numValue * 100 : numValue;
            return `${tax}`;
        } // Usa el valor por defecto de initTaxes
    },
    {
        field: 'promotions.start',
        transform: (value) => value || null
    },
    {
        field: 'promotions.end',
        transform: (value) => value || null
    },
    {
        field: 'promotions.discount',
        transform: (value) => {
            if (value === null || value === undefined || value === '') return 0;
            // Eliminar símbolos de moneda y espacios
            const cleanValue = typeof value === 'string' 
                ? value.replace(/[$€£¥₩₹₽%]/g, '').replace(/\s/g, '')
                : value;
            const numValue = parseFloat(cleanValue);
            return isNaN(numValue) ? 0 : numValue;
        }
    },
    {
        field: 'promotions.isActive',
        transform: (value) => ['sí', 'yes'].includes(value?.toString()?.toLowerCase()) || false
    },
    {
        field: 'weightDetail.isSoldByWeight',
        transform: (value) => ['sí', 'yes'].includes(value?.toString()?.toLowerCase()) || false
    },
    {
        field: 'weightDetail.weight',
        transform: (value) => {
            if (value === null || value === undefined || value === '') return 0;
            // Eliminar símbolos y espacios
            const cleanValue = typeof value === 'string' 
                ? value.replace(/[$€£¥₩₹₽]/g, '').replace(/\s/g, '')
                : value;
            const numValue = parseFloat(cleanValue);
            return isNaN(numValue) ? 0 : numValue;
        }
    },
    {
        field: 'weightDetail.weightUnit',
        transform: (value) => value || 'lb'
    },
    {
        field: 'warranty.status',
        transform: (value) => ['sí', 'yes'].includes(value?.toString()?.toLowerCase()) || false
    },
    {
        field: 'warranty.quantity',
        transform: (value) => parseInt(value) || 1
    },
    {
        field: 'warranty.unit',
        transform: (value) => value || warrantyOptions[1].value
    },
    {
        field: 'size',
        transform: (value) => value || ''
    },
    {
        field: 'type',
        transform: (value) => value || ''
    },
    {
        field: 'stock', // Nuevo
        transform: (value) => parseInt(value) || 0
    },
    {
        field: 'netContent',
        transform: (value) => value || ''
    },
    {
        field: 'amountToBuy',
        transform: (value) => parseFloat(value) || 1
    },
    {
        field: 'createdBy',  // Puedes decidir si necesitas transformar esto
        transform: (value) => value || 'unknown'
    },
    {
        field: 'id', // Probablemente no necesites transformar el ID
        transform: (value) => value || ''
    },
    {
        field: 'order',
        transform: (value) => parseInt(value) || 1
    },
    {
        field: 'isVisible',
        transform: (value) => ['sí', 'yes'].includes(value?.toString()?.toLowerCase()) || true // Valor por defecto: true
    },
    {
        field: 'footer',
        transform: (value) => value || ''
    },
    {
        field: 'measurement',
        transform: (value) => value || ''
    },
    {
        field: 'trackInventory',
        transform: (value) => ['sí', 'yes'].includes(value?.toString()?.toLowerCase()) || true // Valor por defecto: true
    },
    {
        field: 'qrcode',
        transform: (value) => value || ''
    },
    {
        field: 'barcode',
        transform: (value) => value || ''
    },
    {
        field: 'activeIngredients',
        transform: (value) => value || ''
    }

    // ... other fields that can be null or have specific default values
];

