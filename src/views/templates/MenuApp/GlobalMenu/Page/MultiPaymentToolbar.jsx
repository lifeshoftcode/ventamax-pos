import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../../system/Button/Button'
import { useDispatch } from 'react-redux'
import { BankOutlined } from '@ant-design/icons'

export const MultiPaymentToolbar = ({ side = 'left', searchData, setSearchData }) => {
    const matchWithMultiPayment = useMatch("/accounts-receivable")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOpenMultiPayment = () => {
        // En el futuro, aquí podría haber lógica adicional antes de navegar
        navigate('/multi-payment')
    }

    return (
        matchWithMultiPayment ? (
            <Container>
                {
                    side === 'right' && (
                        <Button
                            onClick={handleOpenMultiPayment}
                            title={`Pago múltiple`}
                            borderRadius={'light'}
                            icon={<BankOutlined />}
                        />
                    )
                }
            </Container>
        ) : null
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
`