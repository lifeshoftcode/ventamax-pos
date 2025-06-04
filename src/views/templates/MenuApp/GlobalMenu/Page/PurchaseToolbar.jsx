import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import { Button } from '../../../system/Button/Button'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import routesName from '../../../../../routes/routesName'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ButtonGroup } from '../../../..'
import { togglePurchaseChartModal } from '../../../../../features/purchase/purchaseUISlice'

export const PurchaseToolbar = ({ side = 'left' }) => {
    const { PURCHASES, PURCHASES_CREATE } = routesName.PURCHASE_TERM;
    const matchWithCashReconciliation = useMatch(PURCHASES)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOpenPurchaseChart = () => dispatch(togglePurchaseChartModal());
    // const openModal = () => {dispatch(toggleAddPurchaseModal())}
    const openModal = () => navigate(PURCHASES_CREATE);
    
    return (
        matchWithCashReconciliation ? (
            <Container>
                {
                    side === 'right' && (
                        <ButtonGroup>
                              <Button
                                onClick={handleOpenPurchaseChart}
                                >
                                Reporte
                            </Button>
                            <Button
                                icon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={openModal}
                            >
                                Comprar
                            </Button>
                        </ButtonGroup>
                    )
                }
            </Container>
        ) : null
    )
}

const Container = styled.div`

`
