// File: src/components/TaxReceiptSetting/ReceiptSettingsSection.jsx
import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { Switch } from '../../../../../../templates/system/Switch/Switch';

const { Title, Text } = Typography;

export function ReceiptSettingsSection({ enabled, onToggle }) {
    return (
        <Container>
            <Info>
                <Title level={4}>Opción para Deshabilitar Comprobantes</Title>
                <Text>Activa o desactiva los comprobantes en el punto de venta</Text>
            </Info>
            <Switch checked={enabled} onChange={onToggle} />
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  > h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
  > p {
    margin: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
`;