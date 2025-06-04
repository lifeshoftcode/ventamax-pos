import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker, message, Typography, Divider, Space, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';
import { updateTaxReceipt } from '../../../../../../../firebase/taxReceipt/updateTaxReceipt';
import styled from 'styled-components';
import { FileAddOutlined, NumberOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { selectUser } from '../../../../../../../features/auth/userSlice';

const { Title, Text } = Typography;
const { Option } = Select;

const TaxReceiptAuthorizationModal = ({ visible, onCancel, taxReceipts, onAuthorizationAdded }) => {
  const [form] = Form.useForm();
  const user = useSelector(selectUser);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reset form when modal is opened/closed
  useEffect(() => {
    if (visible) {
      form.resetFields();
      setSelectedReceipt(null);
    }
  }, [visible, form]);

  // Update form when receipt is selected
  useEffect(() => {
    if (selectedReceipt) {
      const expirationDate = dayjs().add(1, 'year'); // Por defecto, fecha vencimiento 1 año
      form.setFieldsValue({
        authorizationNumber: '',
        requestNumber: '',
        startSequence: '',
        approvedQuantity: '',
        expirationDate,
      });
    }
  }, [selectedReceipt, form]);

  // Obtener solo los comprobantes activos
  const activeReceipts = taxReceipts?.filter(receipt => !receipt.data.disabled) || [];

  const handleReceiptSelect = (receiptId) => {
    const receipt = taxReceipts.find(item => item.id === receiptId || item.data.id === receiptId);
    setSelectedReceipt(receipt);
  };

  const calculateNewEndSequence = (values) => {
    if (!values.startSequence || !values.approvedQuantity) return null;
    
    const startNum = parseInt(values.startSequence, 10);
    const quantity = parseInt(values.approvedQuantity, 10);
    
    if (isNaN(startNum) || isNaN(quantity)) return null;
    
    return startNum + quantity - 1;
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      if (!selectedReceipt) {
        message.error('Por favor seleccione un comprobante');
        setLoading(false);
        return;
      }

      // Calcular la secuencia final
      const endSequence = calculateNewEndSequence(values);
      if (!endSequence) {
        message.error('Error al calcular la secuencia final');
        setLoading(false);
        return;
      }

      // Crear el objeto de autorización
      const authorizationData = {
        authorizationNumber: values.authorizationNumber,
        requestNumber: values.requestNumber,
        startSequence: values.startSequence,
        endSequence: String(endSequence),
        approvedQuantity: values.approvedQuantity,
        expirationDate: values.expirationDate.format('YYYY-MM-DD'),
        authorizationDate: dayjs().format('YYYY-MM-DD'),
      };

      // Actualizar el comprobante con la nueva autorización
      const receiptData = selectedReceipt.data;
      const authorizations = receiptData.authorizations || [];
      
      const updatedReceipt = {
        ...receiptData,
        id: receiptData.id,
        // Actualizamos la secuencia y cantidad del comprobante principal
        sequence: values.startSequence,
        quantity: values.approvedQuantity,
        sequenceLength: values.startSequence.length,
        // Agregamos la nueva autorización al historial
        authorizations: [...authorizations, authorizationData]
      };
      
      await updateTaxReceipt(user, updatedReceipt);
      message.success('Autorización registrada correctamente');
      onAuthorizationAdded(updatedReceipt);
      onCancel();
    } catch (error) {
      console.error("Error al guardar la autorización:", error);
      message.error('Error al registrar la autorización del comprobante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <HeaderContainer>
          <div>
            <Title level={4}>Registro de Autorización de Comprobantes</Title>
            <Text type="secondary">
              Registra una nueva autorización de comprobantes fiscales emitida por la DGI
            </Text>
          </div>
        </HeaderContainer>
      }
      open={visible}
      onCancel={onCancel}
      width={700}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSave} 
          loading={loading}
          icon={<CheckCircleOutlined />}
          disabled={!selectedReceipt}        >
          Registrar Autorización
        </Button>
      ]}
      destroyOnHidden
    >
      <Container>
        <Form
          form={form}
          layout="vertical"
          name="authorizationForm"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="receiptId"
                label="Seleccione el comprobante a actualizar"
                rules={[{ required: true, message: 'Por favor seleccione un comprobante' }]}
              >
                <Select 
                  placeholder="Seleccionar comprobante" 
                  onChange={handleReceiptSelect}
                  optionLabelProp="label"
                >
                  {activeReceipts.map((receipt) => (
                    <Option 
                      key={receipt.id || receipt.data.id} 
                      value={receipt.id || receipt.data.id}
                      label={receipt.data.name}
                    >
                      <ReceiptOptionContent>
                        <div className="receipt-name">
                          {receipt.data.name}
                        </div>
                        <div className="receipt-info">
                          <span className="code-label">Código:</span> 
                          <span className="code-value">{receipt.data.type}{receipt.data.serie}</span>
                        </div>
                      </ReceiptOptionContent>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          {selectedReceipt && (
            <>
              <Divider>Información del Comprobante</Divider>
              
              <ReceiptCard>
                <ReceiptDetails>
                  <ReceiptDetailItem>
                    <Text strong>Nombre:</Text>
                    <Text>{selectedReceipt.data.name}</Text>
                  </ReceiptDetailItem>
                  <ReceiptDetailItem>
                    <Text strong>Tipo-Serie:</Text>
                    <Text>{selectedReceipt.data.type}{selectedReceipt.data.serie}</Text>
                  </ReceiptDetailItem>
                  <ReceiptDetailItem>
                    <Text strong>Secuencia actual:</Text>
                    <Text>{selectedReceipt.data.sequence}</Text>
                  </ReceiptDetailItem>
                  <ReceiptDetailItem>
                    <Text strong>Cantidad actual:</Text>
                    <Text>{selectedReceipt.data.quantity}</Text>
                  </ReceiptDetailItem>
                </ReceiptDetails>
              </ReceiptCard>
              
              <Divider>Datos de Autorización</Divider>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="authorizationNumber"
                    label="Número de Autorización"
                    rules={[
                      { required: true, message: 'Ingrese el número de autorización' },
                      { pattern: /^\d+$/, message: 'Ingrese solo números' }
                    ]}
                  >
                    <Input 
                      placeholder="Ej: 5004526018" 
                      prefix={<NumberOutlined />} 
                      maxLength={20}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="requestNumber"
                    label="Número de Solicitud"
                    rules={[
                      { required: true, message: 'Ingrese el número de solicitud' },
                      { pattern: /^\d+$/, message: 'Ingrese solo números' }
                    ]}
                  >
                    <Input 
                      placeholder="Ej: 5009083898" 
                      prefix={<NumberOutlined />}
                      maxLength={20}
                    />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="startSequence"
                    label="Secuencia Inicial"
                    rules={[
                      { required: true, message: 'Ingrese la secuencia inicial' },
                      { pattern: /^\d+$/, message: 'Ingrese solo números' }
                    ]}
                  >
                    <Input 
                      placeholder="Ej: 1000001537" 
                      prefix={<FileAddOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="approvedQuantity"
                    label="Cantidad Aprobada"
                    rules={[
                      { required: true, message: 'Ingrese la cantidad aprobada' },
                      { pattern: /^\d+$/, message: 'Ingrese solo números' }
                    ]}
                  >
                    <Input 
                      placeholder="Ej: 324"
                      type="number"
                      min={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="expirationDate"
                    label="Fecha de Vencimiento"
                    rules={[{ required: true, message: 'Seleccione la fecha de vencimiento' }]}
                  >
                    <DatePicker 
                      style={{ width: '100%' }}
                      format="DD/MM/YYYY"
                      placeholder="Seleccione fecha"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReceiptOptionContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  .receipt-name {
    font-weight: 500;
  }
  
  .receipt-info {
    color: #1677ff;
    
    .code-label {
      margin-right: 4px;
      font-size: 12px;
      opacity: 0.8;
    }
    
    .code-value {
      font-weight: 500;
      background: rgba(24, 144, 255, 0.1);
      padding: 0 4px;
      border-radius: 3px;
    }
  }
`;

const ReceiptCard = styled.div`
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e6e8eb;
  margin-bottom: 20px;
`;

const ReceiptDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ReceiptDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 120px;
  gap: 4px;
`;

export default TaxReceiptAuthorizationModal;
