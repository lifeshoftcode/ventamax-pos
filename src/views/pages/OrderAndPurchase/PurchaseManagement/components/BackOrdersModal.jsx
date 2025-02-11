import { Modal, Table, Checkbox, InputNumber, Alert, message } from 'antd';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const BackOrdersModal = ({ 
    backOrders, 
    isVisible, 
    onCancel, 
    onConfirm,
    initialSelectedBackOrders = [],
    initialPurchaseQuantity = 0,
    productId, 
    backOrderAssociationId,
}) => {
    const [localSelectedBackOrders, setLocalSelectedBackOrders] = useState([]);
    const [purchaseQuantity, setPurchaseQuantity] = useState(0);
    const totalBackordersQuantity = localSelectedBackOrders.reduce((sum, order) => sum + order.quantity, 0);
    const remainingQuantity = Math.max(0, purchaseQuantity - totalBackordersQuantity);

    const sourceId = backOrderAssociationId;

    useEffect(() => {
        if (isVisible) {
            setLocalSelectedBackOrders(initialSelectedBackOrders);
            setPurchaseQuantity(initialPurchaseQuantity);
        }
    }, [isVisible]);

    const handleBackOrderSelect = (e, record) => {
        if (e.target.checked) {
            setLocalSelectedBackOrders(prev => [...prev, { 
                id: record.id,
                quantity: record.pendingQuantity,
                productId: record.productId,
                orderId: record.orderId || record.purchaseId
            }]);
        } else {
            setLocalSelectedBackOrders(prev => prev.filter(bo => bo.id !== record.id));
        }
    };

    const columns = [
        {
            title: 'Seleccionar',
            dataIndex: 'id',
            width: 100,
            render: (_, record) => {
                const recordSourceId = record.orderId || record.purchaseId;
                const isDisabled = record.status === 'reserved' && (!backOrderAssociationId || recordSourceId !== backOrderAssociationId);

                return (
                    <Checkbox
                        checked={localSelectedBackOrders.some(bo => bo.id === record.id)}
                        onChange={(e) => handleBackOrderSelect(e, record)}
                        disabled={isDisabled}
                    />
                );
            },
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            width: 100,
            render: (status, record) => (record.status === 'reserved' && record.orderId !== backOrderAssociationId ? 'Reservado' : status || 'Pendiente')
        },
        {
            title: 'Cantidad Pendiente',
            dataIndex: 'pendingQuantity',
            width: 150,
        },
        {
            title: 'Fecha',
            dataIndex: 'createdAt',
            width: 200,
            render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
        }
    ];

    const handleOk = () => {
        if (!productId) {
            message.error('No se encontró productId');
            return;
        }
        if (localSelectedBackOrders.length > 0 && purchaseQuantity < totalBackordersQuantity) {
            message.error('La cantidad a comprar debe ser mayor o igual a la cantidad total de backorders seleccionados');
            return;
        }
        onConfirm({
            id: productId,
            selectedBackOrders: localSelectedBackOrders,
            purchaseQuantity
        });
    };

    return (
        <Modal
            title="Backorders Pendientes"
            open={isVisible}
            onOk={handleOk}
            onCancel={onCancel}
            width={800}
            style={{ top: 10 }}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <ModalContent>
                {backOrderAssociationId}
                <StatsSection>
                    <QuantityInputSection>
                        <label>Cantidad total a comprar:</label>
                        <InputNumber
                            value={purchaseQuantity}
                            onChange={(value) => setPurchaseQuantity(value || 0)}
                            min={0}
                            style={{ width: 120 }}
                        />
                    </QuantityInputSection>
                    <StatsGrid>
                        <StatItem>
                            <label>BackOrders seleccionados:</label>
                            <span>{totalBackordersQuantity} unidades</span>
                        </StatItem>
                        <StatItem>
                            <label>Cantidad restante:</label>
                            <span>{remainingQuantity} unidades</span>
                        </StatItem>
                    </StatsGrid>
                </StatsSection>

                {localSelectedBackOrders.length > 0 && purchaseQuantity < totalBackordersQuantity && (
                    <Alert
                        type="warning"
                        message="La cantidad a comprar debe ser mayor o igual a la cantidad total de backorders seleccionados"
                        style={{ marginBottom: 16 }}
                    />
                )}

                <p>Opcionalmente, seleccione los backorders que desea cubrir con esta compra:</p>
                <Table
                    dataSource={backOrders}
                    columns={columns}
                    size="small"
                    pagination={false}
                    rowKey="id"
                    scroll={{ y: 300 }}
                />
            </ModalContent>
        </Modal>
    );
};

export default BackOrdersModal;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StatsSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
`;

const QuantityInputSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
        font-size: 12px;
        color: #666;
    }
`;

const StatsGrid = styled.div`
    display: flex;
    gap: 24px;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    label {
        font-size: 12px;
        color: #666;
    }
    
    span {
        font-size: 16px;
        font-weight: 500;
        color: ${props => props.$warning ? '#ff4d4f' : 'inherit'};
    }
`;