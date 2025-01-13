import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Drawer, message, Dropdown, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, MoreOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '../../../../../../../firebase/firebaseconfig';
import { useFbGetProviders } from '../../../../../../../firebase/provider/useFbGetProvider';
import { normalizeText } from '../../../../../../../utils/text';
import { OPERATION_MODES } from '../../../../../../../constants/modes';
import { toggleProviderModal } from '../../../../../../../features/modals/modalSlice';
import { cleanPurchase, selectPurchase, setPurchase } from '../../../../../../../features/purchase/addPurchaseSlice';
import { selectUser } from '../../../../../../../features/auth/userSlice';
import { comprobantesOptions } from '../../../../../Contact/Provider/components/CreateContact/constants';

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  gap: 8px;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 1em;
  
  .search-container { flex: 1; }
`;

const ProvidersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  padding: 0 1em;
  overflow-y: auto;
  align-content: start;
`;

const ProviderCard = styled.div`
  background-color: ${props => props.$isSelected ? '#e6f7ff' : 'white'};
  border: 1px solid ${props => props.$isSelected ? '#1890ff' : '#e8e8e8'};
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .actions {
    color: #8c8c8c;
    padding: 4px;
    border-radius: 4px;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }

  .name {
    font-size: 14px;
    font-weight: 500;
    color: #262626;
  }

  .rnc {
    font-size: 12px;
    color: #8c8c8c;
  }
`;

const ProviderInfo = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 0.4em 0.6em 0.6em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #40a9ff;
  }

  &.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8c8c8c;
    min-height: 100px;
  }

  .provider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .provider-name {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
  }

  .provider-details {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.3em;
    font-size: 14px;
    line-height: 1.1pc;
    color: #595959;
  }

  .detail-item {
    gap: 4px;
  }

  .detail-label {
    color: #40a9ff;
    font-size: 12px;
  }
