import React from 'react';
import { Select, DatePicker, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;
const { Option } = Select;

/**
 * Barra de filtros para el modal de pago múltiple
 * @param {Object} props - Propiedades del componente
 * @param {string} props.insuranceFilter - Filtro de aseguradora seleccionado
 * @param {Array} props.insuranceOptions - Opciones de aseguradoras disponibles
 * @param {Function} props.onInsuranceFilterChange - Función para manejar cambio de filtro de aseguradora
 * @param {Function} props.onDateRangeChange - Función para manejar cambio de rango de fechas
 */
const FilterBar = ({ 
  insuranceFilter, 
  insuranceOptions, 
  onInsuranceFilterChange, 
  onDateRangeChange 
}) => {
  return (
    <FilterRow>
      <FilterGroup>
        <Text strong style={{ marginRight: '8px' }}>Aseguradora:</Text>
        <Select 
          style={{ width: '200px' }} 
          value={insuranceFilter}
          onChange={onInsuranceFilterChange}
          placeholder="Seleccionar aseguradora"
        >
          {insuranceOptions.map(option => (
            <Option key={option.id} value={option.id}>{option.name}</Option>
          ))}
        </Select>
      </FilterGroup>
      
      <FilterGroup>
        <Text strong style={{ marginRight: '8px' }}>Fecha:</Text>
        <DatePicker.RangePicker 
          style={{ width: '280px' }}
          onChange={onDateRangeChange} 
          format="DD/MM/YYYY"
        />
      </FilterGroup>
    </FilterRow>
  );
};

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
`;

export default FilterBar;