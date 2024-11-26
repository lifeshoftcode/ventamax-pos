import React, { useMemo } from 'react';
import { Select } from 'antd';
import { fromMillisToDateISO } from '../../../../../../../utils/date/convertTimeStampToDate';
import { useFormatPrice } from '../../../../../../../hooks/useFormatPrice';

const OrderSelector = ({ pendingOrders, selectedProvider, onOrderChange }) => {
    const pendingOrdersOption = useMemo(() => {
        if (selectedProvider) {
            return pendingOrders
                .filter(({ data }) => data.provider.id === selectedProvider.id)
                .map(({ data }) => ({
                    label: `#${data.numberId} | ${fromMillisToDateISO(data.dates.createdAt)} | ${useFormatPrice(data.total)}`,
                    value: JSON.stringify(data),
                }));
        }
        return [];
    }, [pendingOrders, selectedProvider]);

    return (
        <Select
            placeholder="Seleccionar Pedido"
            options={pendingOrdersOption}
            onChange={onOrderChange}
            style={{ minWidth: '200px' }}
        />
    );
};

export default OrderSelector;
