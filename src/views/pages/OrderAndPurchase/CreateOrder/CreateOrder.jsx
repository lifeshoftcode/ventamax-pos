import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonGroup, MenuApp, Select } from '../../..'
import { Button } from '../../..'
import { StockedProductPicker } from '../../../component/StockedProductPicker/StockedProductPicker'
import { ProductListSelected } from '../../../component/ProductListSelected/ProductListSelected'
import { selectUser } from '../../../../features/auth/userSlice'
import { useFbGetProviders } from '../../../../firebase/provider/useFbGetProvider'
import {
    setOrder,
    AddProductToOrder,
    // DeleteProduct,
    selectOrder,
    selectOrderState,
    SelectProduct,
    selectProductSelected,
    selectProducts,
    // SelectTotalPurchase,
    cleanOrder,
    setProductSelected,
    updateProduct
} from '../../../../features/addOrder/addOrderSlice'
import { OrderDetails } from './OrderDetails/OrderDetails'
import { addNotification } from '../../../../features/notification/NotificationSlice'
import { toggleProviderModal } from '../../../../features/modals/modalSlice'
import { useNavigate } from 'react-router-dom'
import ROUTES_PATH from '../../../../routes/routesName'
import { OPERATION_MODES } from '../../../../constants/modes'
import { fbUpdateOrder } from '../../../../firebase/order/fbUpdateOrder'
import { fbAddOrder } from '../../../../firebase/order/fbAddOrder'
import * as antd from 'antd'
const { Form } = antd
import { SelectStyle } from '../CreatePurchase/CreatePurchase'
import { icons } from '../../../../constants/icons/icons'

const useGetProvider = (providerId, providers) => {
    return useMemo(() => {
        return providers.find(({ provider }) => provider.id === providerId);
    }, [providerId, providers]);
}

