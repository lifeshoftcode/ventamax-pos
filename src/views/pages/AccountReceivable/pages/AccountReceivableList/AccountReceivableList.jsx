import styled from "styled-components";
import { MenuApp } from "../../../../templates/MenuApp/MenuApp";
import { AccountReceivableTable } from "./components/AccountReceivableTable/AccountReceivableTable";
import { useEffect, useState } from "react";
import { FilterAccountReceivable } from "./components/FilterAccountReceivable/FilterAccountReceivable";
import { useListenAccountsReceivable } from "../../../../../firebase/accountsReceivable/accountReceivableServices";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../features/auth/userSlice";
import { DateTime } from "luxon";
import { getDateRange } from "../../../../../utils/date/getDateRange";
import { sortAccounts } from "../../../../../utils/sorts/sortAccountsReceivable";

const Container = styled.div`
    display: grid;
    height: 100vh;
    grid-template-rows: min-content min-content 1fr;
`;

const mapDataToAccounts = (data) => {
    return data?.map((account) => {
        const invoiceData = account?.invoice?.data;
        const client = account?.client || {};
        const paymentMethods = invoiceData?.paymentMethod || [];

        // Calcular total pagado
        const totalPaid = paymentMethods.reduce((sum, method) => {
            return method.status ? sum + method.value : sum;
        }, 0);

        // Determinar si es una aseguradora basado en account.account.type
        const isInsurance = account?.account?.type === 'insurance';

        return {
            ncf: invoiceData?.NCF || "N/A",
            invoiceNumber: invoiceData?.numberID || "N/A",
            client: client?.name || "Generic Client",
            rnc: client?.personalID,
            // Incluir la información de la aseguradora si existe
            insurance: invoiceData?.insurance?.name || account?.account?.insurance?.name || "N/A",
            hasInsurance: !!(invoiceData?.insurance?.name || account?.account?.insurance?.name),
            isInsurance: isInsurance, // Flag basado en account.account.type
            date: account?.createdAt,
            initialAmount: account?.initialAmountAr || 0,
            lastPaymentDate: account?.lastPaymentDate,
            totalPaid: totalPaid,
            balance: (account?.balance || 0),
            products: invoiceData?.products?.length || 0,
            total: invoiceData?.totalPurchase?.value || 0,
            ver: { account },
            actions: { account },
            type: account?.account?.type || 'normal', // Añadir explícitamente el tipo
            dateGroup: account?.createdAt?.seconds
                ? DateTime.fromMillis(account.createdAt.seconds * 1000).toLocaleString(DateTime.DATE_FULL)
                : "N/A"
        };
    });
};

export const AccountReceivableList = () => {
    const user = useSelector(selectUser);
    const [datesSelected, setDatesSelected] = useState(getDateRange('today'));
    const [processedAccount, setProcessedAccount] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriteria, setSortCriteria] = useState('defaultCriteria');
    const [sortDirection, setSortDirection] = useState('asc');
    const [clientType, setClientType] = useState('normal'); // 'normal' o 'insurance'

    const accounts = useListenAccountsReceivable(user, datesSelected);

    useEffect(() => {
        const data = mapDataToAccounts(accounts);
        
        // Filtrar por tipo de cliente
        const filteredByClientType = filterAccountsByClientType(data, clientType);
        
        const sortedData = sortAccounts(filteredByClientType, sortCriteria, sortDirection);
        setProcessedAccount(sortedData);
    }, [accounts, sortCriteria, sortDirection, clientType]);

    // Filtrar cuentas por tipo de cliente: normal o insurance
    const filterAccountsByClientType = (data, type) => {
        if (!data) return [];
        
        if (type === 'insurance') {
            // Mostrar cuentas que son de tipo 'insurance'
            return data.filter(account => account.type === 'insurance');
        }
        // Para clientes normales, excluir las aseguradoras
        return data.filter(account => account.type !== 'insurance');
    };

    // Calculate total balance
    const totalBalance = processedAccount.reduce((sum, account) => {
        return sum + (account.balance || 0);
    }, 0);

    const handleSort = (sortedAccounts) => {
        setProcessedAccount(sortedAccounts);
    };

    const handleClientTypeChange = (type) => {
        setClientType(type);
    };

    return (
        <Container>
            <MenuApp
                searchData={searchTerm}
                setSearchData={setSearchTerm}
            />
            <FilterAccountReceivable
                accounts={processedAccount} // Pasar processedAccount en lugar de accounts
                onSort={handleSort}
                datesSelected={datesSelected}
                setDatesSelected={setDatesSelected}
                onClientTypeChange={handleClientTypeChange}
            />
            <AccountReceivableTable
                data={processedAccount}
                searchTerm={searchTerm}
                totalBalance={totalBalance}
                showInsuranceColumn={clientType === 'insurance'} // Mostrar columna solo cuando se selecciona aseguradora
            />
        </Container>
    );
};