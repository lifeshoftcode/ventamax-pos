import { useState, useEffect } from 'react';
import { Form, Input, Modal, Button, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined, BankOutlined, SafetyCertificateOutlined, NumberOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { saveInsuranceConfig } from '../../../../firebase/insurance/insuranceService';
import { closeInsuranceConfigModal, selectInsuranceConfigModal } from '../../../../features/insurance/insuranceConfigModalSlice';
import { selectUser } from '../../../../features/auth/userSlice';
import styled from 'styled-components';
import { PeriodSelectionModal } from './components/PeriodSelectionModal';
import { nanoid } from '@reduxjs/toolkit';

// Styled Components
const StyledFormSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1em 0em 0.4em;
  transition: all 0.3s ease;
`;

const StyledSectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  .anticon {
    color: #1890ff;
    font-size: 18px;
  }
`;

const StyledTypeContainer = styled(StyledFormSection)`
  background: #fafafa;
  border: 1px solid #f0f0f0;
  margin-bottom: 8px;
  padding: 12px;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  .delete-button {
    position: absolute;
    right: 8px;
    top: 8px;
    transition: all 0.2s;
    z-index: 10;
  }

  &:hover .delete-button {
    color: #ff4d4f;
    background: #fff0f0;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  align-items: start;

  .ant-form-item {
    margin-bottom: 0;
  }
`;

const PlansContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
  margin: 16px 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 3px;
  }
`;

const StyledFooter = styled.div`
  margin-top: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const StyledAddButton = styled.button`
  width: 100%;
  padding: 8px;
  border: 1px dashed #d9d9d9;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #1890ff;
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff;
    color: #40a9ff;
  }

  .anticon {
    font-size: 16px;
  }
`;

export const PAYMENT_TERMS = [
    { days: 1, label: '1 día', timeUnit: 'day', value: 1 },
    { days: 7, label: '1 semana', timeUnit: 'week', value: 1 },
    { days: 15, label: '15 días', timeUnit: 'day', value: 15 },
    { days: 30, label: '1 mes', timeUnit: 'month', value: 1 },
    { days: 90, label: '3 meses', timeUnit: 'month', value: 3 },
    { days: 180, label: '6 meses', timeUnit: 'month', value: 6 },
    { days: 365, label: '1 año', timeUnit: 'year', value: 1 }
];

export const TIME_UNITS = [
    { value: 1, label: 'día', pluralLabel: 'días', unit: 'day' },
    { value: 7, label: 'semana', pluralLabel: 'semanas', unit: 'week' },
    { value: 30, label: 'mes', pluralLabel: 'meses', unit: 'month' },
    { value: 365, label: 'año', pluralLabel: 'años', unit: 'year' }
];

