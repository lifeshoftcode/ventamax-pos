import { Button, Alert, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SelectCartData, toggleReceivableStatus } from '../../../../../../../../../features/cart/cartSlice';
import { calculateInvoiceChange } from '../../../../../../../../../utils/invoice';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { resetAR, selectAR, setAR } from '../../../../../../../../../features/accountsReceivable/accountsReceivableSlice';
import styled from 'styled-components';
import { selectUser } from '../../../../../../../../../features/auth/userSlice';
import { fbGetActiveARCount } from '../../../../../../../../../firebase/accountsReceivable/fbGetActiveARCount';
import { ARValidateMessage } from './components/ARValidateMessage';
import { useQuery } from '@tanstack/react-query';


// Hook personalizado para manejar la lógica de AR
const useARValidation = (cartData, creditLimit) => {
    const user = useSelector(selectUser);
    const change = useMemo(() => calculateInvoiceChange(cartData), [cartData]);
    const client = cartData?.client;
    const clientId = client?.id;
    const { currentBalance } = useSelector(selectAR);
    
    const isGenericClient = clientId === 'GC-0000' || clientId === null;
    const isChangeNegative = change < 0;
    
    // React Query para obtener el recuento de AR activos
    const { data: activeAccountsReceivableCount = 0 } = useQuery
    (
        {
        queryKey: ['activeARCount', user.businessID, clientId],
        queryFn: () => fbGetActiveARCount(user.businessID, clientId),
        enabled: Boolean(creditLimit?.invoice?.status && clientId && user.businessID),
        staleTime: 60000,
        }
    );
    
    // Calcular si está dentro del límite de factura
    const isWithinInvoiceCount = !creditLimit?.invoice?.status || 
      activeAccountsReceivableCount <= (creditLimit?.invoice?.value || 0);
    
    // Calcular si está dentro del límite de crédito
    const creditLimitValue = creditLimit?.creditLimit?.status && currentBalance !== null ? 
      (currentBalance) + (-change) : 0;
    
    const isWithinCreditLimit = !creditLimit?.creditLimit?.status || 
      creditLimitValue <= creditLimit?.creditLimit?.value;
    
    return {
      isGenericClient,
      isChangeNegative,
      isWithinCreditLimit,
      isWithinInvoiceCount,
      activeAccountsReceivableCount,
      creditLimitValue,
      clientId,
    };
  };

export const MarkAsReceivableButton = ({creditLimit = null}) => {
    const dispatch = useDispatch();
    // const [activeAccountsReceivableCount, setActiveAccountsReceivableCount] = useState(0);
    // const [isWithinCreditLimit, setIsWithinCreditLimit] = useState(null);
    // const [isWithinInvoiceCount, setIsWithinInvoiceCount] = useState(null);
    // const [creditLimitValue, setCreditLimitValue] = useState(0);
    const cartData = useSelector(SelectCartData);
    const user = useSelector(selectUser);
    const change = useMemo(() => calculateInvoiceChange(cartData), [cartData]);
    const client = cartData?.client;

    const {
        isGenericClient,
        isChangeNegative,
        isWithinCreditLimit,
        isWithinInvoiceCount,
        activeAccountsReceivableCount,
        creditLimitValue,
        clientId,
      } = useARValidation(cartData, creditLimit);
    
    // const isChangeNegative = change < 0;
    // const clientId = cartData?.client?.id;
    // const isGenericClient = clientId === 'GC-0000' || clientId === null;

    const isAddedToReceivables = cartData?.isAddedToReceivables;
    const receivableStatus = isAddedToReceivables && isWithinCreditLimit;
    const { currentBalance } = useSelector(selectAR);

    useEffect(() => {
        if (!cartData.isAddedToReceivables || !creditLimit) {
            dispatch(resetAR())
        }
    }, [cartData?.isAddedToReceivables, creditLimit])

    useEffect(() => {
        const fetchInvoiceAvailableCount = async () => {
            if (creditLimit?.invoice?.status) {
                const invoiceAvailableCount = await fbGetActiveARCount(user.businessID, clientId)
                // setActiveAccountsReceivableCount(invoiceAvailableCount);
                // setIsWithinInvoiceCount(invoiceAvailableCount <= creditLimit?.invoice?.value || 0);
            }else{
                // setIsWithinInvoiceCount(true)
            
            }
        }
        fetchInvoiceAvailableCount()
    }, [clientId, user, creditLimit])
    useEffect(() => {
        if (creditLimit?.creditLimit?.status && currentBalance !== null) {
            const adjustedCreditLimit = (currentBalance) + (-change);
            // setIsWithinCreditLimit(adjustedCreditLimit <= creditLimit?.creditLimit?.value);
            // setCreditLimitValue(adjustedCreditLimit);
        }else {
            // setIsWithinCreditLimit(true)
        }
    }, [creditLimit, currentBalance, change]);

    function handleClick() {
        if (!creditLimit?.creditLimit?.status || !creditLimit?.invoice?.status) {
            notification.error({
                message: 'Error',
                description: 'Los límites de crédito o las facturas no son válidos'
            });
            return;
        }
        const invoiceId = cartData.id;
        if (isGenericClient) {
            notification.error({
                message: 'Error',
                description: 'No se puede agregar a CXC a un cliente genérico'
            })
            return
        }
        if (!clientId && !invoiceId) {
            notification.error({
                message: 'Error',
                description: 'No se puede agregar a CXC sin cliente o factura'
            })
            return
        }
        if (isChangeNegative) {
            dispatch(toggleReceivableStatus())
        }
        if (!receivableStatus) {
            dispatch(setAR({ clientId, invoiceId }))
        } else {
            dispatch(resetAR())
        }
    }

    return (
        <Fragment>
            {
                isChangeNegative && 
                <Container>
                    <Button
                        style={{ width: '100%' }}
                        onClick={handleClick}
                        spellCheck={true}
                        disabled={isGenericClient || !isWithinCreditLimit || !isWithinInvoiceCount }
                    >
                        {receivableStatus ? 'Quitar de CXC' : 'Agregar a CXC'}
                    </Button>
                    <ARValidateMessage
                        isGenericClient={isGenericClient}
                        clientId={clientId}
                        invoiceId={cartData.id}
                        isChangeNegative={isChangeNegative}
                        isWithinCreditLimit={isWithinCreditLimit}
                        isWithinInvoiceCount={isWithinInvoiceCount}
                        activeAccountsReceivableCount={activeAccountsReceivableCount}
                        currentBalance={currentBalance}
                        creditLimit={creditLimit}
                        creditLimitValue={creditLimitValue}
                    />
                </Container>
            }
         
        </Fragment>

    );

}
const Container = styled.div`
    display: grid;
    gap: 0.4em;
`