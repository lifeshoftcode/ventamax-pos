import React, { useState } from 'react'
import { usePendingBalance } from '../../../../../../firebase/accountsReceivable/fbGetPendingBalance';
import styled from 'styled-components';
import { useFormatPrice } from '../../../../../../hooks/useFormatPrice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../features/auth/userSlice';
import { Subtitle } from '../../../Style';

export const GeneralBalance = ({data}) => {
    const user = useSelector(selectUser);
    const businessID = user?.businessID
    const clientId = data?.client?.id
    const [pendingBalance, setPendingBalance] = useState(0)

    usePendingBalance(businessID, clientId, setPendingBalance);

  return (
    <Container>
       <Subtitle>Balance General</Subtitle>
       <Subtitle>{useFormatPrice(pendingBalance)}</Subtitle>
    </Container>
  )
}

const Container = styled.div`
    width: min-content;
    display: grid;
    width: 100%;
   justify-items: right;
    white-space: nowrap;
`