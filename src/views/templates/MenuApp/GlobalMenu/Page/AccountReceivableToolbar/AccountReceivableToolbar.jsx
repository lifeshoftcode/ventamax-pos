import React, { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../../../system/Button/Button';
import { BankOutlined } from '@ant-design/icons';
import { MultiPaymentModal } from './components/MultiPaymentModal/MultiPaymentModal';
import { useListenAccountsReceivable } from '../../../../../../firebase/accountsReceivable/accountReceivableServices';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../features/auth/userSlice';
import { getDateRange } from '../../../../../../utils/date/getDateRange';
import DateUtils from '../../../../../../utils/date/dateUtils';

export const AccountReceivableToolbar = ({ side = 'left', searchData, setSearchData }) => {
    const matchWithAccountsReceivable = useMatch("/account-receivable/list");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [processedAccounts, setProcessedAccounts] = useState([]);
    const user = useSelector(selectUser);
    
    // Usar un periodo de tiempo por defecto (últimos 30 días)
    const [datesSelected, setDatesSelected] = useState(getDateRange('last30Days'));
    
    // Obtener las cuentas por cobrar para mostrar en el modal
    const accounts = useListenAccountsReceivable(user, datesSelected);
    
    useEffect(() => {
        if (accounts) {
            // Procesar y formatear las cuentas para el modal
            const processed = accounts.map((account) => {
                const invoiceData = account?.invoice?.data;
                const client = account?.client || {};
                const paymentMethods = invoiceData?.paymentMethod || [];

                // Calcular total pagado
                const totalPaid = paymentMethods.reduce((sum, method) => {
                    return method.status ? sum + method.value : sum;
                }, 0);

                // Convertir Timestamp a milisegundos para el campo date
                const dateInMillis = account?.createdAt 
                    ? DateUtils.convertTimestampToMillis(account.createdAt)
                    : null;

                return {
                    ncf: invoiceData?.NCF || "N/A",
                    invoiceNumber: invoiceData?.numberID || "N/A",
                    client: client?.name || "Cliente Genérico",
                    rnc: client?.personalID,
                    insurance: invoiceData?.insurance?.name || account?.account?.insurance?.name || "N/A",
                    hasInsurance: !!(invoiceData?.insurance?.name || account?.account?.insurance?.name),
                    date: dateInMillis, // Timestamp convertido a milisegundos
                    initialAmount: account?.initialAmountAr || 0,
                    totalPaid: totalPaid,
                    balance: (account?.balance || 0),
                    total: invoiceData?.totalPurchase?.value || 0,
                    ver: { account },
                    actions: { account },
                    type: account?.account?.type || 'normal',
                };
            });

            // Filtrar solo las cuentas de tipo 'insurance' (aseguradora)
            const insuranceAccounts = processed.filter(account => 
                account.type === 'insurance' || 
                account.hasInsurance
            );
            
            setProcessedAccounts(insuranceAccounts);
        }
    }, [accounts]);

    const handleOpenMultiPayment = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        matchWithAccountsReceivable ? (
            <Container>
                {side === 'right' && (
                    <>
                        <Button
                            onClick={handleOpenMultiPayment}
                            title={`Pago múltiple de aseguradoras`}
                            borderRadius={'light'}
                            icon={<BankOutlined />}
                        />
                        <MultiPaymentModal 
                            visible={isModalVisible} 
                            onCancel={handleCloseModal} 
                            accounts={processedAccounts}
                        />
                    </>
                )}
            </Container>
        ) : null
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
`;