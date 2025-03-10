import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Counter } from '../../../templates/system/Counter/Counter';
import {
    deleteProduct,
    changeProductPrice,
    changeProductWeight,
    updateProductInsurance
} from '../../../../features/cart/cartSlice';
import { useFormatPrice } from '../../../../hooks/useFormatPrice';
import { icons } from '../../../../constants/icons/icons';
import { motion } from 'framer-motion';
import * as antd from 'antd';
import { userAccess } from '../../../../hooks/abilities/useAbilities';
import {
    getAvgPriceTotal,
    getListPriceTotal,
    getMinPriceTotal,
    getPriceTotal,
    getPriceWithoutTax,
    getTotalPrice
} from '../../../../utils/pricing';
import { selectTaxReceiptEnabled } from '../../../../features/taxReceipt/taxReceiptSlice';
import PriceAndSaleUnitsModal from './PriceAndSaleUnitsModal';
import { Input as AntInput, Radio, InputNumber } from 'antd'; // Añadir este import
import { selectInsuranceStatus } from '../../../../features/insurance/insuranceSlice';
import useInsuranceEnabled from '../../../../hooks/useInsuranceEnabled';

const defaultColor = { bg: 'var(--White3)', border: 'var(--Gray4)' };
const errorColor = { bg: '#ffefcc', border: '#f5ba3c' };
const exactMatchColor = { bg: '#ccffcc', border: '#88cc88' };
const inRangeColor = { bg: '#ffffcc', border: '#cccc88' };

const { Button, message } = antd;


export function extraerPreciosConImpuesto(pricing, taxReceiptEnabled = true) {

    const { listPrice, avgPrice, minPrice } = pricing || {};

    const preciosConImpuesto = [
        {
            label: 'Precio de Lista',
            value: listPrice || 'N/A',
            valueWithTax: getListPriceTotal({ pricing }, taxReceiptEnabled),
            pricing,
            type: 'listPrice',
            enabled: pricing?.listPriceEnabled ?? true
        },
        {
            label: 'Precio Promedio',
            value: avgPrice || 'N/A',
            valueWithTax: getAvgPriceTotal({ pricing }, taxReceiptEnabled),
            type: 'avgPrice',
            pricing,
            enabled: pricing?.avgPriceEnabled ?? true
        },
        {
            label: 'Precio Mínimo',
            value: minPrice || 'N/A',
            valueWithTax: getMinPriceTotal({ pricing }, taxReceiptEnabled),
            type: 'minPrice',
            pricing,
            enabled: pricing?.minPriceEnabled ?? true
        }
    ];
    return preciosConImpuesto;
}

const variants = {
    initial: { opacity: 0, y: -90 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 150, transition: { duration: 0.5 } },
};

