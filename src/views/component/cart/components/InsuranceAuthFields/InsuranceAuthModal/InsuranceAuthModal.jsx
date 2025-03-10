import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Modal, Form, Input, DatePicker, Select, Upload, Button, message, Spin } from 'antd';
import { UploadOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../../../../features/auth/userSlice';
import { useListenInsuranceConfig } from '../../../../../../firebase/insurance/insuranceService';
import { selectClient } from '../../../../../../features/clientCart/clientCartSlice';
import dayjs from 'dayjs'; // Import dayjs for date handling
import {
  setAuthData,
  selectInsuranceAuthData,
  selectInsuranceAuthLoading,
  selectInsuranceModal,
  closeModal,
  fetchInsuranceAuthByClientId
} from '../../../../../../features/insurance/insuranceAuthSlice';
import { addInsuranceAuth } from '../../../../../../firebase/insurance/insuranceAuthService';
import Dependent from './components/Dependent/Dependent';

const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const Col = styled.div`
  flex: 1;
`;

// Componente estilizado rediseñado con una estética más corporativa, minimalista y moderna
const ClientInfoWidget = styled.div`
  padding: 10px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  
  .icon-container {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
  }
  
  .icon {
    font-size: 16px;
    color: #666;
  }
  
  .client-info {
    display: flex;
    flex-direction: column;
  }
  
  .label {
    font-size: 12px;
    color: #8c8c8c;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }
  
  .client-name {
    font-size: 16px;
    font-weight: 500;
    color: #262626;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const InsuranceAuthModal = () => {
  // Se obtienen los valores desde el slice
  const { open } = useSelector(selectInsuranceModal);
  const authData = useSelector(selectInsuranceAuthData);
  const isLoading = useSelector(selectInsuranceAuthLoading);
  const user = useSelector(selectUser);
  const client = useSelector(selectClient);

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [hasDependent, setHasDependent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Este estado guardará el ID de la aseguradora seleccionada
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  // Añadimos un estado para guardar la aseguradora seleccionada completa
  const [selectedInsuranceData, setSelectedInsuranceData] = useState(null);

  // Escuchamos la configuración de seguros (aseguradoras + tipos)
  const { data: insuranceConfigData, loading: configLoading } = useListenInsuranceConfig();

  // Función para encontrar una aseguradora por ID
  const findInsuranceById = useCallback((id) => {
    if (!insuranceConfigData || !id) return null;
    return insuranceConfigData.find(ins => ins.id === id) || null;
  }, [insuranceConfigData]);

  // Función para encontrar un tipo de seguro por ID
  const findInsuranceTypeById = useCallback((typeId) => {
    if (!selectedInsuranceData?.insuranceTypes || !typeId) return null;
    return selectedInsuranceData.insuranceTypes.find(type => type.id === typeId) || null;
  }, [selectedInsuranceData]);

  // Actualizar el objeto de aseguradora seleccionada cuando cambie el ID
  useEffect(() => {
    const insuranceData = findInsuranceById(selectedInsurance);
    setSelectedInsuranceData(insuranceData);
  }, [selectedInsurance, findInsuranceById]);

  // Mapeamos los tipos de seguro según la aseguradora seleccionada
  const insuranceTypes = useMemo(() => {
    if (!selectedInsuranceData?.insuranceTypes) return [];
    return selectedInsuranceData.insuranceTypes;
  }, [selectedInsuranceData]);

  // Handler para cambio de aseguradora
  const handleInsuranceChange = (value) => {
    // 'value' es el ID de la aseguradora
    setSelectedInsurance(value);
    // Reseteamos el tipo de seguro
    form.setFieldValue('insuranceType', undefined);
  };

  // Load insurance auth data from Firebase when modal opens
  useEffect(() => {
    if (open && client?.id && user && !authData?.clientId) {
      dispatch(fetchInsuranceAuthByClientId({
        user,
        clientId: client.id
      }));
    }
  }, [open, client?.id, user, authData?.clientId, dispatch]);

  useEffect(() => {
    if (open) {
      const formValues = authData || {};

      if (formValues.insuranceId) {
        setSelectedInsurance(formValues.insuranceId);
      }

      // Convert ISO date strings to dayjs objects for DatePicker
      const formattedValues = { ...formValues };
      
      // Properly format dates for the form
      if (formattedValues.birthDate) {
        formattedValues.birthDate = dayjs(formattedValues.birthDate);
      }
      if (formattedValues.indicationDate) {
        formattedValues.indicationDate = dayjs(formattedValues.indicationDate);
      }

      // Configuramos los valores del formulario
      form.setFieldsValue(formattedValues);
      setHasDependent(formValues.hasDependent || false);
    }
  }, [open, authData, form]);

  // Validamos las fechas para que no sean del futuro
  const disabledFutureDate = (current) => {
    // Use the dayjs object provided by the DatePicker
    return current && current > dayjs();
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleOk = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();

      // Formatamos las fechas antes de guardar
      const formattedValues = {
        ...values,
        birthDate: values.birthDate ? values.birthDate.toISOString() : null,
        indicationDate: values.indicationDate ? values.indicationDate.toISOString() : null,
      };

      // Guardamos en el estado de Redux
      dispatch(setAuthData(formattedValues));
      
      // Guardamos en Firebase si tenemos un cliente seleccionado
      if (client?.id) {
        try {
          await addInsuranceAuth(user, formattedValues, client.id);
          message.success('Autorización guardada exitosamente');
        } catch (error) {
          console.error('Error al guardar autorización:', error);
          message.error('Error al guardar la autorización');
        }
      } else {
        message.warning('No se puede guardar la autorización sin un cliente seleccionado');
      }

      dispatch(closeModal());
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="Autorización de Seguro"
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okButtonProps={{ loading: submitting }}
      style={{ top: 20 }}
      width={800}
      destroyOnClose
    >
      {/* Widget informativo del cliente actual con diseño minimalista y corporativo */}
      <ClientInfoWidget>
        <div className="icon-container">
          <UserOutlined className="icon" />
        </div>
        <div className="client-info">
          <span className="label">Cliente</span>
          <span className="client-name">{client?.name || 'Sin cliente seleccionado'}</span>
        </div>
      </ClientInfoWidget>

      {isLoading ? (
        <LoadingContainer>
          <Spin tip="Cargando datos de autorización..." />
        </LoadingContainer>
      ) : (
        <Form form={form} layout="vertical">
          <Dependent 
            form={form} 
            hasDependent={hasDependent} 
            onDependentChange={setHasDependent} 
          />

          {/* Grupo de información de seguro */}
          <Row>
            <Col>
              <Form.Item
                name="insuranceId"
                label="Aseguradora"
                rules={[{ required: true, message: 'Por favor seleccione la aseguradora' }]}
              >
                <Select
                  placeholder="Seleccione la aseguradora"
                  loading={configLoading}
                  onChange={handleInsuranceChange}
                  optionLabelProp="label"
                >
                  {insuranceConfigData?.map((insurance) => (
                    <Select.Option
                      key={insurance.id}
                      value={insurance.id}
                      label={insurance.insuranceCompanyName}
                    >
                      {insurance.insuranceCompanyName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="insuranceType"
                label="Tipo de Seguro"
                rules={[{ required: true, message: 'Por favor seleccione el tipo de seguro' }]}
              >
                <Select
                  placeholder="Seleccione el tipo de seguro"
                  disabled={!selectedInsurance}
                  optionLabelProp="label"
                >
                  {insuranceTypes.map((type) => (
                    <Select.Option
                      key={type.id}
                      value={type.id}
                      label={type.type}
                    >
                      {type.type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Grupo de números de identificación */}
          <Row>
            <Col>
              <Form.Item
                name="affiliateNumber"
                label="Número de Afiliado"
                rules={[{ required: true, message: 'Por favor ingrese el número de afiliado' }]}
              >
                <Input placeholder="Ingrese el número de afiliado" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="authNumber"
                label="Número de Autorización"
                rules={[{ required: true, message: 'Por favor ingrese el número de autorización' }]}
              >
                <Input placeholder="Número de autorización" autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>

          {/* Grupo de información médica */}
          <Row>
            <Col>
              <Form.Item
                name="doctor"
                label="Médico"
                rules={[{ required: true, message: 'Por favor ingrese el nombre del médico' }]}
              >
                <Input placeholder="Nombre del médico" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="specialty"
                label="Especialidad del Médico"
                rules={[{ required: true, message: 'Por favor ingrese la especialidad del médico' }]}
              >
                <Input placeholder="Especialidad del médico" autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>

          {/* Grupo de fechas */}
          <Row>
            <Col>
              <Form.Item
                name="indicationDate"
                label="Fecha de Indicación"
                rules={[{ required: true, message: 'Por favor seleccione la fecha de indicación' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  autoComplete="off"
                  format="DD/MM/YYYY"
                  disabledDate={disabledFutureDate}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="birthDate"
                label="Fecha de Nacimiento"
                rules={[{ required: true, message: 'Por favor seleccione la fecha de nacimiento' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  autoComplete="off"
                  format="DD/MM/YYYY"
                  disabledDate={disabledFutureDate}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Campo de receta */}
          <Form.Item name="prescription" label="Receta">
            <Upload
              beforeUpload={(file) => {
                // Puedes validar el tipo de archivo aquí si es necesario
                return false; // Prevenir la carga automática
              }}
              fileList={form.getFieldValue('prescription') ? [form.getFieldValue('prescription')] : []}
              onChange={({ fileList }) => {
                if (fileList.length > 0) {
                  form.setFieldValue('prescription', fileList[0]);
                } else {
                  form.setFieldValue('prescription', null);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>Adjuntar Receta</Button>
            </Upload>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};