const InsuranceConfigForm = () => {
    const dispatch = useDispatch();
    const { isOpen, initialValues } = useSelector(selectInsuranceConfigModal);
    const user = useSelector(selectUser);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [insuranceTypes, setInsuranceTypes] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [periodModalVisible, setPeriodModalVisible] = useState(false);
    const [currentEditingField, setCurrentEditingField] = useState({ index: null, field: null });

    useEffect(() => {
        if (isOpen && !initialized) {
            if (initialValues?.insuranceTypes) {
                const updatedTypes = initialValues.insuranceTypes.map(type => {
                    // Asegurarse de que cada tipo tenga un id
                    const typeWithId = {
                        ...type,
                        id: type.id || nanoid()
                    };

                    // Convertir los valores antiguos al nuevo formato si es necesario
                    const convertPeriod = (period) => {
                        if (!period) return null;

                        // Si ya tiene el formato nuevo con isPredefined, lo devolvemos tal cual
                        if (period.isPredefined !== undefined) {
                            return period;
                        }

                        // Si es un número, buscamos si coincide con algún período predefinido
                        if (typeof period === 'number') {
                            const predefinedPeriod = PAYMENT_TERMS.find(t => t.days === period);
                            if (predefinedPeriod) {
                                return {
                                    value: predefinedPeriod.value,
                                    timeUnit: predefinedPeriod.timeUnit,
                                    days: predefinedPeriod.days,
                                    isPredefined: true
                                };
                            }
                        }

                        // Si tiene el formato value y timeUnit pero no isPredefined
                        if (period.value && period.timeUnit) {
                            const totalDays = period.value * (TIME_UNITS.find(u => u.unit === period.timeUnit)?.value || 1);
                            const predefinedPeriod = PAYMENT_TERMS.find(t => t.days === totalDays);

                            if (predefinedPeriod) {
                                return {
                                    value: predefinedPeriod.value,
                                    timeUnit: predefinedPeriod.timeUnit,
                                    days: predefinedPeriod.days,
                                    isPredefined: true
                                };
                            } else {
                                return {
                                    ...period,
                                    isPredefined: false
                                };
                            }
                        }

                        return period;
                    };

                    const paymentTerm = convertPeriod(type.paymentTerm);
                    const prescriptionValidity = convertPeriod(type.prescriptionValidity);

                    return {
                        ...typeWithId,
                        paymentTerm,
                        prescriptionValidity,
                        paymentTermDisplay: type.paymentTermDisplay || getDisplayText(paymentTerm),
                        prescriptionValidityDisplay: type.prescriptionValidityDisplay || getDisplayText(prescriptionValidity)
                    };
                });
                setInsuranceTypes(updatedTypes);
            }
            form.setFieldsValue({
                insuranceName: initialValues?.insuranceName,
                insuranceCompanyName: initialValues?.insuranceCompanyName,
                insuranceCompanyRNC: initialValues?.insuranceCompanyRNC
            });
            setInitialized(true);
        }
    }, [isOpen, initialized, initialValues, form]);

    const getDisplayText = (period) => {
        if (!period) return '';

        if (period.isPredefined) {
            const predefinedPeriod = PAYMENT_TERMS.find(t => t.days === period.days);
            return predefinedPeriod?.label || '';
        }

        const timeUnit = TIME_UNITS.find(u => u.unit === period.timeUnit);
        if (!timeUnit) return '';
        return `${period.value} ${period.value === 1 ? timeUnit.label : timeUnit.pluralLabel}`;
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
            setInitialized(false);
        }
    }, [isOpen]);
    const resetForm = () => {
        form.resetFields();
        setInsuranceTypes([]);
    };

    const addInsuranceType = () => {
        setInsuranceTypes([...insuranceTypes, {
            id: nanoid(),
            type: '',
            paymentTerm: null,
            paymentTermDisplay: '',
            prescriptionValidity: null,
            prescriptionValidityDisplay: ''
        }]);
    };
    const removeInsuranceType = (indexToRemove) => {
        setInsuranceTypes(prevTypes => {
            const updatedTypes = prevTypes.filter((_, index) => index !== indexToRemove);
            return updatedTypes;
        });
    };

    const handleCancel = () => {
        resetForm();
        dispatch(closeInsuranceConfigModal());
    };

    const handleSubmit = async (values) => {
        // Validar que todos los campos del formulario principal estén llenos
        if (!values.insuranceName || !values.insuranceCompanyName || !values.insuranceCompanyRNC) {
            message.error('Por favor complete todos los campos del formulario');
            return;
        }

        // Validar que haya al menos un tipo de plan
        if (insuranceTypes.length === 0) {
            message.error('Debe agregar al menos un tipo de plan');
            return;
        }

        // Validar que todos los tipos de planes tengan sus campos completos
        const hasEmptyFields = insuranceTypes.some(type =>
            !type.type ||
            !type.paymentTerm?.value ||
            !type.prescriptionValidity?.value
        );

        if (hasEmptyFields) {
            message.error('Por favor complete todos los campos en los tipos de planes');
            return;
        }

        setLoading(true);
        try {
            const dataToSave = {
                ...initialValues,
                ...values,
                insuranceTypes: insuranceTypes.map(type => ({
                    id: type.id,
                    type: type.type,
                    paymentTerm: {
                        value: type.paymentTerm.value,
                        timeUnit: type.paymentTerm.timeUnit
                    },
                    prescriptionValidity: {
                        value: type.prescriptionValidity.value,
                        timeUnit: type.prescriptionValidity.timeUnit
                    }
                }))
            };

            await saveInsuranceConfig(user, dataToSave);
            message.success('Configuración guardada exitosamente');
            resetForm();
            dispatch(closeInsuranceConfigModal());
        } catch (err) {
            console.error('Error al guardar:', err);
            message.error('No se pudo guardar la configuración');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const openPeriodModal = (index, field) => {
        const currentType = insuranceTypes[index];
        const currentValue = currentType[field];

        setCurrentEditingField({
            index,
            field,
            currentValue: {
                value: currentValue?.value,
                timeUnit: currentValue?.timeUnit,
                displayText: currentType[`${field}Display`],
                isPredefined: currentValue?.isPredefined,
                days: currentValue?.days
            }
        });
        setPeriodModalVisible(true);
    };

    const handlePeriodSelect = (periodInfo) => {
        const { index, field } = currentEditingField;
        setInsuranceTypes(prev => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: {
                    value: periodInfo.value,
                    timeUnit: periodInfo.timeUnit,
                    isPredefined: periodInfo.isPredefined,
                    days: periodInfo.days
                },
                [`${field}Display`]: periodInfo.displayText
            };
            return updated;
        });
    };

    return (
        <>
            <Modal
                title={
                    <Space>
                        <BankOutlined />
                        <span>{initialValues?.id ? "Editar Seguro" : "Nuevo Seguro"}</span>
                    </Space>
                }
                open={isOpen}
                onCancel={handleCancel}
                footer={null}
                maskClosable={false}
                width={800}
                style={{ top: 20 }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <StyledFormSection>
                        <StyledSectionTitle>
                            <SafetyCertificateOutlined />
                            Información General
                        </StyledSectionTitle>
                        <Form.Item
                            name="insuranceName"
                            label="Nombre del Seguro"
                            rules={[{ required: true, message: 'Por favor ingrese el nombre del seguro' }]}
                        >
                            <Input
                                placeholder="Ej: Seguro de Salud Premium"
                            />
                        </Form.Item>
                    </StyledFormSection>

                    <StyledFormSection>
                        <StyledSectionTitle>
                            <BankOutlined />
                            Información de la Aseguradora
                        </StyledSectionTitle>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Form.Item
                                name="insuranceCompanyName"
                                label="Nombre de la Empresa"
                                style={{ flex: 2 }}
                                rules={[{ required: true, message: 'Por favor ingrese el nombre de la empresa de seguro' }]}
                            >
                                <Input
                                    prefix={<BankOutlined />}
                                    placeholder="Ej: Mapfre"
                                />
                            </Form.Item>

                            <Form.Item
                                name="insuranceCompanyRNC"
                                label="RNC"
                                style={{ flex: 1 }}
                                rules={[{ required: true, message: 'Por favor ingrese el RNC' }]}
                            >
                                <Input
                                    prefix={<NumberOutlined />}
                                    placeholder="Ej: 123456789"
                                />
                            </Form.Item>
                        </div>
                    </StyledFormSection>

                    <StyledSectionTitle style={{ margin: '24px 0 16px' }}>
                        <SafetyCertificateOutlined />
                        Tipos de Planes
                    </StyledSectionTitle>

                    <PlansContainer>
                        {insuranceTypes.map((insuranceType, index) => (
                            <StyledTypeContainer key={insuranceType.id}>
                                <Button
                                    type="text"
                                    danger
                                    size="small"
                                    className="delete-button"
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeInsuranceType(index)}
                                />

                                <StyledGrid>
                                    <Form.Item
                                        label="Tipo de Plan"
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            size="middle"
                                            value={insuranceType.type}
                                            onChange={(e) => {
                                                setInsuranceTypes(prev => {
                                                    const updated = [...prev];
                                                    updated[index] = {
                                                        ...updated[index],
                                                        type: e.target.value
                                                    };
                                                    return updated;
                                                });
                                            }}
                                            placeholder="Ej: Premium, Básico"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Tiempo Pago"
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            size="middle"
                                            value={insuranceType.paymentTermDisplay ||
                                                (insuranceType.paymentTerm ?
                                                    PAYMENT_TERMS.find(t => t.days === insuranceType.paymentTerm)?.label ||
                                                    `${insuranceType.paymentTerm} días` :
                                                    '')}
                                            placeholder="Seleccionar período"
                                            readOnly
                                            onClick={() => openPeriodModal(index, 'paymentTerm')}
                                            suffix={<CalendarOutlined />}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Vigencia"
                                        rules={[{ required: true }]}
                                    >
                                        <Input
                                            size="middle"
                                            value={insuranceType.prescriptionValidityDisplay ||
                                                (insuranceType.prescriptionValidity ?
                                                    PAYMENT_TERMS.find(t => t.days === insuranceType.prescriptionValidity)?.label ||
                                                    `${insuranceType.prescriptionValidity} días` :
                                                    '')}
                                            placeholder="Seleccionar vigencia"
                                            readOnly
                                            onClick={() => openPeriodModal(index, 'prescriptionValidity')}
                                            suffix={<CalendarOutlined />}
                                        />
                                    </Form.Item>
                                </StyledGrid>
                            </StyledTypeContainer>
                        ))}
                    </PlansContainer>

                    <StyledAddButton onClick={addInsuranceType}>
                        <PlusOutlined />
                        Agregar Nuevo Tipo de Seguro
                    </StyledAddButton>

                    <StyledFooter>
                        <Button onClick={handleCancel} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            {initialValues?.id ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </StyledFooter>
                </Form>
            </Modal>

            <PeriodSelectionModal
                visible={periodModalVisible}
                onClose={() => setPeriodModalVisible(false)}
                onSelect={handlePeriodSelect}
                title={currentEditingField.field === 'paymentTerm' ? 'Seleccionar Tiempo de Pago' : 'Seleccionar Vigencia'}
                currentValue={currentEditingField.currentValue}
            />
        </>
    );
};

export default InsuranceConfigForm;