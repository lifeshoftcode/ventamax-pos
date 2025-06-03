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
import BackOrdersModal from "../../../PurchaseManagement/components/BackOrdersModal";
import { useBackOrdersByProduct } from "../../../../../../firebase/warehouse/backOrderService";

const GeneralForm = ({ files, attachmentUrls, onAddFiles, onRemoveFiles, errors, mode, backOrderAssociationId }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [providerSearch, setProviderSearch] = useState('');
    const unsubscribeRef = useRef(null);
    const { providers = [], loading: providersLoading } = useFbGetProviders();
    const [isBackOrderModalVisible, setIsBackOrderModalVisible] = useState(false);
    const [selectedProductForBackorders, setSelectedProductForBackorders] = useState(null);
    const { backOrders = [] } = useBackOrdersByProduct(selectedProductForBackorders?.id);

    const {
        numberId,
        replenishments,
        condition,
        provider: providerId,
        deliveryAt,
        paymentAt,
        note
    } = useSelector(selectOrder);

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

    const handleRemoveProduct = (productId) => {
        dispatch(deleteProductFromOrder({ id: productId }));
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

    const handleQuantityClick = async (record) => {
        const fullProduct = replenishments.find(p => p.id === record.id);
        if (!fullProduct) {
            console.error('No se encontró el producto completo:', record);
            return false;
        }
        setSelectedProductForBackorders(fullProduct);
        if (fullProduct.selectedBackOrders?.length > 0) {
            setIsBackOrderModalVisible(true);
            return true;
        }
        const existingBackorders = backOrders.filter(bo => bo.productId === fullProduct.id);
        if (existingBackorders.length > 0) {
            setIsBackOrderModalVisible(true);
            return true;
        }
        const updatedValues = {
            purchaseQuantity: fullProduct.quantity || 0,
            selectedBackOrders: []
        };
        handleProductUpdate({ index: fullProduct.key, ...updatedValues });
        return false;
    };
    const handleBackOrderModalConfirm = (backOrderData) => {
        const totalBackOrderQuantity = backOrderData.selectedBackOrders.reduce((sum, bo) => sum + bo.quantity, 0);
        const purchaseQuantity = backOrderData.purchaseQuantity;
        const quantity = Math.max(0, purchaseQuantity - totalBackOrderQuantity);
        const updatedValues = {
            ...backOrderData,
            selectedBackOrders: backOrderData.selectedBackOrders,
            purchaseQuantity,
            quantity
        };
        handleProductUpdate({ ...updatedValues });
        setIsBackOrderModalVisible(false);
        setSelectedProductForBackorders(null);
    };

    const handleBackOrderModalCancel = () => {
        setIsBackOrderModalVisible(false);
        setSelectedProductForBackorders(null);
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
            mode={mode}
                onSave={handleProductSave}
                onClear={clearAddProductForm}
            />
            <ProductsTable
                products={replenishments}
                onEditProduct={handleProductUpdate}
                removeProduct={handleRemoveProduct}
                onQuantityClick={handleQuantityClick}  // NEW: pass the backorder click handler 
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
            {selectedProductForBackorders && (
                <BackOrdersModal
                    backOrders={backOrders}
                    isVisible={isBackOrderModalVisible}
                    onCancel={handleBackOrderModalCancel}
                    onConfirm={handleBackOrderModalConfirm}
                    initialSelectedBackOrders={selectedProductForBackorders.selectedBackOrders || []}
                    initialPurchaseQuantity={selectedProductForBackorders.purchaseQuantity || 0}
                    productId={selectedProductForBackorders.id}
                    backOrderAssociationId={backOrderAssociationId}
                    mode={mode}
                    purchaseId={numberId} // Pasamos el ID de la orden/compra
                />
            )}
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
