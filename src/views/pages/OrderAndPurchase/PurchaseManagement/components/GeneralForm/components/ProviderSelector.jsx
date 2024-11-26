import React, { useMemo, useState } from 'react';
import { Select } from 'antd';
import { useFbGetProviders } from '../../../../../../../firebase/provider/useFbGetProvider';
import { selectUser } from '../../../../../../../features/auth/userSlice';
import { useSelector } from 'react-redux';

const ProviderSelector = () => {
    const [selectedProvider, setSelectedProvider] = useState(null);
    const user = useSelector(selectUser);
    const { providers } = useFbGetProviders(user);

    const handleProviderSelect = (provider) => {
        setSelectedProvider(JSON.parse(provider));
        //enviar el id al estado de redux 
    };

    return (
        <Select
            placeholder="Seleccionar Proveedor"
            options={providers.map((provider) => ({
                label: provider.name,
                value: JSON.stringify(provider),
            }))}
            value={selectedProvider?.name || null}
            onChange={handleProviderSelect}
            style={{ minWidth: '200px' }}
        />
    );
};

export default ProviderSelector;
