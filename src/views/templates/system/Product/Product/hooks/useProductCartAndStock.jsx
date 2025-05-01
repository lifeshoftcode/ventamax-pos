import { useSelector } from "react-redux";
import { SelectProduct } from "../../../../../../features/cart/cartSlice";
import { useEffect, useMemo } from "react";
import { isStockExceeded, isStockLow, isStockRestricted, isStockZero } from "../utils/stock.utils";

/**
 * Hook personalizado para verificar si un producto está en el carrito
 * @param {string | number} productId - El ID del producto a verificar
 * @returns {{status: boolean, product: object | null}} - Estado y datos del producto seleccionado
 */
export const useProductInCart = (productId) => {
    const productsSelected = useSelector(SelectProduct);

    const selectedProduct = useMemo(() => {
        if (!Array.isArray(productsSelected)) {
            console.error('Expected an array from SelectProduct selector');
            return null;
        }

        if (typeof productId !== 'string' && typeof productId !== 'number') {
            console.error('Expected a string or number as the product ID');
            return null;
        }

        return productsSelected.find(item => item.id === productId) || null;
    }, [productsSelected, productId]);

    useEffect(() => {
        if (selectedProduct) {
            //producto encontrado
        } else {
            console.log('Producto no encontrado en el carrito.');
        }
    }, [selectedProduct]);

    return {
        status: !!selectedProduct,
        product: selectedProduct
    };
};

export const useProductStockStatus = (productInCart, originalProduct) => {

    if (!productInCart && !originalProduct) {
        return { isLowStock: false, isOutOfStock: false };
    }

    const productToCheck = productInCart ?? originalProduct;
    const inCart = Boolean(productInCart);

    const isLowStock = useMemo(() => {
        if (!isStockRestricted(productToCheck)) return false;
        return isStockLow(productToCheck);
    }, [productToCheck]);

    // Verifica si el producto está fuera de stock o si el carrito supera el stock disponible
    const isOutOfStock = useMemo(() => {
        if (!isStockRestricted(productToCheck)) return false;
        return (
            isStockExceeded(inCart, productToCheck) ||
            isStockZero(productToCheck)
        );
    }, [productToCheck, inCart]);

    return { isLowStock, isOutOfStock };
};