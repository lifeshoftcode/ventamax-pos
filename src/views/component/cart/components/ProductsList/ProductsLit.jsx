import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { SelectProduct } from '../../../../../features/cart/cartSlice'
import { ProductCardForCart } from '../ProductCardForCart/ProductCardForCart'
import { AnimatePresence, motion } from 'framer-motion'
import Typography from '../../../../templates/system/Typografy/Typografy'
import { InsuranceAuthFields } from '../InsuranceAuthFields/InsuranceAuthFields'
import { selectInsuranceStatus, selectInsuranceData, updateInsuranceData } from '../../../../../features/insurance/insuranceSlice'
import useInsuranceEnabled from '../../../../../hooks/useInsuranceEnabled'

export const ProductsList = () => {
    const dispatch = useDispatch();
    const ProductSelected = useSelector(SelectProduct);
    const insuranceEnabled = useInsuranceEnabled();
    const insuranceData = useSelector(selectInsuranceData);
    const EMPTY_CART_MESSAGE = "Los productos seleccionados aparecerán aquí...";

    const handleRecurrenceChange = (e) => {
        dispatch(updateInsuranceData({ recurrence: e.target.checked }));
    };

    const handleValidityChange = (e) => {
        dispatch(updateInsuranceData({ validity: e.target.checked }));
    };

    const handleAuthNumberChange = (e) => {
        dispatch(updateInsuranceData({ authNumber: e.target.value }));
    };

    return (
        <Container>
            <Body>
                {ProductSelected.length > 0 ? (
                    <AnimatePresence>
                        {ProductSelected.map((item, index) => (
                            <ProductCardForCart item={item} key={index} />
                        ))}
                    </AnimatePresence>
                ) : (
                    <EmptyCartMessage
                        key="empty-message"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Typography variant='body1'>
                            {EMPTY_CART_MESSAGE}
                        </Typography>
                    </EmptyCartMessage>
                )}
            </Body>
            {insuranceEnabled && (
                <InsuranceAuthFields
                    values={insuranceData}
                    onRecurrenceChange={handleRecurrenceChange}
                    onValidityChange={handleValidityChange}
                    onAuthNumberChange={handleAuthNumberChange}
                />
            )}
        </Container>
    )
}

const Container = styled.ul`
    background-color: ${props => props.theme.bg.color2}; 
    display: grid;
    gap: 0.4em;
    grid-template-rows: 1fr min-content;
    width: 100%;
    margin: 0;
    padding: 0.4em;
    overflow-y: scroll;
    position: relative;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.121);
`
const EmptyCartMessage = styled(motion.div)`
  margin: 1em;
`;

const Body = styled.div`
    display: grid;
    align-items: start;
    align-content: start;
    gap: 0.2rem;
`;