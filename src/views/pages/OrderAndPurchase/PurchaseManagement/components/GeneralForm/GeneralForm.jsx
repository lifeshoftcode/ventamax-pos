import { Form, Input, Select, DatePicker, message, Modal } from 'antd'
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
import { selectPurchase, AddProductToPurchase, setProductSelected, deleteProductFromPurchase, clearProductSelected, updateProduct, setPurchase, cleanPurchase } from '../../../../../../features/purchase/addPurchaseSlice'
import { getTransactionConditionById, transactionConditions } from '../../../../../../constants/orderAndPurchaseState'
import { useFbGetPendingOrdersByProvider } from '../../../../../../firebase/order/usefbGetOrders'
import NotesInput from './components/NotesInput'
import { useFbGetProviders } from '../../../../../../firebase/provider/useFbGetProvider'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../../../../../../firebase/firebaseconfig'
import { OPERATION_MODES } from '../../../../../../constants/modes'
import { toggleProviderModal } from '../../../../../../features/modals/modalSlice'
import { normalizeText } from '../../../../../../utils/text'
import { selectUser } from '../../../../../../features/auth/userSlice'

const { confirm } = Modal;

const GeneralForm = ({ files, attachmentUrls, onAddFiles, onRemoveFiles, errors }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [providerSearch, setProviderSearch] = useState('');
    const [providerDrawerVisible, setProviderDrawerVisible] = useState(false);
    const unsubscribeRef = useRef(null);
    const { providers = [], loading: providersLoading } = useFbGetProviders();

    const {
        invoiceNumber,
        proofOfPurchase,
        replenishments,
        condition,
        provider: providerId,
        dates,
        deliveryAt,
        paymentAt,
        note
    } = useSelector(selectPurchase);
    console.log('-----',providerId)
    const { data: orders = [], loading: orderLoading } = useFbGetPendingOrdersByProvider(providerId);

    const conditionData = getTransactionConditionById(condition);
    const conditionItems = transactionConditions.map((item) => ({
        label: item.label,
        value: item.id
    }));

    useEffect(() => {
        if (providerId) {
            const providerFromState = providers.find(p => p.provider.id === providerId);
            if (providerFromState) {
                setSelectedProvider(providerFromState.provider);
            }
        }
    }, [providers, providerId]);

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
                        dispatch(setPurchase({ provider: selectedProvider.id }));
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
        if (selectedProvider && providerData && selectedProvider.id !== providerData.id) {
            confirm({
                title: 'Confirmar cambio de proveedor',
                content: '¿Quieres reemplazar el proveedor y descartar datos actuales?',
                onOk() {
                    dispatch(cleanPurchase());
                    dispatch(setPurchase({ provider: providerData.id }));
                    setSelectedProvider(providerData);
                },
            });
        } else if (providerData) {
            setSelectedProvider(providerData);
            dispatch(cleanPurchase());
            dispatch(setPurchase({ provider: providerData.id }));
        } else {
            setSelectedProvider(null);
            dispatch(setPurchase({ provider: null }));
        }
        setProviderDrawerVisible(false);
        setProviderSearch('');
    };

    const handleAddProvider = () => {
        dispatch(toggleProviderModal({ mode: OPERATION_MODES.CREATE.id, data: null }));
    };

    const handleEditProvider = (provider) => {
        dispatch(toggleProviderModal({ mode: OPERATION_MODES.UPDATE.id, data: provider }));
        setProviderDrawerVisible(false);
    };

    const handleProductSave = (productData) => {
        dispatch(setProductSelected(productData));
        dispatch(AddProductToPurchase());
    };

    const clearAddProductForm = () => dispatch(clearProductSelected(null));

    const handleProductUpdate = ({ index, ...updatedValues }) => {
        dispatch(updateProduct({ value: updatedValues, index }));
    };

    const handleRemoveProduct = (index) => {
        dispatch(deleteProductFromPurchase({ id: purchase.replenishments[index].id }));
    };

    const handleInputChange = (field, value) => {
        dispatch(setPurchase({ [field]: value }));
    };

    const handleDateChange = (field, value) => {
        dispatch(setPurchase({
            [field]: value ? dayjs(value).valueOf() : null
        }));
    };

    const handleConditionChange = (value) => {
        dispatch(setPurchase({ condition: value }));
    };

     const handleNoteChange = useCallback((value) => {
        dispatch(setPurchase({ note: value }));
    }, [dispatch]);

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
                <OrderSelector orders={orders} orderLoading={orderLoading} />
                <Form.Item label="Número de Factura">
                    <Input
                        value={invoiceNumber}
                        onChange={e => handleInputChange('invoiceNumber', e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Comprobante de Compra">
                    <Input
                        value={proofOfPurchase}
                        onChange={e => handleInputChange('proofOfPurchase', e.target.value)}
                    />
                </Form.Item>
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
                                value={condition}
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
                        <Form.Item
                            label="Fecha de Pago"
                            required
                            validateStatus={errors?.paymentAt ? "error" : ""}
                            help={errors?.paymentAt ? "La fecha de pago es requerida" : ""}
                        >
                            <DatePicker
                                value={paymentAt ? dayjs(paymentAt) : null}
                                onChange={value => handleDateChange('paymentAt', value)}
                                format="DD/MM/YYYY"
                                style={{ width: '100%' }}
                                status={errors?.paymentAt ? "error" : ""}
                            />
                        </Form.Item>
                    </Group>
                    <NotesInput
                        initialValue={note}
                        onNoteChange={handleNoteChange}
                        errors={{}}
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