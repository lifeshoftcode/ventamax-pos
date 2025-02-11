import React from 'react';
import styled from 'styled-components';
import { Input, DatePicker, Select } from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const HeaderContainer = styled.div`
  margin-bottom: 24px;
`;

const HeaderStats = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const StatBox = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  min-width: 80px;
  
  &.total {
    background: #fafafa;
    border: 1px solid #f0f0f0;
  }
  
  &.pending {
    background: #fff7e6;
    border: 1px solid #ffd591;
  }
  
  &.reserved {
    background: #e6f7ff;
    border: 1px solid #91d5ff;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const sortOptions = [
  { value: 'pending-desc', label: 'Mayor cantidad pendiente' },
  { value: 'pending-asc', label: 'Menor cantidad pendiente' },
  { value: 'date-desc', label: 'Más recientes' },
  { value: 'date-asc', label: 'Más antiguos' },
  { value: 'progress-desc', label: 'Mayor progreso' },
  { value: 'progress-asc', label: 'Menor progreso' }
];

const Header = ({ stats, searchText, setSearchText, dateRange, setDateRange, sortBy, setSortBy }) => {
  return (
    <HeaderContainer>
      <HeaderStats>
        <StatBox className="total">
          <div style={{ fontSize: '16px', fontWeight: '500' }}>{stats.total}</div>
          <div style={{ fontSize: '11px', color: '#8c8c8c' }}>Total</div>
        </StatBox>
        <StatBox className="pending">
          <div style={{ fontSize: '16px', fontWeight: '500' }}>{stats.pending}</div>
          <div style={{ fontSize: '11px', color: '#8c8c8c' }}>Pendientes</div>
        </StatBox>
        <StatBox className="reserved">
          <div style={{ fontSize: '16px', fontWeight: '500' }}>{stats.reserved}</div>
          <div style={{ fontSize: '11px', color: '#8c8c8c' }}>Reservados</div>
        </StatBox>
      </HeaderStats>

      <FiltersWrapper>
        <Input
          placeholder="Buscar producto"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: '180px' }}
        />
        <RangePicker
          onChange={setDateRange}
          placeholder={['Inicio', 'Fin']}
          style={{ width: 'auto' }}
        />
        <Select
          value={sortBy}
          onChange={setSortBy}
          style={{ width: '160px' }}
          placeholder="Ordenar por"
          suffixIcon={<SortAscendingOutlined />}
        >
          {sortOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </FiltersWrapper>
    </HeaderContainer>
  );
};

export default Header;