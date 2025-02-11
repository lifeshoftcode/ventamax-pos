import React, { Fragment, useState, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Spin, notification } from 'antd';

// Ajusta las rutas/imports según tu estructura:
import noImg from '../../../../../assets/producto/noimg.png';
import { addProduct, deleteProduct } from '../../../../../features/cart/cartSlice';
import { openProductStockSimple } from '../../../../../features/productStock/productStockSimpleSlice';
import { selectTaxReceiptEnabled } from '../../../../../features/taxReceipt/taxReceiptSlice';
import { useProductInCart, useProductStockStatus } from './IsProductSelected';
import { useCheckForInternetConnection } from '../../../../../hooks/useCheckForInternetConnection';
import { useProductStockCheck } from '../../../../../hooks/useProductStockCheck';
import { useFormatPrice } from '../../../../../hooks/useFormatPrice';
import { useFormatNumber } from '../../../../../hooks/useFormatNumber';
import useImageFallback from '../../../../../hooks/image/useImageFallback';
import { truncateString } from '../../../../../utils/text/truncateString';
import { getTotalPrice } from '../../../../../utils/pricing';
import { Button } from '../../Button/Button';
import { icons } from '../../../../../constants/icons/icons';

/* =========================================================
   1. Temas de color:
========================================================= */
const productColorThemes = {
  default: {
    textColor: 'var(--color)',  // Por defecto
    amountColor: '#757575',
    outlineSelected: '2.9px solid var(--color)',
  },
  lowStock: {
    textColor: '#fb8c00',       // Naranja
    amountColor: '#fb8c00',
    outlineSelected: '2.9px solid #fb8c00',
  },
  strict: {
    textColor: '#43a047',       // Verde
    amountColor: '#43a047',
    outlineSelected: '2.9px solid #43a047',
  },
};

/* 
  2. Función para obtener el tema según el estado:
    - outOfStock
    - lowStock
    - strict
    - default
*/
const getProductTheme = (props) => {
  const { isOutOfStock, isLowStock, hasStrictStock, isSelected } = props;

  // ================ AJUSTE PRINCIPAL ================
  if (isOutOfStock) {
    // Si está sin stock:
    // - Si está seleccionado => Rojo (+ outline)
    // - Si NO está seleccionado => Gris (sin outline)
    return {
      textColor: isSelected ? '#ef5350' : '#9e9e9e',
      amountColor: isSelected ? '#ef5350' : '#9e9e9e',
      outlineSelected: isSelected ? '2.9px solid #ef5350' : 'none',
    };
  }
  // ==================================================

  if (isLowStock) return productColorThemes.lowStock;
  if (hasStrictStock) return productColorThemes.strict;
  return productColorThemes.default;
};

/*
   3. Determina el outline:
   - Si está seleccionado => usamos el "outlineSelected" del tema
   - Si no => none
*/
const getContainerOutline = (props) => {
  const { isSelected } = props;
  const theme = getProductTheme(props);
  return isSelected ? theme.outlineSelected : 'none';
};

/*
   4. Determina el color para la cantidad y el precio
*/
const getAmountColor = (props) => {
  const theme = getProductTheme(props);
  return theme.amountColor;
};
const getPriceColor = (props) => {
  const theme = getProductTheme(props);
  return theme.textColor;
};

/*
   5. Determina el background del amount:
   - Lo dejamos genérico, pero puedes ajustarlo
*/
const getAmountBackground = () => {
  return '#f5f5f5';
};

