import React, { useState, useCallback, useEffect } from 'react'
import { message, Button, Form } from 'antd'
import styled from 'styled-components'
import GeneralForm from './components/GeneralForm/GeneralForm'
import { MenuApp } from '../../../templates/MenuApp/MenuApp'
import { useDispatch, useSelector } from 'react-redux'
import { cleanOrder, setOrder, selectOrderState } from '../../../../features/addOrder/addOrderSlice'
import ROUTES_PATH from '../../../../routes/routesName'
import { useNavigate, useParams } from 'react-router-dom'
import { defaultsMap, sanitizeData } from './orderLogic'
import { getLocalURL } from '../../../../utils/files';
import { addOrder } from '../../../../firebase/order/fbAddOrder'
import { selectUser } from '../../../../features/auth/userSlice'
import { useListenOrder } from '../../../../hooks/useOrders'
import Loader from '../../../component/Loader/Loader'
import { fbUpdateOrder } from '../../../../firebase/order/fbUpdateOrder'

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: min-content 1fr min-content;
  overflow-y: hidden;
`

const Body = styled.div`
 padding: 1em;
  overflow-y: auto;
 width: 100%;
  margin: 0 auto;
`
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  bottom: 0;
  width: 100%;
  gap: 1em;
  background-color: #ffffff;
  padding: 1em;
  border-top: 1px solid #e8e8e8;
  margin-top: auto;
`

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const mode = id ? 'update' : 'create';

  const user = useSelector(selectUser)
  const { order: orderData } = useSelector(selectOrderState);

  const { ORDERS } = ROUTES_PATH.ORDER_TERM;

  const [localFiles, setLocalFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    provider: false,
    deliveryAt: false,
    note: false
  });

  const { order: fetchedOrder, isLoading: orderLoading } = useListenOrder(id);

  const updateOrderState = useCallback((updates) => {
    dispatch(setOrder(updates));
  }, [dispatch]);

  const handleAddFiles = useCallback((newFiles) => {
    const newAttachments = newFiles.map(file => ({
      type: file.type,
      url: getLocalURL(file.file),
      location: 'local',
      id: file.id,
      name: file.name,
    }));

    updateOrderState({ attachmentUrls: [...(orderData.attachmentUrls || []), ...newAttachments] });
    setLocalFiles((prev) => [...prev, ...newFiles]);
  }, [orderData.attachmentUrls, updateOrderState]);

  const handleRemoveFile = useCallback((fileId) => {
    setLocalFiles((prev) => prev.filter(f => f.id !== fileId));
    updateOrderState({
      attachmentUrls: (orderData.attachmentUrls || []).filter(f => f.id !== fileId),
    });
  }, [orderData.attachmentUrls, updateOrderState]);

  const validateFields = useCallback(() => {
    const newErrors = {
      provider: !orderData.provider,
      deliveryAt: !orderData.deliveryAt,
      note: orderData.note && orderData.note.length > 300 // Solo validar longitud si hay nota
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  }, [orderData]);

  useEffect(() => {
    if (mode === 'update' && fetchedOrder) {
      console.log("Fetched order:--------", fetchedOrder);
      dispatch(setOrder(fetchedOrder));
    }
  }, [mode, fetchedOrder, dispatch]);

  const handleSubmit = useCallback(async () => {
    if (!validateFields()) {
      message.error('Por favor complete todos los campos requeridos');
      return;
    }

    setLoading(true);
    try {
      const submitData = sanitizeData(orderData, defaultsMap);
      if (mode === 'create') {
        await addOrder({ user, order: submitData, localFiles });
      } else if (mode === 'update') {
         await fbUpdateOrder({ user, order: submitData, localFiles });
      }
      message.success('Pedido guardado exitosamente');
      dispatch(cleanOrder());
      navigate(ORDERS);
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      message.error('Error al guardar el pedido');
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate, user, orderData, localFiles, validateFields, ORDERS, mode]);

  const handleCancel = useCallback(() => {
    dispatch(cleanOrder());
    navigate(ORDERS);
  }, [dispatch, navigate, ORDERS]);

  // Limpiar datos al montar el componente si estamos en modo crear
  useEffect(() => {
    if (mode === 'create') {
      dispatch(cleanOrder());
    }
  }, [dispatch, mode]);

  return (
    <Container>
      <MenuApp showBackButton={false} sectionName={mode === 'create' ? 'Nuevo Pedido' : 'Editar Pedido'} />
      <Loader loading={orderLoading} minHeight="200px" >
        <Body>
          <Form layout='vertical'>
            <GeneralForm
              files={localFiles}
              attachmentUrls={orderData.attachmentUrls || []}
              onAddFiles={handleAddFiles}
              onRemoveFiles={handleRemoveFile}
              errors={errors}
            />
          </Form>
        </Body>
      </Loader>
      <ButtonsContainer>
        <Button onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Guardar
        </Button>
      </ButtonsContainer>
    </Container>
  )
}

export default OrderManagement
