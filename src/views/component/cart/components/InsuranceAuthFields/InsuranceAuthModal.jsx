import React, { useState, useMemo } from 'react';
import { Modal, Form, Input, DatePicker, Select, Upload, Button, Checkbox, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useInsuranceBeneficiaries, addInsuranceBeneficiary } from '../../../../../firebase/insurance/insuranceBeneficiaryService';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../features/auth/userSlice';
import { useListenInsuranceConfig } from '../../../../../firebase/insurance/insuranceService';
import { nanoid } from '@reduxjs/toolkit';

const DependentRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const DependentSelect = styled.div`
  flex: 1;
`;

const DependentButton = styled.div`
  align-self: flex-end;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const Col = styled.div`
  flex: 1;
`;

export const InsuranceAuthModal = ({ open, onClose, onSave, initialValues }) => {
  const [form] = Form.useForm();
  const [hasDependent, setHasDependent] = useState(false);
  const [showNewDependentModal, setShowNewDependentModal] = useState(false);
  const [dependentForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);

  const { data: insuranceConfigData, loading: configLoading, error: configError } = useListenInsuranceConfig();

  const user = useSelector(selectUser);
  const beneficiaries = useInsuranceBeneficiaries(user);

  // Get insurance types for selected insurance
  const insuranceTypes = useMemo(() => {
    if (!selectedInsurance || !insuranceConfigData) return [];
    const selected = insuranceConfigData.find(ins => ins.id === selectedInsurance);
    if (!selected?.insuranceTypes) return [];
    
    // Asegurarnos de que cada tipo tenga un id y esté correctamente formateado
    return selected.insuranceTypes.map(type => ({
      ...type,
      id: type.id || nanoid(),
      type: type.type || '',
      paymentTerm: type.paymentTerm || {},
      prescriptionValidity: type.prescriptionValidity || {}
    }));
  }, [selectedInsurance, insuranceConfigData]);

  const handleInsuranceChange = (value) => {
    setSelectedInsurance(value);
    // Clear the insurance type when insurance company changes
    form.setFieldValue('insuranceType', undefined);
  };

  const handleAddNewDependent = async () => {
    try {
      setLoading(true);
      const values = await dependentForm.validateFields();
      await addInsuranceBeneficiary(user, values);
      message.success('Dependiente agregado exitosamente');
      setShowNewDependentModal(false);
      dependentForm.resetFields();
    } catch (error) {
      console.error('Error al agregar dependiente:', error);
      message.error('Error al agregar dependiente');
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };
  console.log('Insurance Config Data:', insuranceConfigData);

  // Add debug logging
  console.log('Selected Insurance:', selectedInsurance);
  console.log('Insurance Config Data:', insuranceConfigData);
  console.log('Insurance Types:', insuranceTypes);

  return (
    <Modal
      title="Autorización de Seguro"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      style={{ top: 20 }}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        {/* Checkbox para dependiente */}
        <Form.Item
          name="hasDependent"
          valuePropName="checked"
        >
          <Checkbox onChange={(e) => setHasDependent(e.target.checked)}>
            ¿Es para un dependiente?
          </Checkbox>
        </Form.Item>

        {/* Fila de dependiente que aparece condicionalmente */}
        {hasDependent && (
          <DependentRow>
            <DependentSelect>
              <Form.Item
                name="dependentId"
                label="Seleccionar Dependiente"
                rules={[{ required: true, message: 'Por favor seleccione un dependiente' }]}
              >
                <Select
                  placeholder="Seleccione un dependiente"
                  showSearch
                  optionFilterProp="children"
                >
                  {beneficiaries.map(beneficiary => (
                    <Select.Option key={beneficiary.id} value={beneficiary.id}>
                      {`${beneficiary.dependentName} ${beneficiary.dependentLastName}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </DependentSelect>
            <DependentButton>
              <Form.Item>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setShowNewDependentModal(true)}
                >
                  Nuevo
                </Button>
              </Form.Item>
            </DependentButton>
          </DependentRow>
        )}

        {/* Grupo de información de seguro */}
        <Row>
          <Col>
            <Form.Item
              name="insuranceName"
              label="Aseguradora"
              rules={[{ required: true, message: 'Por favor seleccione la aseguradora' }]}
            >
              <Select 
                placeholder="Seleccione la aseguradora"
                loading={configLoading}
                onChange={handleInsuranceChange}
              >
                {insuranceConfigData?.map(insurance => (
                  <Select.Option key={insurance.id} value={insurance.id}>
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
              >
                {insuranceTypes.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
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
              <DatePicker style={{ width: '100%' }} autoComplete="off" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="birthDate"
              label="Fecha de Nacimiento"
              rules={[{ required: true, message: 'Por favor seleccione la fecha de nacimiento' }]}
            >
              <DatePicker style={{ width: '100%' }} autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>

        {/* Campo de receta (sin agrupar ya que es único) */}
        <Form.Item
          name="prescription"
          label="Receta"
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Adjuntar Receta</Button>
          </Upload>
        </Form.Item>
      </Form>

      {/* Modal para nuevo dependiente */}
      <Modal
        title="Nuevo Dependiente"
        open={showNewDependentModal}
        onCancel={() => {
          setShowNewDependentModal(false);
          dependentForm.resetFields();
        }}
        onOk={handleAddNewDependent}
        confirmLoading={loading}
      >
        <Form
          form={dependentForm}
          layout="vertical"
        >
          <Form.Item
            name="dependentName"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="dependentLastName"
            label="Apellidos"
            rules={[{ required: true, message: 'Por favor ingrese los apellidos' }]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="dependentGender"
            label="Sexo"
            rules={[{ required: true, message: 'Por favor seleccione el sexo' }]}
          >
            <Select>
              <Select.Option value="M">Masculino</Select.Option>
              <Select.Option value="F">Femenino</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};