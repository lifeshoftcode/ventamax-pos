/**
 * Reemplaza los parámetros dinámicos (`:paramName`) en una ruta con valores proporcionados.
 *
 * @param {string} path - Ruta con parámetros dinámicos, por ejemplo: "/orders/:orderId/items/:itemId".
 * @param {...string|string[]} args - Valores para reemplazar los parámetros, en orden. 
 *                                     Pueden pasarse como un array o argumentos individuales.
 * 
 * @returns {string} La ruta con los parámetros reemplazados.
 * 
 * @throws {Error} Si faltan valores para los parámetros.
 * 
 * @example
 * // Usando un array:
 * const path = "/orders/:orderId/items/:itemId";
 * replacePathParams(path, ["123", "456"]); // "/orders/123/items/456"
 * 
 * @example
 * // Usando argumentos:
 * replacePathParams(path, "123", "456"); // "/orders/123/items/456"
 * 
 * @example
 * // Error por valores faltantes:
 * replacePathParams(path, "123"); // Error: Missing value for parameter "itemId".
 */
export function replacePathParams(path: string, ...args: string[] | [string[]]): string {
    const values = Array.isArray(args[0]) ? args[0] : args;
    const params = path.match(/\/:([a-zA-Z0-9_]+)/g) || [];

    if (params.length > values.length) {
        const missingParam = params[values.length];
        throw new Error(`Missing value for parameter "${missingParam.slice(2)}".`);
    }

    let index = 0;
    return path.replace(/\/:[a-zA-Z0-9_]+/g, () => `/${values[index++]}`);
}
