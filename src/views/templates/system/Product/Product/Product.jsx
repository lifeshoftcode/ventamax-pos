import { Fragment, memo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectTaxReceiptEnabled } from '../../../../../features/taxReceipt/taxReceiptSlice';
import { getContainerOutline } from './utils/stockTheme';
import { useProductHandling } from './hooks/useProductHandling';
import { containerVariants } from './utils/variants';
import ProductImage from './components/ImagenBlock';
import ProductHeader from './components/ProductHeader';
import { StockWarning } from './components/StockWarning';
import { ProductFooter } from './components/ProductFooter';

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

const Content = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr min-content;
`;

export const Product = memo(({ product }) => {
  const taxReceiptEnabled = useSelector(selectTaxReceiptEnabled);

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
    isFirebaseLoading, // Agregar esta línea
  } = useProductHandling(product, taxReceiptEnabled);

  const isDisabled = isOutOfStock || isLowStock;

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
        <ProductImage
          productState={productState}
          setProductState={setProductState}
          product={product}
          isFirebaseLoading={isFirebaseLoading}
        />

        <StockWarning
          message="Sin stock"
          position="bottom"
          isSelected={isProductInCart}
          show={isOutOfStock}
          variant="outOfStock"
        />

        <StockWarning
          message="Stock bajo"
          position="bottom"
          isSelected={isProductInCart}
          show={isLowStock && !isOutOfStock}
          variant="lowStock"
        />

        <Content>
          <ProductHeader
            product={product}
            isProductInCart={isProductInCart}
            deleteProductFromCart={deleteProductFromCart}
          />
          <ProductFooter
            productState={productState}
            productInCart={productInCart}
            product={product}
            price={price}
            isProductInCart={isProductInCart}
            isLowStock={isLowStock}
            isOutOfStock={isOutOfStock}
          />
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
