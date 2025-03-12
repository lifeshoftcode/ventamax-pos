import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Counter } from '../../../../templates/system/Counter/Counter';
import { deleteProduct, changeProductPrice } from '../../../../../features/cart/cartSlice';
import { useFormatPrice } from '../../../../../hooks/useFormatPrice';
import { icons } from '../../../../../constants/icons/icons';
import { motion } from 'framer-motion';
import * as antd from 'antd';
import { getTotalPrice } from '../../../../../utils/pricing';
import { selectTaxReceiptEnabled } from '../../../../../features/taxReceipt/taxReceiptSlice';
import PriceAndSaleUnitsModal from '../PriceAndSaleUnitsModal';
import useInsuranceEnabled from '../../../../../hooks/useInsuranceEnabled';
import { extraerPreciosConImpuesto } from './utils/priceUtils';
import { PriceEditor } from './components/PriceEditor/PriceEditor';
import { WeightInput } from './components/WeightInput/WeightInput';
import { InsuranceCoverage } from './components/InsuranceCoverage/InsuranceCoverage';

const { Button } = antd;

const variants = {
    initial: { opacity: 0, y: -90 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 150, transition: { duration: 0.5 } },
};

export const ProductCardForCart = ({ item }) => {
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const insuranceEnabled = useInsuranceEnabled();
    const taxReceiptEnabled = useSelector(selectTaxReceiptEnabled);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [precios, setPrecios] = useState([]);

    const updatePricing = (pricing) => {
        setPrecios(extraerPreciosConImpuesto(pricing, taxReceiptEnabled));
    };

    const handleSelectUnit = (unit) => {
        setSelectedUnit(unit);
        const pricing = unit.pricing;
        updatePricing(pricing);
    };

    const handleSelectDefaultUnit = (unit) => {
        const pricing = unit?.pricing;
        setSelectedUnit(null);
        updatePricing(pricing);
    };

    const handleSelectPrice = (price) => {
        updatePricing(price.pricing);
        // Aquí actualizamos el precio del producto en el carrito
        // Verificamos que tipo de precio se seleccionó y usamos ese valor
        let newPrice;
        
        switch (price.type) {
            case 'listPrice':
                newPrice = price.pricing.listPrice;
                break;
            case 'avgPrice':
                newPrice = price.pricing.avgPrice;
                break;
            case 'minPrice':
                newPrice = price.pricing.minPrice;
                break;
            default:
                newPrice = price.pricing.listPrice;
        }
        
        // Actualizar el precio en el carrito
        if (newPrice && newPrice !== 'N/A') {
            dispatch(changeProductPrice({
                id: item.id,
                price: parseFloat(newPrice)
            }));
        }
        
        // Cerrar el modal después de seleccionar el precio
        setModalVisible(false);
    };

    return (
        <Container variants={variants} initial="initial" animate="animate" transition={{ duration: 0.6 }}>
            <Row>
                <HeaderContainer>
                    <Title>{item.name}</Title>
                    <Price>{useFormatPrice(getTotalPrice(item, taxReceiptEnabled))}</Price>
                    <Button
                        type="text"
                        size="small"
                        icon={icons.operationModes.discard}
                        onClick={() => dispatch(deleteProduct(item.cid))}
                        danger
                    />
                </HeaderContainer>
            </Row>
            <Row>
                <Group>
                    <PriceEditor 
                        item={item} 
                        onModalOpen={() => setModalVisible(true)} 
                    />
                    {
                        item?.weightDetail?.isSoldByWeight ? (
                            <WeightInput item={item} />
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
            
            {insuranceEnabled && <InsuranceCoverage item={item} />}
            
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
    gap: 0.2em;
    position: relative;
`;

const Row = styled.div`
    display: grid;
    align-items: center;
`;

const Group = styled.div`
    display: grid;
    align-items: center;
    gap: 0.4em;
    grid-template-columns: 1fr 1fr;
`;

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr min-content min-content;
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