// =========================================================
// 6. Custom Hook para manejo del producto
// =========================================================
const useProductHandling = (product, taxReceiptEnabled) => {
  const dispatch = useDispatch();
  const [productState, setProductState] = useState({
    imageHidden: false,
    weightEntryModalOpen: false,
    isImageLoaded: false,
  });
  
  // Add refs to track if warnings have been shown
  const lowStockWarningShownRef = useRef(false);
  const criticalStockWarningShownRef = useRef(false);
  // NEW ref for no-stock reminder (only for non-strict products)
  const noStockReminderShownRef = useRef(false);
  
  const { status: isProductInCart, product: productInCart } = useProductInCart(product.id);
  const { isLowStock, isOutOfStock } = useProductStockStatus(productInCart, product);
  const { checkProductStock } = useProductStockCheck();

  const price = useMemo(() => getTotalPrice(product, taxReceiptEnabled), [product, taxReceiptEnabled]);

  const handleGetThisProduct = useCallback(async () => {
    try {
      if (isOutOfStock) {
        notification.warning({
          message: 'Alerta de Stock Agotado',
          description: `El stock de ${product.name} está agotado`,
        });
        return;
      }
      // Show low-stock notification only once when not already selected
      if (isLowStock && !isProductInCart && !lowStockWarningShownRef.current) {
        notification.warning({
          message: 'Alerta de Stock Bajo',
          description: `El stock de ${product.name} está por debajo de 20 unidades`,
        });
        lowStockWarningShownRef.current = true;
      }
      // Additionally, warn when stock reaches 5 units (only once)
      if (product.stock === 5 && !criticalStockWarningShownRef.current) {
        notification.info({
          message: 'Stock Crítico',
          description: `Solo quedan 5 unidades de ${product.name}`,
        });
        criticalStockWarningShownRef.current = true;
      }
      // NEW: Remind user when no stock exists (for non-strict stock products) only once.
      if ((!product?.stock || product.stock <= 0) && !product?.restrictSaleWithoutStock && !noStockReminderShownRef.current) {
        notification.info({
          message: 'Recordatorio de stock',
          description: `El producto ${product.name} no tiene stock actualmente y se venderá sin stock.`,
        });
        noStockReminderShownRef.current = true;
      }
      // ...existing logic to handle product addition...
      if (productInCart?.productStockId && productInCart?.batchId) {
        dispatch(addProduct(productInCart));
        return;
      }
      if (!product?.stock || product.stock <= 0) {
        if (product?.weightDetail?.isSoldByWeight) {
          setProductState((prev) => ({ ...prev, weightEntryModalOpen: true }));
          return;
        }
        dispatch(addProduct({ ...product, productStockId: null, batchId: null }));
        return;
      }
      const productStocks = await checkProductStock(product);
      if (productStocks.length === 0 && product?.restrictSaleWithoutStock) {
        notification.info({
          message: 'Stock no disponible',
          description: `Para vender ${product.name} necesitas tener stock disponible.`,
        });
        return;
      }
      if (productStocks.length > 1) {
        dispatch(openProductStockSimple(product));
        return;
      }
      if (productStocks.length === 1) {
        const [ps] = productStocks;
        dispatch(addProduct({ ...product, productStockId: ps.id, batchId: ps.batchId }));
        return;
      }
      if (product?.weightDetail?.isSoldByWeight) {
        setProductState((prev) => ({ ...prev, weightEntryModalOpen: true }));
        return;
      }
      dispatch(addProduct({ ...product, productStockId: null, batchId: null }));
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'No se pudo agregar el producto al carrito',
      });
      console.error('Error adding product:', error);
    }
  }, [
    product,
    isOutOfStock,
    isLowStock,
    productInCart,
    dispatch,
    checkProductStock,
  ]);
  
  const deleteProductFromCart = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      dispatch(deleteProduct(product.id));
    },
    [dispatch, product.id]
  );

  return {
    productState,
    setProductState,
    isProductInCart,
    productInCart,
    isLowStock,
    isOutOfStock,
    price,
    handleGetThisProduct,
    deleteProductFromCart,
  };
};

// =========================================================
// 7. Variantes para la animación (Framer Motion)
// =========================================================
const containerVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

// =========================================================
// 8. Styled-components
// =========================================================
const Container = styled(motion.li)`
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.02);
  width: 100%;
  border-radius: var(--border-radius);
  display: flex;
  gap: 6px;
  overflow: hidden;
  background-color: #ffffff;
  position: relative;
  transition: outline 0.4s ease-in-out;
  height: ${({ imageHiddenRef }) => (imageHiddenRef ? '60px' : '80px')};
  
  /* El outline sólo depende de si está seleccionado o no */
  outline: ${(props) => getContainerOutline(props)};

  &:hover {
    img {
      filter: brightness(105%);
      transition: 0.3s filter ease-in-out;
    }
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  transform: translateX(-90px) scale(0);
  transition: transform 0.6s ease-in-out 0.02s;

  .ant-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  ${({ imageHiddenRef }) =>
    !imageHiddenRef &&
    `
      position: relative;
      transform: translateX(0px) scale(1);
      transition: transform 1s ease-in-out 0.02s;
  `}
`;

const ImageContainer = styled.div`
  height: 80px;
  width: 80px;
  overflow: hidden;
  position: relative;
  padding: 4px;
  transition: transform 0.4s ease-in-out;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 7px;
  }
`;

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr min-content;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.1em 0.4em 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--Gray6);
  letter-spacing: 0.4px;
`;

const Title = styled.div`
  color: #2c3e50;
  width: 100%;
  font-size: 13px;
  line-height: 1.1;
  padding: 0.4em 0.4em 0;
  display: -webkit-box;
  font-weight: 600;
  letter-spacing: 0.2px;
  overflow: hidden;
  hyphens: auto;
`;

const Footer = styled.div`
  padding: 0 0.8em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  pointer-events: none;
  transition: 0.8s border-radius ease-in-out;
  border-top-left-radius: ${({ imageHiddenRef }) =>
    imageHiddenRef === false ? '10px' : '0'};
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const AmountToBuy = styled.div`
  padding: 0 0.4em;
  height: 1.6em;
  width: min-content;
  border-radius: 4px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;

  background-color: ${(props) => getAmountBackground(props)};
  color: ${(props) => getAmountColor(props)};

  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const Price = styled.div`
  display: block;
  height: 100%;
  font-weight: 550;
  font-size: 16px;
  transition: color 0.4s ease-in-out;

  color: ${(props) => getPriceColor(props)};
