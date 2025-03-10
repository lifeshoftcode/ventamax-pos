// Configuraciones y constantes para el proceso de importación y actualización de productos

// Estados del flujo de trabajo
export const FLOW_STATES = {
    INITIAL: 'initial',       // Initial upload form
    PREVIEW: 'preview',       // Product preview
    UPDATING: 'updating',     // Processing update
    RESULTS: 'results'        // Upload results
};

// Configuración predeterminada para la actualización de precios
export const DEFAULT_UPDATE_CONFIG = {
    method: 'percentage',        // percentage, amount, formula
    value: 10,                   // default value (10%)
    applyTo: 'all',              // all, withStock, withoutStock
    targetField: 'listPrice',    // listPrice, minPrice, cost
    roundPrices: true,           // round to integer
    roundTo: '1',                // round to tens (1)
    onlyProductsWithCost: false, // apply only to products with cost > 0
    updateExisting: true         // update existing products in Firebase
};

// Lista de encabezados mínimos requeridos para la importación de productos
export const REQUIRED_HEADERS = [
    'Nombre del producto',
    'Stock',
    'Impuesto',
    'Codigo de barras',
    'Precio de lista'
];