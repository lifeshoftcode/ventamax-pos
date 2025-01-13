import { Form, Input, InputNumber, DatePicker, Statistic, Button, message, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { icons } from '../../../../../constants/icons/icons';
import { SelectProduct, SelectProductSelected } from '../../../../../features/purchase/addPurchaseSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductModal from './ProductModal';
import { formatMoney } from '../../../../../utils/formatters';

function AddProductForm({ onSave, onClear }) {
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [unitCost, setUnitCost] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [calculatedITBIS, setCalculatedITBIS] = useState(0);

    const selectedProduct = useSelector(SelectProductSelected);
    const isProductSelected = !!selectedProduct?.name || !!selectedProduct?.id;
    const onSelectProduct = (product) => dispatch(SelectProduct(product));

    const calculateCosts = () => {
        const { baseCost = 0, taxPercentage, freight = 0, otherCosts = 0, quantity = 0 } = form.getFieldsValue();
        const taxPercent = taxPercentage || 0; // Manejar undefined como cero
        const calculatedTax = (baseCost * taxPercent) / 100;
        setCalculatedITBIS(calculatedTax);
        const unitCost = baseCost + calculatedTax + freight + otherCosts;
        setUnitCost(unitCost);
        setSubtotal(unitCost * quantity);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSave({
                ...values,
                expirationDate: values.expirationDate ? values.expirationDate.valueOf() : null,
                unitCost,
                subtotal,
                calculatedITBIS
            });
            form.resetFields();
            message.success('Producto agregado correctamente');
        } catch (error) {
            const errorFields = error.errorFields || [];
            if (errorFields.length > 0) {
                message.error('Por favor complete todos los campos requeridos');
            } else {
                message.error('Error al agregar el producto');
            }
        }
    };

    const handleDelete = () => {
        form.resetFields();
        onClear();
        onSelectProduct({});
    };

    useEffect(() => {
        form.validateFields().then(calculateCosts).catch(() => { });
    }, [form]);

    useEffect(() => {
        if (selectedProduct) {
            form.setFieldsValue({
                name: selectedProduct.name,
                // otros campos que quieras pre-llenar
            });
            calculateCosts();
        }
    }, [selectedProduct, form]);

    return (
        <RowContainer>
            <Form
                form={form}
                layout="horizontal"
            >
                <FieldsRow>
                    <Tooltip title='Nombre del Producto'>
                        <StyledFormItem
                            name="name"
                            label="Producto"
                            rules={[{ required: isProductSelected }]}
                        >
                            <ProductModal
                                onSelect={onSelectProduct}
                                selectedProduct={selectedProduct}
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='Fecha de Expiración'>
                        <StyledFormItem
                            name="expirationDate"
                            label="F. Expiración"
                        >
                            <DatePicker
                                format='DD/MM/YY'
                                disabled={!isProductSelected}
                                placeholder="Fecha. Exp"
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='Cantidad'>
                        <StyledFormItem
                            name="quantity"
                            label="Cantidad"
                            rules={[{ required: isProductSelected }]}
                        >
                            <InputNumber
                                controls={false}
                                disabled={!isProductSelected}
                                placeholder="Cantidad"
                                onChange={calculateCosts}
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='Unidad de Medida'>
                        <StyledFormItem
                            name="unitMeasurement"
                            label="Unid. Medida"
                            rules={[{ required: isProductSelected }]}
                        >
                            <Input
                                placeholder="Unidad"
                                disabled={!isProductSelected}
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='Costo Base'>
                        <StyledFormItem
                            name="baseCost"
                            label="Costo Base"
                            rules={[{ required: isProductSelected }]}
                        >
                            <InputNumber
                                controls={false}
                                disabled={!isProductSelected}
                                placeholder="Costo"
                                min={isProductSelected && 0.1}
                                style={{ width: '100%' }}
                                onChange={calculateCosts}
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='ITBIS'>
                        <StyledFormItem
                            name="taxPercentage"
                            label="ITBIS (%)"
                        >
                            <InputNumber
                                disabled={!isProductSelected}
                                controls={false}
                                placeholder="%"
                                onChange={calculateCosts}
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='Flete'>
                        <StyledFormItem
                            name="freight"

                            label="Flete">
                            <InputNumber
                                disabled={!isProductSelected}
                                controls={false}
                                placeholder="Flete"
                                onChange={calculateCosts}
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='Otros Costos'>
                        <StyledFormItem name="otherCosts" label="Otros">
                            <InputNumber
                                controls={false}
                                placeholder="Otros"
                                disabled={!isProductSelected}
                                onChange={calculateCosts}
                            />
                        </StyledFormItem>
                    </Tooltip>
                    <Tooltip title='Costo Unitario'>
                        <TotalItem
                            title="Costo Unitario"
                            value={unitCost}
                            formatter={(value) => formatMoney(value)}
                        />
                    </Tooltip>
                    <Tooltip title='Subtotal'>
                        <TotalItem
                            title="Subtotal"
                            value={subtotal}
                            formatter={(value) => formatMoney(value)}
                        />
                    </Tooltip>
                    <ActionContainer>
                        <Tooltip title='Borrar'>
                            <Button
                                icon={icons.operationModes.close}
                                onClick={handleDelete}
                                disabled={!isProductSelected}
                            />
                        </Tooltip>
                        <Tooltip title='Agregar Producto'>
                            <Button
                                type="primary"
                                icon={icons.operationModes.add}
                                onClick={handleSubmit}
                                disabled={!isProductSelected}
                            />
                        </Tooltip>
                    </ActionContainer>
                </FieldsRow>
            </Form>
        </RowContainer>
    );
};

export default AddProductForm;

const RowContainer = styled.div`
    padding-bottom: 0.2em;
    margin-bottom: 1em;
    overflow-x: auto;
`;

const FieldsRow = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 100px min-content 120px 105px min-content  min-content min-content 0.8fr 1fr min-content;
    gap: 8px;
   
`;


const StatsContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const TotalItem = styled(Statistic)`
    align-self: end;
    justify-content: space-between;
    .ant-statistic-title {
        font-size: 14px;
        color: #333;
          text-align: right; 
    }
    .ant-statistic-content {
        font-size: 16px;
        font-weight: bold;
        text-align: right;  // Alineación a la derecha
    }
`;

const ActionContainer = styled(StatsContainer)`
    display: flex;
    align-items: end;
    padding: 0 0 0.3em 0;
    justify-content: flex-end;
     margin-left: 0.8em;
    gap: 0.4em;
    
   
`;

const StyledFormItem = styled(Form.Item)`
    .ant-form-item-explain {
        display: none;
    }
    
    .ant-form-item-label {

    display: flex;
    align-items: end;
}


    .ant-form-item-control {
        min-height: unset; // Elimina la altura mínima predeterminada
    }

    &.ant-form-item {
        margin-bottom: 0;
       
        display: flex;
        flex-direction: column;
    }


`;