`;

const StockWarning = styled.div`
  position: absolute;
  ${({ position }) => (position === 'top' ? 'top: 0;' : 'bottom: 0;')}
  width: 90px;
  text-align: center;
  line-height: 1.2em;
  border-top-right-radius: 7px;
  left: 0;
  padding: ${({ position }) =>
    position === 'top' ? '0.2em 0.4em 0.6em' : '0.6em 0.4em 0.2em'};
  background: ${({ children, isSelected }) => {
    // Muestra degradado gris si no está seleccionado,
    // y rojo si sí lo está.
    if (children === 'Sin stock') {
      return isSelected
        ? 'linear-gradient(180deg, rgba(239, 83, 80, 0), #ef5350 50%)'
        : 'linear-gradient(180deg, rgba(158, 158, 158, 0), #9e9e9e 50%)';
    }
    if (children === 'Stock bajo') {
      return 'linear-gradient(180deg, rgba(251, 140, 0, 0), #fb8c00 50%)';
    }
    return 'linear-gradient(180deg, rgba(158, 158, 158, 0), #9e9e9e 50%)';
  }};
  transform: translateX(0) scale(1);
  transition: all 300ms ease-in-out;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  z-index: 1;
`;

// =========================================================
// 9. Componente principal Product
// =========================================================
export const Product = React.memo(({ product }) => {
  const taxReceiptEnabled = useSelector(selectTaxReceiptEnabled);
  const isConnected = useCheckForInternetConnection();
  const [imageFallback] = useImageFallback(product?.image, noImg);

  const {
    productState,
    setProductState,
    isProductInCart,
    productInCart,
    isLowStock,
    isOutOfStock,
    price,
    handleGetThisProduct,
    deleteProductFromCart,
  } = useProductHandling(product, taxReceiptEnabled);

  const isDisabled = isOutOfStock || isLowStock;
  const stock = productInCart?.stock || product.stock;

  return (
    <Fragment>
      <Container
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onClick={handleGetThisProduct}
        imageHiddenRef={productState.imageHidden}
        isSelected={isProductInCart}
        isDisabled={isDisabled}
        isOutOfStock={isOutOfStock}
        isLowStock={isLowStock}
        hasStrictStock={product?.restrictSaleWithoutStock}
      >
        <ImageWrapper imageHiddenRef={productState.imageHidden}>
          <ImageContainer imageHiddenRef={productState.imageHidden}>
            {!productState.isImageLoaded && <Spin />}
            <img
              src={(isConnected && imageFallback) || noImg}
              alt={product.name}
              onLoad={() =>
                setProductState((prev) => ({ ...prev, isImageLoaded: true }))
              }
              style={{ visibility: productState.isImageLoaded ? 'visible' : 'hidden' }}
            />
          </ImageContainer>
        </ImageWrapper>

        {isOutOfStock && (
          <StockWarning position="bottom" isSelected={isProductInCart}>
            Sin stock
          </StockWarning>
        )}
        {isLowStock && !isOutOfStock && (
          <StockWarning position="bottom" isSelected={isProductInCart}>
            Stock bajo
          </StockWarning>
        )}

        <Content>
          <Header>
            <Title>{truncateString(product.name, 40)}</Title>
            {isProductInCart && (
              <Button
                startIcon={icons.operationModes.discard}
                width="icon24"
                color="on-error"
                borderRadius="normal"
                onClick={deleteProductFromCart}
              />
            )}
          </Header>

          <Footer imageHiddenRef={productState.imageHidden}>
            <Group>
              <AmountToBuy
                isDisabled={isDisabled}
                isOutOfStock={isOutOfStock}
                isLowStock={isLowStock}
                isSelected={isProductInCart}
                hasStrictStock={product?.restrictSaleWithoutStock}
              >
                {isProductInCart &&
                  `${useFormatNumber(productInCart?.amountToBuy)} / `}
                {stock === 0 ? '-' : useFormatNumber(stock)}
              </AmountToBuy>
            </Group>
            <Group>
              {product?.weightDetail?.isSoldByWeight ? (
                <Price
                  isDisabled={isDisabled}
                  isOutOfStock={isOutOfStock}
                  isLowStock={isLowStock}
                  isSelected={isProductInCart}
                  hasStrictStock={product?.restrictSaleWithoutStock}
                >
                  {useFormatPrice(price)} / {product?.weightDetail?.weightUnit}
                </Price>
              ) : (
                <Price
                  isDisabled={isDisabled}
                  isOutOfStock={isOutOfStock}
                  isLowStock={isLowStock}
                  isSelected={isProductInCart}
                  hasStrictStock={product?.restrictSaleWithoutStock}
                >
                  {useFormatPrice(price)}
                </Price>
              )}
            </Group>
          </Footer>
        </Content>
      </Container>

      {/*
        Aquí podrías incluir tus modales, por ejemplo:
        <ProductWeightEntryModal
          isVisible={productState.weightEntryModalOpen}
          product={product}
          ...
        />
      */}
    </Fragment>
  );
});
