import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as antd from 'antd'
const { Button } = antd
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../../features/auth/userSlice'
import routesName from '../../../../../routes/routesName'
import { Tooltip } from '../../../system/Button/Tooltip'
import { icons } from '../../../../../constants/icons/icons'

export const OrderToolbar = ({ side = 'left' }) => {
    const { ORDERS, ORDERS_CREATE } = routesName.ORDER_TERM;

    const matchWithCashReconciliation = useMatch(ORDERS)

    const navigate = useNavigate()


    // const openModal = () => dispatch(openModalAddOrder());
    const openModal = () => navigate(ORDERS_CREATE);
    return (
        matchWithCashReconciliation ? (
            <Container>
                {
                    side === 'right' && (
                        <Tooltip
                            description='Realizar Comprar'
                            Children={

                                <Button
                                    icon={icons.operationModes.add}
                                    onClick={openModal}
                                >Pedido</Button>

                            } />
                    )
                }
            </Container>
        ) : null
    )
}

const Container = styled.div`

`