`;

const ProviderSelector = ({ validateStatus, help }) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedProvider, setSelectedProvider] = useState(null);
    const searchInputRef = useRef(null);
    const user = useSelector(selectUser);
    const unsubscribeRef = useRef(null);
    const purchase = useSelector(selectPurchase);

    const { providers = [], loading } = useFbGetProviders();

    useEffect(() => {
        if (visible && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current.focus();
            }, 100);
        }
    }, [visible]);

    useEffect(() => {
        console.log('---------------- provider; ', purchase.provider);
        if (purchase.provider) {
            // Buscar el proveedor que coincida con el ID en el estado de purchase
            const providerFromState = providers.find(p => p.provider.id === purchase.provider);
            if (providerFromState) {
                setSelectedProvider(providerFromState.provider);
            }
        } else {
            // Solo si no hay ID de proveedor en purchase, establecer el primero
            const defaultProvider = providers[0]?.provider;
            if (defaultProvider) {
                setSelectedProvider(defaultProvider);
                dispatch(setPurchase({ provider: defaultProvider.id }));
            }
        }
    }, [providers, purchase.provider]);

    const filteredProviders = search
        ? providers.filter(({ provider }) =>
            normalizeText(provider.name).includes(normalizeText(search)) ||
            normalizeText(provider.rnc || '').includes(normalizeText(search))
        )
        : providers;

    const handleProviderSelect = (providerData) => {
        setSelectedProvider(providerData.provider);
        dispatch(cleanPurchase());
        dispatch(setPurchase({ provider: providerData.provider.id }));
        setVisible(false);
        setSearch('');
        message.success('Proveedor seleccionado');
    };

    const handleAddProvider = () => {
        // TODO: Implementar lógica para agregar proveedor
        dispatch(toggleProviderModal({ mode: createMode, data: null }))
        message.info('Funcionalidad de agregar proveedor pendiente');
    };

    const createMode = OPERATION_MODES.CREATE.id
    const updateMode = OPERATION_MODES.UPDATE.id;

    const handleCardClick = (e, providerData) => {
        // Solo ejecutar si el clic no viene del dropdown o sus elementos
        if (!e.target.closest('.dropdown-container')) {
            handleProviderSelect(providerData);
        }
    };

    const openModalUpdateMode = (e, provider) => {
        dispatch(toggleProviderModal({ mode: updateMode, data: provider }));
        setVisible(false);
    };

    const getMenuItems = (provider) => [
        {
            key: 'edit',
            label: 'Editar',
            icon: <EditOutlined />,
            onClick: (e) => openModalUpdateMode(e, provider)
        }
    ];

    // Efecto para observar cambios en el documento del proveedor seleccionado
    useEffect(() => {
        if (selectedProvider?.id) {
            // Limpiar suscripción anterior si existe
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }

            // Crear nueva suscripción
            unsubscribeRef.current = onSnapshot(
                doc(db, 'businesses', user.businessID, 'providers', selectedProvider.id),
                (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const updatedProvider = {
                            ...selectedProvider,
                            ...docSnapshot.data().provider
                        };
                        setSelectedProvider(updatedProvider);
                        dispatch(setPurchase({ provider: selectedProvider.id }));
                    }
                },
                (error) => {
                    console.error('Error observando proveedor:', error);
                    message.error('Error al sincronizar datos del proveedor');
                }
            );
        }

        // Cleanup function
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [selectedProvider?.id]);

    const handleClearProvider = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedProvider(null);
        dispatch(cleanPurchase());
        dispatch(setPurchase({ provider: "" }));
        message.info('Proveedor deseleccionado');
    };

    const selectedVoucherType = comprobantesOptions.find(
        (voucherType) => voucherType?.value === selectedProvider?.voucherType
    )?.label;

    return (
        <Form.Item
            required
            validateStatus={validateStatus}
            help={help}
        >
            <ProviderInfo 
                className={!selectedProvider ? 'empty' : ''}
                onClick={() => setVisible(true)}
            >
                {!selectedProvider ? (
                    <div>
                        <PlusOutlined style={{ marginRight: 8 }} />
                        Seleccionar Proveedor
                    </div>
                ) : (
                    <>
                        <div className="provider-header">
                            <span className="provider-name">{selectedProvider.name}</span>
                            <CloseOutlined 
                                onClick={handleClearProvider}
                                style={{ cursor: 'pointer', color: '#8c8c8c' }}
                            />
                        </div>
                        <div className="provider-details">
                            <div className="detail-item">
                                <div className="detail-label">RNC:</div>
                                {selectedProvider.rnc || 'N/A'}
                            </div>
                            <div className="detail-item">
                                <div className="detail-label">Tipo de Comprobante:</div>
                                {selectedVoucherType || 'N/A'}
                            </div>
                        </div>
                    </>
                )}
            </ProviderInfo>
            
            <Drawer
                title="Lista de Proveedores"
                placement="bottom"
                onClose={() => setVisible(false)}
                open={visible}
                height={'80%'}
                styles={{
                    body: { padding: '1em' },
                }}
            >
                <Wrapper>
                    <Header>
                        <div className="search-container">
                            <Input
                                ref={searchInputRef}
                                placeholder="Buscar proveedores..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Tooltip title="Agregar proveedor">
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={handleAddProvider}
                            >
                                Proveedor
                            </Button>
                        </Tooltip>
                    </Header>
                    <ProvidersContainer>
                        {filteredProviders.map((providerData) => (
                            <ProviderCard
                                key={providerData.provider.id}
                                onClick={(e) => handleCardClick(e, providerData)}
                                $isSelected={selectedProvider?.id === providerData.provider.id}
                            >
                                <div className="card-header">
                                    <div className="name">{providerData.provider.name}</div>
                                    <div className="dropdown-container" onClick={e => e.stopPropagation()}>
                                        <Dropdown
                                            menu={{ items: getMenuItems(providerData.provider) }}
                                            trigger={['click']}
                                        >
                                            <Button
                                                type="text"
                                                className="actions"
                                                icon={<MoreOutlined />}
                                            />
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="rnc">RNC: {providerData.provider.rnc || 'N/A'}</div>
                            </ProviderCard>
                        ))}
                    </ProvidersContainer>
                </Wrapper>
            </Drawer>
        </Form.Item>
    );
};

export default ProviderSelector;