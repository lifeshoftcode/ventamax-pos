import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateProductInsurance } from '../../../../../../../features/cart/cartSlice';

const validateNumericWithDecimal = (input) => {
  // Si está vacío, permitirlo
  if (input === '') return '';
  
  // Verificar si la entrada contiene sólo dígitos y a lo sumo un punto decimal
  const isValid = /^(\d+)?\.?(\d+)?$/.test(input);
  
  if (isValid) {
    return input;
  } else {
    // Si no es válido, rechazamos el cambio
    return null;
  }
};

export const InsuranceCoverage = ({ item }) => {
  const dispatch = useDispatch();
  
  // Local state for insurance mode and value
  const [insurance, setInsurance] = useState({
    mode: item.insurance?.mode || 'porcentaje',
    value: item.insurance?.value 
  });

  // Update local state when item changes
  useEffect(() => {
    setInsurance({
      mode: item.insurance?.mode || 'porcentaje',
      value: item.insurance?.value 
    });
  }, [item]);

  const handleInsuranceModeChange = e => {
    const newMode = e.target.value;
    const newInsurance = { ...insurance, mode: newMode };
    setInsurance(newInsurance);
    dispatch(updateProductInsurance({ 
      id: item.id, 
      mode: newMode, 
      value: newInsurance.value 
    }));
  };

  const handleInsuranceValueChange = newValue => {
    const validatedValue = validateNumericWithDecimal(newValue);

    // Si la entrada no es válida, mantenemos el valor anterior
    if (validatedValue === null) return;
    
    // Actualizamos el estado con el valor validado
    const newInsurance = { ...insurance, value: validatedValue };
    setInsurance(newInsurance);
    dispatch(updateProductInsurance({ 
      id: item.id, 
      mode: newInsurance.mode, 
      value: newInsurance.value 
    }));
  };

  const handleInsuranceValueBlur = e => {
    let value = e.target.value === '' ? '' : Number(e.target.value);

    if (insurance.mode === 'porcentaje') {
      if (value > 100) value = 100;

      setInsurance({ ...insurance, value });
      dispatch(updateProductInsurance({ 
        id: item.id, 
        mode: insurance.mode, 
        value 
      }));
    }
  };

  return (
    <CoveragePill
      as={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CoverageLabel>Cobertura</CoverageLabel>
      <CoverageControls>
        <ToggleGroup>
          <ToggleOption
            active={insurance.mode === 'porcentaje'}
            onClick={() => handleInsuranceModeChange({ target: { value: 'porcentaje' } })}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            %
          </ToggleOption>
          <ToggleOption
            active={insurance.mode === 'monto'}
            onClick={() => handleInsuranceModeChange({ target: { value: 'monto' } })}
            as={motion.button}
            whileTap={{ scale: 0.95 }}
          >
            $
          </ToggleOption>
        </ToggleGroup>
        <ValueInput
          value={insurance.value}
          onChange={(e) => handleInsuranceValueChange(e.target.value)}
          onBlur={handleInsuranceValueBlur}
          as={motion.input}
          whileFocus={{ boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.25)" }}
        />
      </CoverageControls>
    </CoveragePill>
  );
};

// Estilos
const CoveragePill = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 10px;
  background: #f9f9f9;
  border: 1px solid #eaeaea;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.06);
    border-color: #e0e0e0;
  }
`;

const CoverageLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #666;
  margin-right: 8px;
  white-space: nowrap;
`;

const CoverageControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  height: 2em;
  padding: 1px;
  border-radius: 100px;
  background: white;
  border: 1px solid #e0e0e0;
`;

const ToggleOption = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  background: ${props => props.active ? '#062057' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.15s ease;
  border-radius: 12px;
  
  &:active {
    transform: scale(0.97);
  }
  
  &:focus {
    outline: none;
  }
`;

const ValueInput = styled.input`
  width: 100%;
  height: 2em;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  background: white;
  padding: 0 8px;
  text-align: center;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  
  &:hover, &:focus {
    border-color: #2563eb;
    outline: none;
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
  
  &::placeholder {
    color: #aaa;
  }
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export default InsuranceCoverage;