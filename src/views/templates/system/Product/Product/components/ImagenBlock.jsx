import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import noImg from '../../../../../../assets/producto/noimg.png';
import { useCheckForInternetConnection } from '../../../../../../hooks/useCheckForInternetConnection';
import useImageFallback from '../../../../../../hooks/image/useImageFallback';

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

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: var(--border-radius);
`;

/**
 * ProductImage component
 * @param {object} props
 * @param {object} props.product - Product data
 * @param {object} props.productState - Local state for image loading/visibility
 * @param {function} props.setProductState - Setter for productState
 */
export const ProductImage = React.memo(({ product, productState, setProductState, isFirebaseLoading }) => {
  const isConnected = useCheckForInternetConnection();
  const [imageFallback] = useImageFallback(product?.image, noImg);

  return (
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
      {isFirebaseLoading && (
        <LoadingOverlay>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </LoadingOverlay>
      )}
    </ImageWrapper>
  );
});

export default ProductImage;
