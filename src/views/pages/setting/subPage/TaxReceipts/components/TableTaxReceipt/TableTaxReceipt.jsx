import React, { useState } from 'react'
import styled from 'styled-components'
import { Data } from '../../taxConfigTable'
import { FileOutlined, ExclamationCircleOutlined, EditOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { Tooltip, Modal, Button, Form, Input, Space, message, Badge } from 'antd'
import TaxReceiptForm from '../TaxReceiptForm/TaxReceiptForm'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../../../features/auth/userSlice'
import { updateTaxReceipt } from '../../../../../../../firebase/taxReceipt/updateTaxReceipt'
import DisabledReceiptsModal from '../DisabledReceiptsModal/DisabledReceiptsModal'

export const TableTaxReceipt = ({ array, setData }) => {
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const user = useSelector(selectUser);
  
  // Separar comprobantes activos e inactivos
  // Solo mostramos los comprobantes activos en la tabla
  const activeReceipts = array?.filter(item => !item.data?.disabled);

  const handleToggleDisabled = async (index) => {
    const item = array[index];
    const isCurrentlyDisabled = item.data?.disabled === true;
    
    const actionText = isCurrentlyDisabled ? 'habilitar' : 'deshabilitar';
    const statusText = isCurrentlyDisabled ? 'activo' : 'inactivo';
    
    Modal.confirm({
      title: `¿Estás seguro de ${actionText} este comprobante?`,
      icon: <ExclamationCircleOutlined />,
      content: `El comprobante se marcará como ${statusText}.`,
      okText: isCurrentlyDisabled ? 'Habilitar' : 'Deshabilitar',
      okType: isCurrentlyDisabled ? 'primary' : 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          const newDisabledState = !isCurrentlyDisabled;
          const dataToUpdate = { 
            id: item.data.id, 
            ...item.data, 
            disabled: newDisabledState 
          };
          
          await updateTaxReceipt(user, dataToUpdate);
          message.success(`Comprobante ${isCurrentlyDisabled ? 'habilitado' : 'deshabilitado'} correctamente`);
          
          const newArray = array.map((it, i) =>
            i === index
              ? { ...it, data: { ...it.data, disabled: newDisabledState } }
              : it
          );
          setData(newArray);
        } catch (error) {
          console.error(`Error al ${actionText} comprobante:`, error);
          message.error(`Error al ${actionText} el comprobante`);
        }
      },
    });
  }
  const handleEditTaxReceipt = (index) => {
    const itemToEdit = array[index]; 
    if (itemToEdit && itemToEdit.data) { 
      setCurrentEditItem({ ...itemToEdit.data }); 
      setCurrentEditIndex(index); 
      setEditModalVisible(true); 
    } else {
      console.error("Intento de editar un elemento inválido en el índice:", index, itemToEdit);
      message.error('No se pudieron cargar los datos para editar.');
    }
  }

  // Helper para formatear secuencia con ceros según sequenceLength
  const formatSequence = (seq, length) => {
    if (seq === undefined || length === undefined) return seq;
    return String(seq).padStart(length, '0');
  };

  // Función para manejar la restauración de comprobantes desde el modal
  const handleRestoreReceipt = (receiptId) => {
    // Actualizar el array local después de restaurar en Firebase
    const newArray = array.map(item => 
      (item.data.id === receiptId) 
        ? { ...item, data: { ...item.data, disabled: false } } 
        : item
    );
    setData(newArray);
  };

  const calculateLimit = (data) => {
    try {
      if (!data) return "N/A";

      const { type, serie, sequence, quantity, sequenceLength } = data; 

      if (!type || !serie || sequence === undefined || !quantity) {
        return "N/A";
      }

      const sequenceNum = parseInt(sequence || '0');
      const quantityNum = parseInt(quantity || '0');

      const limitSequence = sequenceNum + quantityNum;

      const formattedSequence = String(limitSequence).padStart(sequenceLength || 8, '0');
      return `${type}${serie}${formattedSequence}`;
    } catch (error) {
      console.error("Error al calcular el límite:", error);
      return "Error";
    }
  };

  const headers = [
    ...Data().settingDataTaxTable,
    { name: 'LÍMITE (NCF)' },
    { name: 'ACCIÓN' }
  ];

  return (
    <Container>
      <Row>
        {headers.map((item, index) => (
          <Col key={index}><h4>{item.name}</h4></Col>
        ))}
      </Row>
      {activeReceipts?.map((item, index) => (
        <Row 
          key={index} 
          onDoubleClick={() => handleEditTaxReceipt(array.indexOf(item))}
        >
          <Col><span>{item.data?.name}</span></Col>
          <Col><span>{item.data?.type}</span></Col>
          <Col><span>{item.data?.serie}</span></Col>
          <Col><span>{formatSequence(item.data.sequence, item.data.sequenceLength)}</span></Col>
          <Col><span>{item.data?.increase}</span></Col>
          <Col><span>{item.data?.quantity}</span></Col>
          <Col>
            <Tooltip title="Número del último comprobante que se generará">
              <LimitDisplay>
                <FileOutlined style={{ marginRight: 5 }} />
                {calculateLimit(item.data)}
              </LimitDisplay>
            </Tooltip>
          </Col>
          <Col>
            <ActionButtonsContainer>
              <ActionButton
                onClick={() => handleEditTaxReceipt(array.indexOf(item))}
                title="Editar"
                className="edit-button"
              >
                <EditOutlined />
              </ActionButton>
              {/* <ActionButton
                onClick={() => handleToggleDisabled(array.indexOf(item))}
                title="Deshabilitar"
                className="delete-button"
              >
                <StopOutlined />
              </ActionButton> */}
            </ActionButtonsContainer>
          </Col>
        </Row>
      ))}

      <TaxReceiptForm 
          editModalVisible={editModalVisible}
          setEditModalVisible={setEditModalVisible}
          currentEditItem={currentEditItem}
      />
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid var(--Gray1);
  border-radius: 10px;
  overflow: hidden;
`

const Row = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(150px, 0.7fr) minmax(40px, 0.2fr) minmax(40px, 0.2fr) minmax(90px, 0.5fr) minmax(80px, 0.3fr) minmax(80px, 0.3fr) minmax(100px, 0.6fr) 80px;
  border-bottom: 1px solid var(--Gray1);
  height: 2.75em;
  :last-child{
    border-bottom:0px;
  }
  /* Estilos para comprobantes deshabilitados */
  /* opacity: ${props => props.disabled ? 0 : 1}; */
  background-color: ${props => props.disabled ? '#f5f5f5' : 'transparent'};
  position: relative;

  /* Para comprobantes deshabilitados, mostrar texto tachado */
  ${props => props.disabled && `
    & span {
      text-decoration: line-through;
      color: #999;
    }
  `}
  
  /* Excepción para el LimitDisplay */
  ${props => props.disabled && `
    & div[class^="LimitDisplay"] {
      opacity: 0.7;
    }
    & div[class^="LimitDisplay"] span {
      text-decoration: none;
      color: #1890ff;
    }
    
    /* Excepción para el botón de habilitar, que debe destacarse */
    & button.enable-button {
      opacity: 1;
      position: relative;
      z-index: 1;
      box-shadow: 0 0 8px rgba(82, 196, 26, 0.2);
    }
    & button.enable-button span {
      text-decoration: none;
      color: inherit;
    }
  `}
`;

const Col = styled.div`
  height: 100%;
  padding: 0 0.6em;
  display: flex;
  align-items: center;
  :last-child{
    border-right: 0;
  }
  :first-child{
    border-left: 0;
  }
  border-right: 1px solid var(--Gray1);
  input[type="text"],input[type="number"]{
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 12px;
    padding: 0;
    :focus{
      outline: none;
    }
  }
  input[type='number']::-webkit-inner-spin-button, 
  input[type='number']::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }
  h4{
    font-size: 12px;
    width: 100%;
    text-align: left;
    margin: none;
    padding: 0 0 !important;
  }
  h5{
    font-weight: 500;
  }
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff4d4f;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
  &:hover {
    color: #ff7875;
  }
  
  &:focus {
    outline: none;
  }
`

const LimitDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  color: #1890ff;
  font-weight: 600;
  letter-spacing: 0.5px;
  
  background-color: #f0f8ff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px dashed #1890ff;
`

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 4px;
  font-size: 18px;
  border-radius: 4px;
  transition: all 0.2s;
  
  &.edit-button {
    color: #474747;
    &:hover {
      color: #414141;
      /* background-color: rgba(24, 144, 255, 0.1); */
    }
  }
  
  &.delete-button {
    color: #ff4d4f;
    &:hover {
      color: #ff7875;
      background-color: rgba(255, 77, 79, 0.1);
    }
  }
  
  &.enable-button {
    color: #52c41a;
    /* Estilos simplificados para el botón de habilitar */
    opacity: 1 !important;  
    font-weight: 500;
    background-color: rgba(255, 255, 255, 0);
    box-shadow: 0 !important;
    border: 0;
    position: relative;
    z-index: 300;
    /* border: 1px solid #b7eb8f; */
    
    & span {
      color: #52c41a !important;
      text-decoration: none !important;
      opacity: 1 !important;
    }
    
    &:hover {
      color: #73d13d;
      background-color: rgb(255, 255, 255);
    }
  }
  
  &:focus {
    outline: none;
  }
`