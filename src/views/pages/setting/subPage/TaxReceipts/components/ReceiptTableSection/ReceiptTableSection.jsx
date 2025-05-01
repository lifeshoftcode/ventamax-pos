import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Badge } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import { TableTaxReceipt } from '../TableTaxReceipt/TableTaxReceipt';
import DisabledReceiptsModal from '../DisabledReceiptsModal/DisabledReceiptsModal';

export const ReceiptTableSection = ({
  enabled,
  itemsLocal,
  setItemsLocal, // Setter for updating local items, passed to TableTaxReceipt
  onAddBlank,
  onAddPredefined,
}) => {
  const [disabledModalVisible, setDisabledModalVisible] = useState(false);

  const disabledReceipts = itemsLocal?.filter(item => item.data?.disabled);

  const handleRestoreReceipt = (receiptId) => {
    const newArray = itemsLocal.map(item =>
      (item.data.id === receiptId)
        ? { ...item, data: { ...item.data, disabled: false } }
        : item
    );
    setItemsLocal(newArray);
  };

  if (!enabled) return null;

  return (
    <Wrapper>
      <Actions>
        <Right>
          <Button icon={<PlusOutlined />} type="primary" onClick={onAddPredefined}>
            Comprobante
          </Button>
        </Right>
      </Actions>
      <TableTaxReceipt array={itemsLocal} setData={setItemsLocal} />

      {/* Botón para mostrar comprobantes deshabilitados */}
      {/* {disabledReceipts?.length > 0 && (
        <Badge count={disabledReceipts.length} overflowCount={99}>
          <DisabledReceiptsButton onClick={() => setDisabledModalVisible(true)}>
            Comprobantes deshabilitados
          </DisabledReceiptsButton>
        </Badge>
      )} */}

      {/* Modal de comprobantes deshabilitados */}
      <DisabledReceiptsModal
        visible={disabledModalVisible}
        onCancel={() => setDisabledModalVisible(false)}
        disabledReceipts={disabledReceipts}
        onRestore={handleRestoreReceipt}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: end;
  padding: 0;
  border-radius: 8px;
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
  gap: 12px;
`;

// Botón para mostrar los comprobantes deshabilitados
const DisabledReceiptsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  background-color: #f9f0ff;
  border: 1px dashed #722ed1;
  border-radius: 8px;
  color: #722ed1;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f0e6ff;
    border-color: #531dab;
  }

  .ant-badge {
    margin-left: 8px;
  }
`;