export const CreateOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const UpdateRef = OPERATION_MODES.UPDATE.id;
    const CreateRef = OPERATION_MODES.CREATE.id;
    const user = useSelector(selectUser);

    const OrderSelected = useSelector(selectOrder);
    const OrderState = useSelector(selectOrderState);
    const selectedProduct = useSelector(selectProductSelected);
    const productsSelected = useSelector(selectProducts);
    // const productTotalPurchasePrice = useSelector(SelectTotalPurchase)
    const { ORDERS } = ROUTES_PATH.ORDER_TERM
    const { providers } = useFbGetProviders(user);
    const providerId = OrderSelected.providerId;
    const provider = useGetProvider(providerId, providers);

    const handleClose = () => {
        dispatch(cleanOrder());
        navigate(ORDERS);
    }

    const HandleSubmit = async () => {
        if (!OrderSelected?.providerId) {
            dispatch(addNotification({ title: 'Error', message: 'Agregue el proveedor', type: 'error' }))
            return
        }
        if (OrderSelected.replenishments.length <= 0) {
            dispatch(addNotification({ title: 'Error', message: 'Agregue un producto', type: 'error' }))
            return
        }
        if (!OrderSelected.dates.deliveryDate) {
            dispatch(addNotification({ title: 'Error', message: 'Agregue la Fecha de entrega', type: 'error' }))
            return
        }
        if (!OrderSelected.condition) {
            dispatch(addNotification({ title: 'Error', message: 'Agregue la Condición', type: 'error' }))
            return
        }
        const filesToUpload = fileList.map(file => file.originFileObj);
        try {
            if (OrderState.mode === CreateRef) {
                // Lógica para crear la orden
                await fbAddOrder(user, OrderSelected, filesToUpload)
                    .then(() => {
                        dispatch(addNotification({ message: 'Pedido Creado', type: 'success' }));
                        handleClose();
                    });
            } else if (OrderState.mode === UpdateRef) {
                // Lógica para editar la orden
                await fbUpdateOrder(user, OrderSelected, filesToUpload)
                    .then(() => {
                        dispatch(addNotification({ message: 'Pedido Actualizado', type: 'success' }));
                        handleClose();
                    });
            }
        } catch (error) {
            setTimeout(() => {
                dispatch(addNotification({ title: 'Error', message: `${error}`, type: 'error' }))
            }, 1000)
        }

    }
    const handleCancel = () => {
        dispatch(cleanOrder());
        navigate(-1)
    }

    const selectProduct = (product) => dispatch(SelectProduct(product));
    const handleSetSelectedProduct = (obj) => dispatch(setProductSelected(obj));
    const addProduct = () => dispatch(AddProductToOrder());
    // const handleDeleteProduct = (product) => dispatch(DeleteProduct(product.id));
    const handleUpdateProduct = (product) => dispatch(updateProduct(product));

    const providersOption = useMemo(() => {
        return providers.map(({ provider }) => {
            return {
                label: provider.name,
                value: provider.id
            };
        });
    }, [providers]);

    const title = {
        [CreateRef]: 'Nuevo Pedido',
        [UpdateRef]: 'Editar Pedido'
    }

    const handleProviderChange = (providerId) => {
    
        dispatch(setOrder({ providerId }));
    };

    const createMode = OPERATION_MODES.CREATE.id
    const openProviderModal = () => { dispatch(toggleProviderModal({ mode: createMode, data: null })) }

    return (
        <Form layout='vertical'>
            <Modal>
                <Header>
                    <MenuApp
                        sectionName={title[OrderState.mode]}
                    />
                </Header>
                <BodyContainer>
                    <Body>
                        <div >
                            <SelectWithButton>
                                <Form.Item
                                    label="Proveedores"
                                    required
                                    rules={[{ required: true, message: 'Seleccione un proveedor' }]}
                                >
                                    <antd.Select
                                        style={SelectStyle}
                                        placeholder={"Proveedores"}
                                        options={providersOption}
                                        value={provider?.name}
                                        onChange={handleProviderChange}
                                    />
                                </Form.Item>
                                <antd.Button
                                    icon={icons.operationModes.add}
                                    size='medium'
                                    onClick={openProviderModal}
                                />
                            </SelectWithButton>

                        </div>
                        <StockedProductPicker
                            addProduct={addProduct}
                            selectProduct={selectProduct}
                            selectedProduct={selectedProduct}
                            setProductSelected={handleSetSelectedProduct}
                        />
                        <ProductListSelected
                            productsSelected={productsSelected}
                            // productsTotalPrice={productTotalPurchasePrice}
                            // handleDeleteProduct={handleDeleteProduct}
                            handleUpdateProduct={handleUpdateProduct}
                        />
                        <OrderDetails
                            fileList={fileList}
                            setFileList={setFileList}
                        />
                        <WrapperFooter>
                            <ButtonGroup>
                                <Button
                                    title='Cancelar'
                                    borderRadius={'normal'}
                                    color={"white-contained"}
                                    height={'large'}
                                    onClick={handleCancel}
                                />
                                <Button
                                    title={OrderState.mode === CreateRef ? 'Crear' : 'Actualizar'}
                                    borderRadius={'normal'}
                                    color='primary'
                                    height={'medium'}
                                    onClick={HandleSubmit}
                                />
                            </ButtonGroup>
                        </WrapperFooter>
                    </Body>
                </BodyContainer>
            </Modal>
        </Form>


    )
}

const Modal = styled.div`
    max-width: 100%;
    width: 100%;
    height: 100vh;
    background-color: var(--color2);
    overflow: hidden;
 
    display: grid;
    gap: 0.6em;
    grid-template-rows: min-content 1fr;
`


const Header = styled.div`
    
`
const BodyContainer = styled.div`

    overflow: hidden;
    display: grid;
    border-radius: var(--border-radius);
    background-color: white;
    max-width: var(--max-width);
    width: 100%;
    margin: 0 auto;
`
const Body = styled.div`
        height: 100%;
        width: 100%;
        padding: 1em;
        overflow-y: scroll;
        display: grid;
        grid-template-rows: min-content min-content min-content min-content min-content;
        align-items: start;
        gap: 0.6em;
       
        header {
            display: flex;
            gap: 1em;
        }
`

const WrapperFooter = styled.div`
    height: 3em;
    max-width: var(--max-width);
    background-color: #ffffff;
    width: 100%;
    padding: 0.4em 0.6em;
    justify-content: right;
    border: var(--border-primary);
    border-radius: var(--border-radius);
    position: sticky;
    z-index: 5;
    bottom: 0;
    margin: 0 auto;
    display: flex;
`
const SelectWithButton = styled.div`
    display: grid;
    grid-template-columns: min-content min-content;
    align-items: end;
    gap: 10px;
    .ant-form-item {
        margin-bottom: 0; // Elimina el margen inferior del Form.Item
    }
`;