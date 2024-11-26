import React, { useEffect, useState } from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import styled from 'styled-components'
import EvidenceUpload from '../EvidenceUpload'
import ProductsTable from '../ProductsTable'
import TotalsSummary from '../TotalsSummary'
import AddProduct from '../AddProduct'
import ProviderSelector from './components/ProviderSelector'
import OrderSelector from './components/OrderSelector'
import { selectUser } from '../../../../../../features/auth/userSlice'
import { useSelector } from 'react-redux'
import { useFbGetProviders } from '../../../../../../firebase/provider/useFbGetProvider'
// import { useFbGetPendingOrders } from '../../../../../../firebase/order/usefbGetOrders'

const { TextArea } = Input
const { Option } = Select

const GeneralForm = ({ }) => {
    const user = useSelector(selectUser);
    const { providers } = useFbGetProviders(user);
    // const { pendingOrders } = useFbGetPendingOrders(user);

    return (
        <>
            <Group>
                <Form.Item label="Nombre del Proveedor" required>
                    <ProviderSelector  />
                </Form.Item>
                <Form.Item label="Seleccionar Pedido" required>
                    <OrderSelector />
                </Form.Item>
                {/* <Form.Item label="Número de Factura">
                    <Input name="orderNumber" value={purchaseData.orderNumber} onChange={handleInputChange} required />
                </Form.Item> */}
                {/* <Form.Item label="Comprobante de Compra">
                    <Input name="purchaseReceipt" value={purchaseData.purchaseReceipt} onChange={handleInputChange} required />
                </Form.Item> */}
            </Group>
            {/* <AddProduct
                onSave={handleProductSave}
                initialData={editingProduct}
            /> */}
            {/* <ProductsTable
                products={products}
                showProductModal={showProductModal}
                removeProduct={removeProduct}
                onEditProduct={showProductModal}
            /> */}
            {/* <TotalsSummary totals={totals} />
            <div style={{ display: 'grid', gridTemplateColumns: ' repeat(auto-fit, minmax(250px, 1fr))', }}>
                <div>
                    <Group>
                        <Form.Item label="Condición" required>
                            <Select name="condition" value={purchaseData.condition} onChange={handleInputChange} required>
                                <Option value="Condición 1">Condición 1</Option>
                                <Option value="Condición 2">Condición 2</Option>
                                <Option value="Condición 3">Condición 3</Option>
                            </Select>
                        </Form.Item>
                    </Group>
                    <Group>
                        <Form.Item label="Fecha de Entrega" style={{ width: '100%' }} required>
                            <DatePicker name="deliveryDate" value={purchaseData.deliveryDate} onChange={handleInputChange} required style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Fecha de Pago" style={{ width: '100%' }}>
                            <DatePicker name="paymentDate" value={purchaseData.paymentDate} onChange={handleInputChange} required style={{ width: '100%' }} />
                        </Form.Item>
                    </Group>
                </div>
                <EvidenceUpload />
            </div>
            <Form.Item label="Notas">
                <TextArea name="notes" value={purchaseData.notes} onChange={handleInputChange} />
            </Form.Item> */}
        </>
    )
}

export default GeneralForm

const Group = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1em;
    @media (width <= 768px) {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
`
