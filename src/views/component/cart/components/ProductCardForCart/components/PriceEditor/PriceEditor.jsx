import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { icons } from '../../../../../../../constants/icons/icons';
import { changeProductPrice } from '../../../../../../../features/cart/cartSlice';
import { useFormatPrice } from '../../../../../../../hooks/useFormatPrice';
import { getPriceTotal, getPriceWithoutTax } from '../../../../../../../utils/pricing';
import { selectTaxReceiptEnabled } from '../../../../../../../features/taxReceipt/taxReceiptSlice';
import { userAccess } from '../../../../../../../hooks/abilities/useAbilities';

export const PriceEditor = ({ item, onModalOpen }) => {
  const dispatch = useDispatch();
  const { abilities, loading } = userAccess();
  const canModifyPrice = abilities.can('modify', 'Price');
  const canReadPriceList = abilities.can('read', 'PriceList');
  const taxReceiptEnabled = useSelector(selectTaxReceiptEnabled);
  
  const [inputPrice, setInputPrice] = useState(getPriceTotal(item, taxReceiptEnabled));
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  
  useEffect(() => {
    setInputPrice(getPriceTotal(item, taxReceiptEnabled));
  }, [item, taxReceiptEnabled]);

  const handlePriceChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, '');
    setInputPrice(newValue);
  };

  const handlePriceBlur = () => {
    if (isEditingPrice && canModifyPrice) {
      // Convertir el precio con impuesto a precio sin impuesto
      const priceWithoutTax = getPriceWithoutTax(parseFloat(inputPrice), item.pricing.tax, taxReceiptEnabled);

      // Despachar el cambio al estado con el precio sin impuesto
      dispatch(changeProductPrice({
        id: item.id,
        price: priceWithoutTax
      }));

      setIsEditingPrice(false);
    }
  };

  const handlePriceFocus = () => {
    if (canModifyPrice && !item?.weightDetail?.isSoldByWeight) {
      setIsEditingPrice(true);
    }
  };

  const handleModalOpen = () => {
    if (canReadPriceList) {
      onModalOpen();
    }
  };

  // Si está cargando los permisos, mostrar estado de carga
  if (loading) {
    return (
      <PriceContainer>
        <div style={{ padding: '8px', textAlign: 'center' }}>
          Cargando...
        </div>
      </PriceContainer>
    );
  }

  return (
    <PriceContainer>
      <DropdownButton 
        onClick={handleModalOpen}
        disabled={!canReadPriceList}
        title={!canReadPriceList ? "No tienes permisos para ver la lista de precios" : "Ver lista de precios"}
      >
        <CaretIcon>{icons.arrows.caretDown}</CaretIcon>
      </DropdownButton>
      <PriceInput
        disabled={!canModifyPrice || item?.weightDetail?.isSoldByWeight}
        type="text"
        value={isEditingPrice ? inputPrice : useFormatPrice(inputPrice)}
        onChange={handlePriceChange}
        onBlur={handlePriceBlur}
        onFocus={handlePriceFocus}
        readOnly={!canModifyPrice || item?.weightDetail?.isSoldByWeight}
        title={!canModifyPrice ? "No tienes permisos para modificar precios" : ""}
      />
    </PriceContainer>
  );
};

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  height: 32px;
  width: 100%;
  background-color: #f5f5f7;
`;

const DropdownButton = styled.button`
  border: none;
  background-color: #f5f5f5;
  height: 100%;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.disabled ? '#f5f5f5' : '#eaeaea'};
  }
`;

const CaretIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const PriceInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 0 8px;
  border: none;
  background-color: white;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  outline: none;
  
  &:disabled {
    background-color: #f9f9f9;
    color: #999;
    cursor: not-allowed;
  }
`;

export default PriceEditor;