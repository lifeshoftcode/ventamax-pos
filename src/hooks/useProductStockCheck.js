import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openProductStockSimple } from '../features/productStock/productStockSimpleSlice';
import { getProductStockByProductId } from '../firebase/warehouse/productStockService';
import { selectUser } from '../features/auth/userSlice';

export const useProductStockCheck = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const checkProductStock = useCallback(async (product) => {
        console.log('Checking stock for product ID:', product.id); // Debugging log
        try {
            const stockData = await getProductStockByProductId(user, { productId: product.id });
            console.log('Fetched stock data:', stockData); // Debugging log

            // Si hay más de una ubicación para el mismo producto
            if (stockData.length > 1) {
                alert('Este producto tiene múltiples ubicaciones. Por favor, seleccione una ubicación.');
                dispatch(openProductStockSimple(product));
                return stockData;
            }
            return stockData;
        } catch (error) {
            console.error('Error checking product stock:', error);
            return false;
        }
    }, [dispatch, user]);

    return { checkProductStock };
};