export const ProductCardForCart = ({ item }) => {
    const dispatch = useDispatch();
    const { abilities } = userAccess();
    const [isModalVisible, setModalVisible] = useState(false);
    const insuranceEnabled = useInsuranceEnabled();
    const canModifyPrice = abilities.can('modify', 'Price');
    const canSelectPrice = abilities.can('read', 'PriceList');

    const taxReceiptEnabled = useSelector(selectTaxReceiptEnabled);
    const [selectedUnit, setSelectedUnit] = useState(null); // Por defecto, el item base
    const [inputPrice, setInputPrice] = useState(getTotalPrice(item, taxReceiptEnabled));
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [precios, setPrecios] = useState([]);
    const itemPrice = () => {
        setInputPrice(getPriceTotal(item, taxReceiptEnabled))
    }
    useEffect(() => {
        itemPrice()
    }, [item])

    const updatePricing = (pricing) => {
        setPrecios(extraerPreciosConImpuesto(pricing, taxReceiptEnabled));
    };

    const handleSelectUnit = (unit) => {
        setSelectedUnit(unit);
        const pricing = unit.pricing;

        console.log('total ', getPriceTotal({ pricing }, taxReceiptEnabled))
        const selectedPriceValue = getPriceTotal({ pricing }, taxReceiptEnabled);
        setInputPrice(selectedPriceValue);

        updatePricing(pricing);// Actualiza los precios disponibles y el estado
        dispatch(changeProductPrice({ id: item.id, saleUnit: unit, }));
    };

    const handleSelectDefaultUnit = (unit) => {
        const pricing = unit?.pricing;
        setSelectedUnit(null);
        const selectedPriceValue = getPriceTotal({ pricing }, taxReceiptEnabled)
        setInputPrice(selectedPriceValue);
        updatePricing(pricing);
        dispatch(changeProductPrice({ id: item.id, pricing: pricing }))
    }

    const handleSelectPrice = (pricing) => {
        if (!abilities.can('read', 'PriceList')) {
            message.error('No tienes permisos para seleccionar un precio de la lista');
            return;
        }
        // Puedes seleccionar qué precio utilizar, aquí asumiremos listPrice
        const selectedPriceValue = getPriceTotal({ pricing: pricing.pricing }, taxReceiptEnabled);
        setInputPrice(selectedPriceValue);

        dispatch(changeProductPrice({ id: item.id, price: pricing.value }));

        // Actualiza los precios disponibles y el estado
        updatePricing(pricing.pricing);
    };

    const handlePriceChange = (e) => {
        const newValue = e.target.value.replace(/[^0-9.]/g, '');
        setInputPrice(newValue);
    };

    const handlePriceBlur = () => {
        if (isEditingPrice) {
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

    // New local state for insurance mode and value:
    const [insurance, setInsurance] = useState({
        mode: item.insurance?.mode || 'porcentaje',
        value: item.insurance?.value 
    });
    // Update local state when item changes
    useEffect(() => {
        setInsurance({
            mode: item.insurance?.mode || 'porcentaje',
            value: item.insurance?.value 
        });
    }, [item]);

    const handleInsuranceModeChange = e => {
        const newMode = e.target.value;
        const newInsurance = { ...insurance, mode: newMode };
        setInsurance(newInsurance);
        dispatch(updateProductInsurance({ id: item.id, mode: newMode, value: newInsurance.value }));
    };

    const validateNumericWithDecimal = (input) => {
        // Si está vacío, permitirlo
        if (input === '') return '';
        
        // Verificar si la entrada contiene sólo dígitos y a lo sumo un punto decimal
        const isValid = /^(\d+)?\.?(\d+)?$/.test(input);
        
        if (isValid) {
          return input;
        } else {
          // Si no es válido, rechazamos el cambio
          return null;
        }
      };

    const handleInsuranceValueChange = newValue => {
        const validatedValue = validateNumericWithDecimal(newValue);
  
        // Si la entrada no es válida, mantenemos el valor anterior
        if (validatedValue === null) return;
        
        // Actualizamos el estado con el valor validado (aún como string para mantener el punto decimal)
        const newInsurance = { ...insurance, value: validatedValue };
        setInsurance(newInsurance);
        dispatch(updateProductInsurance({ id: item.id, mode: newInsurance.mode, value: newInsurance.value }));
    };

    const handleInsuranceValueBlur = e => {
        let value = e.target.value === '' ? '' : Number(e.target.value);

        if (insurance.mode === 'porcentaje') {
            if (value > 100) value = 100;

            setInsurance({ ...insurance, value });
            dispatch(updateProductInsurance({ id: item.id, mode: insurance.mode, value }));
        }
    };

    console.log(insurance)

    return (
        <Container variants={variants} initial="initial" animate="animate" transition={{ duration: 0.6 }}>
            <Row>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr min-content min-content' }}>
                    <Title>{item.name}</Title>
                    <Price>{useFormatPrice(getTotalPrice(item, taxReceiptEnabled))}</Price>
                    <Button
                        type="text"
                        size="small"
                        icon={icons.operationModes.discard}
                        onClick={() => dispatch(deleteProduct(item.cid))}
                        danger
                    />
                </div>
            </Row>
            <Row>
                <Group>
                    <Button
                        icon={icons.arrows.caretDown}
                        size="small"
                        onClick={() => setModalVisible(true)}
                    />
                    <Input
                        disabled={!canModifyPrice || item?.weightDetail?.isSoldByWeight}
                        type="text"
                        value={isEditingPrice ? inputPrice : useFormatPrice(inputPrice)}
                        onChange={handlePriceChange}
                        onBlur={handlePriceBlur}
                        onFocus={handlePriceFocus}
                    />
                    {
                        item?.weightDetail?.isSoldByWeight ? (
                            <div style={{ display: "flex", gap: "1em" }}>
                                <Input
                                    value={`${(item?.weightDetail?.weight)}`}
                                    onChange={(e) => dispatch(changeProductWeight({ id: item.cid, weight: e.target.value }))}
                                />
                                {item?.weightDetail?.weightUnit}
                            </div>

                        ) : (
                            <Counter
                                item={item}
                                amountToBuy={item.amountToBuy}
                                stock={item?.stock}
                                id={item.id}
                                product={item}
                            />
                        )
                    }

                </Group>
            </Row>
            {insuranceEnabled && (
                <CoveragePill
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <CoverageLabel>Coverage</CoverageLabel>
                    <CoverageControls>
                        <ToggleGroup>
                            <ToggleOption
                                active={insurance.mode === 'porcentaje'}
                                onClick={() => handleInsuranceModeChange({ target: { value: 'porcentaje' } })}
                                as={motion.button}
                                whileTap={{ scale: 0.95 }}
                            >
                                %
                            </ToggleOption>
                            <ToggleOption
                                active={insurance.mode === 'monto'}
                                onClick={() => handleInsuranceModeChange({ target: { value: 'monto' } })}
                                as={motion.button}
                                whileTap={{ scale: 0.95 }}
                            >
                                $
                            </ToggleOption>
                        </ToggleGroup>
                        <ValueInput
                            value={insurance.value}
                            onChange={(e) => handleInsuranceValueChange(e.target.value)}
                            onBlur={handleInsuranceValueBlur}
                            as={motion.input}
                            whileFocus={{ boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.25)" }}
                        />
                    </CoverageControls>
                </CoveragePill>
            )}
            <PriceAndSaleUnitsModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                prices={precios}
                selectedUnit={selectedUnit}
                onSelectDefaultUnit={handleSelectDefaultUnit}
                item={item}
                onSelectPrice={handleSelectPrice}
                onSelectUnit={handleSelectUnit}
            />
        </Container>
    );
};

const Container = styled(motion.div)`
    width: 100%;
    height: min-content;
    background-color: #ffffff;
    padding: 0.4em;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: grid;
    gap: 0.4em;
`;

const Row = styled.div`
    display: grid;
    align-items: center;
`;

const Group = styled.div`
    display: grid;
    align-items: center;
    gap: 0.4em;
    grid-template-columns: min-content 1fr 1fr;
`;

const Title = styled.span`
    font-weight: 500;
    line-height: 16px;
    font-size: 14px;
    color: rgb(71, 71, 71);
    text-transform: capitalize;
`;

const Price = styled.span`
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    padding: 0 10px;
    background-color: var(--White1);
    color: var(--Gray6);
`;

const Input = styled.input`
    width: 100%;
    height: 1.8em;
    font-size: 14px;
    font-weight: 600;
    border-radius: 6px;
    padding: 0 10px;
    background-color: ${props => props?.color?.bg};
    border: 2px solid ${props => props?.color?.border};
    color: var(--Gray6);
    outline: none;
`;

// Estilos minimalistas
const CoveragePill = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    border-color: #e0e0e0;
  }
`;

const CoverageLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin-right: 8px;
  white-space: nowrap;
`;

const CoverageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  height: 2em;
  padding: 1px;
  border-radius: 100px;
  background: white;
  border: 1px solid #e0e0e0;
`;

const ToggleOption = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  background: ${props => props.active ? '#062057' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.15s ease;
  border-radius: 12px;

  
  &:active {
    transform: scale(0.97);
  }
  
  &:focus {
    outline: none;
  }
`;

const ValueInput = styled.input`
  width: 100%;
  height: 2em;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  background: white;
  padding: 0 8px;
  text-align: center;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  
  &:hover, &:focus {
    border-color: #2563eb;
    outline: none;
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;