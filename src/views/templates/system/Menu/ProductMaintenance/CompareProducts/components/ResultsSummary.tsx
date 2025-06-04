import React from 'react';
import { Typography } from 'antd';
import { CheckCircleOutlined, WarningOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const SummaryCard = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const StatCard = styled.div<{ $backgroundColor?: string }>`
  padding: 16px;
  border-radius: 8px;
  flex: 1;
  margin: 0 8px;
  text-align: center;
  background-color: ${props => props.$backgroundColor || 'white'};
`;

interface ResultsSummaryProps {
  matchCount: number;
  conflictCount: number;
  excelOnlyCount: number;
  dbOnlyCount: number;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  matchCount,
  conflictCount,
  excelOnlyCount,
  dbOnlyCount
}) => {
  return (
    <SummaryCard>
      <StatCard $backgroundColor="#e6f7ff">
        <CheckCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
        <Title level={3}>{matchCount}</Title>
        <Text>Coincidencias exactas</Text>
      </StatCard>
      
      <StatCard $backgroundColor="#fff2e8">
        <WarningOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
        <Title level={3}>{conflictCount}</Title>
        <Text>Conflictos encontrados</Text>
      </StatCard>
      
      <StatCard $backgroundColor="#f6ffed">
        <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
        <Title level={3}>{excelOnlyCount}</Title>
        <Text>Solo en Excel</Text>
      </StatCard>
      
      <StatCard $backgroundColor="#e6fffb">
        <ExclamationCircleOutlined style={{ fontSize: '24px', color: '#13c2c2' }} />
        <Title level={3}>{dbOnlyCount}</Title>
        <Text>Solo en base de datos</Text>
      </StatCard>
    </SummaryCard>
  );
};