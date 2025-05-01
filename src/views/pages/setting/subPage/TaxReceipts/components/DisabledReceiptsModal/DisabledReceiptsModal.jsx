import React from 'react';
import styled from 'styled-components';
import { Modal, Card, Button, Tooltip, message, Badge, Typography, Empty } from 'antd';
import { CheckCircleOutlined, FileOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../../features/auth/userSlice';
import { updateTaxReceipt } from '../../../../../../../firebase/taxReceipt/updateTaxReceipt';

const { Title, Text } = Typography;

/**
 * Modal para mostrar y restaurar comprobantes deshabilitados
 */
const DisabledReceiptsModal = ({ visible, onCancel, disabledReceipts, onRestore }) => {
  const user = useSelector(selectUser);

  // Función para calcular el límite de secuencia
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

  // Formatear secuencia con ceros
  const formatSequence = (seq, length) => {
    if (seq === undefined || length === undefined) return seq;
    return String(seq).padStart(length, '0');
  };

  // Manejar la restauración de un comprobante
  const handleRestore = async (receiptData) => {
    try {
      // Actualizar el documento en Firebase con disabled = false
      const dataToUpdate = { 
        id: receiptData.id, 
        ...receiptData, 
        disabled: false 
      };
      
      await updateTaxReceipt(user, dataToUpdate);
      message.success('Comprobante restaurado correctamente');
      
      // Notificar al componente padre para actualizar la lista
      onRestore(receiptData.id);
    } catch (error) {
      console.error('Error al restaurar comprobante:', error);
      message.error('Error al restaurar el comprobante');
    }
  };

  return (
    <Modal
      title={
        <TitleContainer>
          <Title level={4}>Comprobantes Deshabilitados</Title>
          <Text type="secondary">
            Estos comprobantes están inactivos pero pueden ser restaurados
          </Text>
        </TitleContainer>
      }
      open={visible}
      onCancel={onCancel}
     
      footer={[
        <Button key="close" onClick={onCancel}>
          Cerrar
        </Button>
      ]}
    >
      <Content>
        {disabledReceipts.length > 0 ? (
          <ReceiptsGrid>
            {disabledReceipts.map((receipt) => (
              <ReceiptCard key={receipt.id || receipt.data.id}>
                <CardHeader>
                  <h4>{receipt.data.name}</h4>
                  <small>Tipo: {receipt.data.type} | Serie: {receipt.data.serie}</small>
                </CardHeader>
                <CardBody>
                  <DetailItem>
                    <Label>Secuencia:</Label>
                    <Value>{formatSequence(receipt.data.sequence, receipt.data.sequenceLength)}</Value>
                  </DetailItem>
                  <DetailItem>
                    <Label>Incremento:</Label>
                    <Value>{receipt.data.increase}</Value>
                  </DetailItem>
                  <DetailItem>
                    <Label>Cantidad:</Label>
                    <Value>{receipt.data.quantity}</Value>
                  </DetailItem>
                  <DetailItem>
                    <Label>Límite (NCF):</Label>
                    <LimitValue>
                      <FileOutlined style={{ marginRight: 5 }} />
                      {calculateLimit(receipt.data)}
                    </LimitValue>
                  </DetailItem>
                </CardBody>
                <Tooltip title="Restaurar comprobante">
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleRestore(receipt.data)}
                    block
                  >
                    Restaurar
                  </Button>
                </Tooltip>
              </ReceiptCard>
            ))}
          </ReceiptsGrid>
        ) : (
          <EmptyContainer>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No hay comprobantes deshabilitados"
            />
          </EmptyContainer>
        )}
      </Content>
    </Modal>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    margin-bottom: 0;
  }
`;

const ReceiptsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
`;

const ReceiptCard = styled(Card)`
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: all 0.3s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const CardHeader = styled.div`
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  margin-bottom: 12px;
  
  h4 {
    margin: 0 0 6px 0;
    font-size: 16px;
    font-weight: 600;
  }

  small {
    font-size: 12px;
    color: #999;
  }
`;

const CardBody = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: #8c8c8c;
  font-size: 14px;
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const LimitValue = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #1890ff;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export default DisabledReceiptsModal;
