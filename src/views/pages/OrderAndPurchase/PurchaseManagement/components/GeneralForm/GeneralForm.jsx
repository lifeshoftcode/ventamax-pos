import { Form, Input, Select, DatePicker } from 'antd'
import { useCallback, useMemo } from 'react' // Add these imports
import debounce from 'lodash/debounce' // Add this import
import dayjs from 'dayjs'; // Add this import
import styled from 'styled-components'
import EvidenceUpload from '../EvidenceUpload/EvidenceUpload'
import ProductsTable from '../ProductsTable'
import TotalsSummary from '../TotalsSummary'
import AddProductForm from '../AddProduct'
import ProviderSelector from './components/ProviderSelector'
import OrderSelector from './components/OrderSelector'
import { useSelector, useDispatch } from 'react-redux'
import { selectPurchase, AddProductToPurchase, setProductSelected, deleteProductFromPurchase, clearProductSelected, updateProduct, setPurchase } from '../../../../../../features/purchase/addPurchaseSlice'
import { getTransactionConditionById, transactionConditions } from '../../../../../../constants/orderAndPurchaseState'
import { useFbGetPendingOrdersByProvider } from '../../../../../../firebase/order/usefbGetOrders'
import NotesInput from './components/NotesInput'

const GeneralForm = ({ files, attachmentUrls, onAddFiles, onRemoveFiles, errors }) => {
    const dispatch = useDispatch();
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
    const { data: orders = [], loading: orderLoading } = useFbGetPendingOrdersByProvider(providerId);

    const conditionData = getTransactionConditionById(condition);
    const conditionItems = transactionConditions.map((item) => ({
        label: item.label,
        value: item.id // Cambiar de item.value a item.id
    }));

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

    const handleSave = () => {
        // Add your save logic here
        console.log('Saving purchase...');
    };

    const handleCancel = () => {
        // Add your cancel logic here
        console.log('Canceling purchase...');
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

    // Debounced note change handler
    const debouncedNoteChange = useMemo(
        () =>
            debounce((value) => {
                dispatch(setPurchase({ note: value }));
            }, 300),
        [dispatch]
    );

    // Optimized note change handler
    const handleNoteChange = useCallback((value) => {
        dispatch(setPurchase({ note: value }));
    }, [dispatch]);

    return (
        <>

            <InvoiceDetails>
                <ProviderSelector
                    validateStatus={errors?.provider ? "error" : ""}
                    help={errors?.provider ? "El proveedor es requerido" : ""}
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
                        errors={{}} // Remove note error validation
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
