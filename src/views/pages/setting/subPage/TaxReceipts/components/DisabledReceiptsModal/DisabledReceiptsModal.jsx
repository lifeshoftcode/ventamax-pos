import React from 'react';
import styled from 'styled-components';
import { Modal, Button, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../../features/auth/userSlice';
import { updateTaxReceipt } from '../../../../../../../firebase/taxReceipt/updateTaxReceipt';

/**
 * Modal para mostrar y restaurar comprobantes deshabilitados
 */
const DisabledReceiptsModal = ({ visible, onCancel, disabledReceipts, onRestore }) => {
  const user = useSelector(selectUser);

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
          <ModalTitle>Comprobantes Deshabilitados</ModalTitle>
          <ModalSubtitle>
            Estos comprobantes están inactivos pero pueden ser restaurados
          </ModalSubtitle>
        </TitleContainer>
      }
      width={800}
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
            {disabledReceipts.map((receipt) => (              <CustomReceiptCard key={receipt.id || receipt.data.id}>
                <CardHeaderSection>
                  <ReceiptName>{receipt.data.name}</ReceiptName>
                  <ReceiptCode>{receipt.data.type}{receipt.data.serie}</ReceiptCode>
                </CardHeaderSection>
                <CardContent>
                  {/* <DetailRow>
                    <DetailLabel>Tipo</DetailLabel>
                    <DetailValue>{receipt.data.type}</DetailValue>
                  </DetailRow> */}
                  <DetailRow>
                    <DetailLabel>Secuencia:</DetailLabel>
                    <DetailValue>{receipt.data.sequence}</DetailValue>
                  </DetailRow>
                </CardContent>                <RestoreButtonContainer>
                  <RestoreButton
                    onClick={() => handleRestore(receipt.data)}
                  >
                    <CheckCircleOutlined style={{ fontSize: '12px' }} />
                    <span>Restaurar</span>
                  </RestoreButton>
                </RestoreButtonContainer>
              </CustomReceiptCard>
            ))}
          </ReceiptsGrid>
        ) : (
          <EmptyStateContainer>
            <EmptyIconWrapper>
              <EmptyDocumentIcon />
            </EmptyIconWrapper>
            <EmptyStateText>No hay comprobantes deshabilitados</EmptyStateText>
          </EmptyStateContainer>
        )}
      </Content>
    </Modal>
  );
};

// Icono de documento vacío personalizado
const EmptyDocumentIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M48 8H16C13.7909 8 12 9.79086 12 12V52C12 54.2091 13.7909 56 16 56H48C50.2091 56 52 54.2091 52 52V12C52 9.79086 50.2091 8 48 8Z" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 8V18H44" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 30H40" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 38H40" stroke="#d9d9d9" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 4px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
`;

const ModalTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ModalSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #8c8c8c;
`;

const ReceiptsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
`;

const CustomReceiptCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #eaeaea;
`;

const CardHeaderSection = styled.div`
  padding: 10px 12px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReceiptName = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const ReceiptCode = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #1677ff;
  background-color: rgba(22, 119, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  flex: 1;
  gap: 12px;
  background-color: #fafafa;
`;

const DetailRow = styled.div`
  display: flex;
  flex: 1;
  gap: 6px;
`;

const DetailLabel = styled.span`
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 2px;
`;

const DetailValue = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #262626;
`;

const RestoreButtonContainer = styled.div`
  padding: 8px 12px;
  border-top: 1px solid #eaeaea;
`;

const RestoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background-color: #0958d9;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
`;

const EmptyIconWrapper = styled.div`
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  color: #8c8c8c;
  margin: 0;
`;

export default DisabledReceiptsModal;
