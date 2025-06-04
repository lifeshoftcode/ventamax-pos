import React from 'react';
import { Table, Typography, Tag, Tooltip } from 'antd';
import styled from 'styled-components';
import { CalendarOutlined, FileProtectOutlined, NumberOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

const AuthorizationHistoryTable = ({ authorizations = [], receiptInfo }) => {
  // Si no hay autorizaciones, mostramos un mensaje
  if (!authorizations || authorizations.length === 0) {
    return (
      <EmptyHistory>
        <Title level={5}>Historial de Autorizaciones</Title>
        <Text type="secondary">
          No hay autorizaciones registradas para este comprobante.
        </Text>
      </EmptyHistory>
    );
  }

  // Ordenar autorizaciones por fecha (más recientes primero)
  const sortedAuthorizations = [...authorizations].sort((a, b) => {
    return dayjs(b.authorizationDate).unix() - dayjs(a.authorizationDate).unix();
  });

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'authorizationDate',
      key: 'authorizationDate',
      render: (date) => (
        <DateCell>
          <CalendarOutlined />
          <span>{dayjs(date).format('DD/MM/YYYY')}</span>
        </DateCell>
      ),
    },
    {
      title: 'Autorización',
      dataIndex: 'authorizationNumber',
      key: 'authorizationNumber',
      render: (text) => (
        <Tooltip title="Número de Autorización DGI">
          <NumberCell>
            <NumberOutlined />
            <span>{text}</span>
          </NumberCell>
        </Tooltip>
      ),
    },
    {
      title: 'Secuencia',
      key: 'sequence',
      render: (_, record) => (
        <SequenceRange>
          <div>
            <Text type="secondary">Desde:</Text>
            <SequenceValue>{receiptInfo.type}{receiptInfo.serie}{record.startSequence}</SequenceValue>
          </div>
          <div>
            <Text type="secondary">Hasta:</Text>
            <SequenceValue>{receiptInfo.type}{receiptInfo.serie}{record.endSequence}</SequenceValue>
          </div>
        </SequenceRange>
      ),
    },
    {
      title: 'Cantidad',
      dataIndex: 'approvedQuantity',
      key: 'approvedQuantity',
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Vencimiento',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (date) => {
        const isExpired = dayjs(date).isBefore(dayjs());
        return (
          <ExpirationDate $expired={isExpired}>
            <CalendarOutlined />
            <span>{dayjs(date).format('DD/MM/YYYY')}</span>
            {isExpired && <ExpiredTag>VENCIDO</ExpiredTag>}
          </ExpirationDate>
        );
      },
    },
  ];

  return (
    <HistoryContainer>
      <Title level={5}>
        <FileProtectOutlined /> Historial de Autorizaciones
      </Title>
      
      <Table
        columns={columns}
        dataSource={sortedAuthorizations}
        rowKey={(record) => record.authorizationNumber}
        pagination={false}
        size="small"
        bordered
      />
    </HistoryContainer>
  );
};

const EmptyHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  text-align: center;
`;

const HistoryContainer = styled.div`
  margin-top: 24px;
`;

const DateCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const NumberCell = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Courier New', monospace;
  font-weight: 500;
  color: #1677ff;
`;

const SequenceRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SequenceValue = styled.span`
  font-family: monospace;
  background-color: #f0f5ff;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 4px;
  font-weight: 500;
`;

const ExpirationDate = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${props => (props.$expired ? '#ff4d4f' : 'inherit')};
  font-weight: ${props => (props.$expired ? '500' : 'inherit')};
`;

const ExpiredTag = styled.span`
  background-color: #ff4d4f;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 3px;
  margin-left: 4px;
`;

export default AuthorizationHistoryTable;
