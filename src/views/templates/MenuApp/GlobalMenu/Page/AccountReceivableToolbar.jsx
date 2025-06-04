import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../../system/Button/Button'
import { useDispatch } from 'react-redux'
import { BankOutlined } from '@ant-design/icons'
import { openMultiPaymentModal } from '../../../../../features/modals/modalSlice'

export const AccountReceivableToolbar = ({ side = 'left', searchData, setSearchData }) => {
    const matchWithAccountsReceivable = useMatch("/account-receivable/list")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOpenMultiPayment = () => {
        dispatch(openMultiPaymentModal());
    }

    return (
        matchWithAccountsReceivable ? (
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