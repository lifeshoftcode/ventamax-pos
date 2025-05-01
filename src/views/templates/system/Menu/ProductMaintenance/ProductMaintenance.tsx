import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { DuplicateProducts } from './DuplicateProducts/DuplicateProducts';
import { CompareProducts } from './CompareProducts/CompareProducts';

const Container = styled.div`
  width: 100%;
  padding: 0 16px;
`;

export const ProductMaintenance: React.FC = () => {
  const items = [
    {
      key: '1',
      label: 'Productos Duplicados',
      children: <DuplicateProducts />,
    },
    {
      key: '2',
      label: 'Comparar con Excel',
      children: <CompareProducts />,
    }
  ];

  return (
    <Container>
      <Tabs
        defaultActiveKey="1"
        items={items}
      />
    </Container>
  );
};
