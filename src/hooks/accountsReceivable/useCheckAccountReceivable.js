import { useMemo } from 'react';
// import { fbGetActiveAccountsReceivableCount } from '../../firebase/accountsReceivable/fbGetActiveAccountsReceivableCount';
import { fbGetActiveARCount } from '../../firebase/accountsReceivable/fbGetActiveARCount';
import { useQuery } from '@tanstack/react-query';

export const useCreditLimitCheck = (creditLimit, change, clientId, businessID) => {
    // Fetch active accounts receivable count
    const { data: activeAccountsReceivableCount = 0 } = useQuery({
        queryKey: ['activeARCount', businessID, clientId],
        queryFn: () => fbGetActiveARCount(businessID, clientId),
        enabled: !!businessID && !!clientId && clientId !== 'GC-0000',
        refetchOnWindowFocus: false,
    });

    // Memoize all calculations to prevent unnecessary recalculations
    return useMemo(() => {
        // If there's no creditLimit data, return default values
        if (!creditLimit || !creditLimit.creditLimit) {
            return {
                activeAccountsReceivableCount,
                isWithinCreditLimit: false,
                isWithinInvoiceCount: false,
                creditLimitValue: 0,
                change
            };
        }

        // Otherwise, perform full check
        const creditLimitValue = creditLimit.creditLimit.value;
        const maxInvoices = creditLimit.maxInvoices;
        const currentBalance = creditLimit.currentBalance || 0;
        
        // Get the absolute value of the negative change
        const absoluteChange = change < 0 ? Math.abs(change) : 0;
        
        // Will the new credit exceed the limit?
        const isWithinCreditLimit = (currentBalance + absoluteChange) <= creditLimitValue;
        
        // Is the number of active invoices within the allowed maximum?
        const isWithinInvoiceCount = (activeAccountsReceivableCount || 0) < maxInvoices;
        
        return {
            activeAccountsReceivableCount,
            isWithinCreditLimit,
            isWithinInvoiceCount,
            creditLimitValue,
            change
        };
    }, [creditLimit, change, activeAccountsReceivableCount]);
};