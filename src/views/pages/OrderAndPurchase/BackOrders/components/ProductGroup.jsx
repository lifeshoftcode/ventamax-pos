import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import BackorderCard from './BackorderCard';

const ProductGroupContainer = styled(motion.div)`
  background: white;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  overflow: hidden;
  height: ${props => props.isCollapsed ? 'min-content' : 'auto'};

`;

const GroupHeader = styled.div`
  border-bottom: ${props => props.isCollapsed ? 'none' : '1px solid #f0f0f0'};
  background: white;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 16px;
  height: ${props => props.isCollapsed ? '0' : 'auto'};
`;

const DateGroup = styled.div`
  padding: 8px 0;
  font-weight: 500;
  font-size: 13px;
  color: #8c8c8c;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 8px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`;

const ProductGroup = ({ group, isCollapsed, onToggle }) => {
  return (
    <ProductGroupContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      isCollapsed={isCollapsed}
    >
      <GroupHeader isCollapsed={isCollapsed}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              type="text"
              icon={isCollapsed ? <DownOutlined /> : <UpOutlined />}
              onClick={onToggle}
              size="small"
              style={{ padding: 4 }}
            />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{group.productName}</span>
          </div>
          <span style={{ fontSize: '14px' }}>
            {group.totalQuantity} u
          </span>
        </div>
      </GroupHeader>

      {!isCollapsed && (
        <GridContainer isCollapsed={isCollapsed}>
          {Object.entries(group.dateGroups)
            .sort(([,a], [,b]) => b.date - a.date)
            .map(([dateKey, dateGroup]) => (
              <div key={dateKey}>
                <DateGroup>
                  {new Date(dateGroup.date).toLocaleDateString()} - {dateGroup.totalQuantity} unidades
                </DateGroup>
                <CardsGrid>
                  {dateGroup.items.map((item, index) => (
                    <BackorderCard 
                      key={item.id} 
                      item={item} 
                      index={index}
                    />
                  ))}
                </CardsGrid>
              </div>
            ))}
        </GridContainer>
      )}
    </ProductGroupContainer>
  );
};

export default ProductGroup;