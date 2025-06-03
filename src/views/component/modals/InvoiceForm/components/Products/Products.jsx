import React, { useState } from 'react'
import styled from 'styled-components'
import { Product } from './components/Product/Product'
import * as antd from 'antd'
import { useDispatch } from 'react-redux'
import { addProductInvoiceForm, changeAmountToBuyProduct, deleteProductInvoiceForm } from '../../../../../../features/invoice/invoiceFormSlice'
import { icons } from '../../../../../../constants/icons/icons'
import { useFormatPrice } from '../../../../../../hooks/useFormatPrice'
import { ProductListModal } from './ProductListModal'
const { Button, Input, Table } = antd
import { useGetProducts } from '../../../../../../firebase/products/fbGetProducts'
import { getTotalPrice } from '../../../../../../utils/pricing'
export const Products = ({ invoice }) => {
    const dispatch = useDispatch()
    const [isProductListModalVisible, setProductListModalVisible] = useState(false)
    const {products} = useGetProducts()
   
    const columns = [
        {
            title: 'Producto',
            dataIndex: 'name',
            key: 'productName',
        },
        {
            title: 'Cantidad',
            dataIndex: 'amountToBuy',
            key: 'amountToBuy',
            render: (text, record, index) => (
                <Counter>
                    <Button
                        onClick={() => dispatch(changeAmountToBuyProduct({ product: record, type: "subtract" }))}
                        icon={icons.mathOperations.subtract}
                    />
                    <Input
                        value={record.amountToBuy}
                        onChange={(e) => {
                            const value = e.target.value;
                            const isValidNumber = !isNaN(parseFloat(value)) && isFinite(value);
                            if (isValidNumber) {
                                dispatch(changeAmountToBuyProduct({ product: record, amount: Number(value), type: "change" }))
                            }
                        }}
                    />
                    <Button
                        onClick={() => dispatch(changeAmountToBuyProduct({ product: record, type: "add" }))}
                        icon={icons.operationModes.add}
                    />
                </Counter>
            ),
        },
        {
            title: 'Precio Unitario',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => `${useFormatPrice(getTotalPrice(record) )}`,
        },
        {
            title: 'Precio Total',
            key: 'totalPrice',
            render: (text, record) => `${useFormatPrice(getTotalPrice(record) )}`,
        },
        {
            title: 'Acciones',
            key: 'actions',

            render: (text, record) => (
                <Button
                    onClick={() => dispatch(deleteProductInvoiceForm({ product: record, }))}
                    icon={icons.operationModes.delete}
                />
            ),
        }
    ];
    const paginationConfig = {
        pageSize: 5,
        position: ["bottomCenter"]
    }
    const showProductListModal = () => {
        setProductListModalVisible(true)
    }
    const handleAddProduct = (product) => {
        dispatch(addProductInvoiceForm({ product }))
        setProductListModalVisible(false)
    }
    return (
        <Container>
            <ActionsContainer>
                <Button type="primary" onClick={showProductListModal}>
                    Añadir Producto
                </Button>
            </ActionsContainer>
            <Table
                size='small'
                dataSource={invoice?.products}
                columns={columns}

                pagination={paginationConfig}
                rowKey="id"
            />
            <ProductListModal
                isVisible={isProductListModalVisible}
                onClose={() => setProductListModalVisible(false)}
                products={products}
                onAddProduct={handleAddProduct}
            />
        </Container>
    )
}

const Container = styled.div`

`
const Counter = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: 2em 80px 2em;
`
const ActionsContainer = styled.div`
  text-align: right; // Esto alinea tu botón a la derecha
  margin-bottom: 16px; // Para que no quede tan pegado al input
`