import { Form, Input, Select, DatePicker, message } from 'antd'
import { useCallback, useMemo, useState, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'
import dayjs from 'dayjs'
import styled from 'styled-components'
import EvidenceUpload from '../EvidenceUpload/EvidenceUpload'
import ProductsTable from '../ProductsTable'
import TotalsSummary from '../TotalsSummary'
import AddProductForm from '../AddProduct'
import ProviderSelector from '../../../components/ProviderSelector/ProviderSelector'
import OrderSelector from './components/OrderSelector'
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectOrder, 
    AddProductToOrder, 
    setProductSelected, 
    deleteProductFromOrder,
    clearProductSelected,
    updateProduct,
    setOrder 
} from '../../../../../../features/addOrder/addOrderSlice'
import { getTransactionConditionById, transactionConditions } from '../../../../../../constants/orderAndPurchaseState'
import { useFbGetPendingOrdersByProvider } from '../../../../../../firebase/order/usefbGetOrders'
import NotesInput from './components/NotesInput'
import { OPERATION_MODES } from '../../../../../../constants/modes'
import { toggleProviderModal } from '../../../../../../features/modals/modalSlice'
import { normalizeText } from '../../../../../../utils/text'
import { useFbGetProviders } from '../../../../../../firebase/provider/useFbGetProvider'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../../../../../firebase/firebaseconfig'
import { selectUser } from '../../../../../../features/auth/userSlice'

const GeneralForm = ({ files, attachmentUrls, onAddFiles, onRemoveFiles, errors }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [providerSearch, setProviderSearch] = useState('');
    const unsubscribeRef = useRef(null);
    const { providers = [], loading: providersLoading } = useFbGetProviders();

    const {
        numberId,
        replenishments,
        condition,
        provider: providerId,
        deliveryAt,
        paymentAt,
        note
    } = useSelector(selectOrder);
    const { data: orders = [], loading: orderLoading } = useFbGetPendingOrdersByProvider(providerId);

    const conditionData = getTransactionConditionById(condition);
    const conditionItems = transactionConditions.map((item) => ({
        label: item.label,
        value: item.id // Cambiar de item.value a item.id
    }));

    const handleProductSave = (productData) => {
        dispatch(setProductSelected(productData));
        dispatch(AddProductToOrder());
    };

    const clearAddProductForm = () => dispatch(clearProductSelected());

    const handleProductUpdate = ({ index, ...updatedValues }) => {
        dispatch(updateProduct({ value: updatedValues, index }));
    };

    const handleRemoveProduct = (index) => {
        dispatch(deleteProductFromOrder({ id: replenishments[index].id }));
    };

    const handleDateChange = (field, value) => {
        dispatch(setOrder({
            [field]: value ? dayjs(value).toISOString() : null
        }));
    };

    const handleConditionChange = (value) => {
        dispatch(setOrder({ condition: value }));
    };

    // Debounced note change handler
    const debouncedNoteChange = useMemo(
        () =>
            debounce((value) => {
                dispatch(setOrder({ note: value }));
            }, 300),
        [dispatch]
    );

    // Optimized note change handler
    const handleNoteChange = useCallback((value) => {
        dispatch(setOrder({ note: value }));
    }, [dispatch]);

    // Efecto para sincronizar el proveedor seleccionado con el estado
    useEffect(() => {
        if (providerId) {
            const providerFromState = providers.find(p => p.provider.id === providerId);
            if (providerFromState) {
                setSelectedProvider(providerFromState.provider);
            }
        }
    }, [providers, providerId]);

    // Efecto para observar cambios en el proveedor
    useEffect(() => {
        if (selectedProvider?.id) {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }

            unsubscribeRef.current = onSnapshot(
                doc(db, 'businesses', user.businessID, 'providers', selectedProvider.id),
                (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const updatedProvider = {
                            ...selectedProvider,
                            ...docSnapshot.data().provider
                        };
                        setSelectedProvider(updatedProvider);
                        dispatch(setOrder({ provider: selectedProvider.id }));
                    }
                },
                (error) => {
                    console.error('Error observando proveedor:', error);
                    message.error('Error al sincronizar datos del proveedor');
                }
            );
        }

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [selectedProvider?.id]);

    const filteredProviders = useMemo(() => 
        providerSearch
            ? providers.filter(({ provider }) =>
                normalizeText(provider.name).includes(normalizeText(providerSearch)) ||
                normalizeText(provider.rnc || '').includes(normalizeText(providerSearch))
            )
            : providers,
        [providers, providerSearch]
    );

    const handleProviderSelect = (providerData) => {
        setSelectedProvider(providerData);
        dispatch(setOrder({ provider: providerData?.id || null }));
    };

    const handleAddProvider = () => {
        dispatch(toggleProviderModal({ mode: OPERATION_MODES.CREATE.id, data: null }));
    };

    const handleEditProvider = (provider) => {
        dispatch(toggleProviderModal({ mode: OPERATION_MODES.UPDATE.id, data: provider }));
    };

    return (
        <>

            <InvoiceDetails>
                <ProviderSelector
                    validateStatus={errors?.provider ? "error" : ""}
                    help={errors?.provider ? "El proveedor es requerido" : ""}
                    providers={filteredProviders}
                    selectedProvider={selectedProvider}
                    onSelectProvider={handleProviderSelect}
                    onAddProvider={handleAddProvider}
                    onEditProvider={handleEditProvider}
                />
            </InvoiceDetails>
            <AddProductForm
                onSave={handleProductSave}
                onClear={clearAddProductForm}
            />
            <ProductsTable
                products={replenishments}
                onEditProduct={handleProductUpdate}
                removeProduct={handleRemoveProduct}
            />
            <TotalsSummary
                replenishments={replenishments}
            />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: ' repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '1.4em',
                }}>
                <div>
                    <Group>
                        <Form.Item label="Condición" required>
                            <Select
                                options={conditionItems}
                                value={condition} // Cambiado de conditionKey a condition
                                onChange={handleConditionChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Fecha de Entrega"
                            required
                            validateStatus={errors?.deliveryAt ? "error" : ""}
                            help={errors?.deliveryAt ? "La fecha de entrega es requerida" : ""}
                        >
                            <DatePicker
                                value={deliveryAt ? dayjs(deliveryAt) : null}
                                onChange={value => handleDateChange('deliveryAt', value)}
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                                status={errors?.deliveryDate ? "error" : ""}
                            />
                        </Form.Item>
                
                    </Group>
                    <NotesInput
                        initialValue={note}
                        onNoteChange={handleNoteChange}
                        errors={errors}
                    />
                </div>
                <EvidenceUpload
                    files={files}
                    attachmentUrls={attachmentUrls}
                    onAddFiles={onAddFiles}
                    onRemoveFiles={onRemoveFiles}
                />
            </div>


        </>
    );
}

GeneralForm.defaultProps = {
    files: [],
    attachmentUrls: [],
    onAddFiles: () => { },
    onRemoveFiles: () => { },
    errors: {}
};

export default GeneralForm

const Group = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1em;
    @media (width <= 768px) {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
`
const InvoiceDetails = styled.div`
    overflow-x: auto;
    display: grid;
    grid-template-columns: 300px 200px 200px 200px;
    gap: 0.4em;
  
`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    position: sticky;
    bottom: 0;
    width: 100%;
    gap: 1em;
   background-color: white;
   padding-top: 1em;
   border-top: 1px solid #e8e8e8;
`
