import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Input } from 'antd';
import { InsuranceAuthModal } from './InsuranceAuthModal';
import { useSelector } from 'react-redux';
import { selectClient } from '../../../../../features/clientCart/clientCartSlice';

export const InsuranceAuthFields = ({
  
  onRecurrenceChange,
  onValidityChange,
  onAuthNumberChange,
  values
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const client = useSelector(selectClient);
  if (!client) return null;

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (formValues) => {
    if (formValues.authNumber) {
      onAuthNumberChange({ target: { value: formValues.authNumber } });
    }
  };

  return (
    <Container>
      <FormRow>
        <StyledCheckbox 
          checked={values?.recurrence}
          onChange={onRecurrenceChange}
        >
          Guardar recurrencia de seguro
        </StyledCheckbox>
      </FormRow>
      
      <FormRow>
        <StyledCheckbox
          checked={values?.validity}
          onChange={onValidityChange}
        >
          Vigencia de autorización de seguro
        </StyledCheckbox>
      </FormRow>
      
      <FormRow>
        <StyledInput 
          placeholder="Número de autorización del seguro"
          value={values?.authNumber}
          onChange={onAuthNumberChange}
          onClick={handleInputClick}
        />
      </FormRow>

      <InsuranceAuthModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        initialValues={{
          authNumber: values?.authNumber
        }}
      />
    </Container>
  );
};

const Container = styled.div`
box-shadow: 0 -8px 10px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.158);
position: sticky;
bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background-color: #fff;
  padding: 0.4em;
    border-radius: 0.4em;
    border: 1px solid #e8e8e8;
`;

const FormRow = styled.div`
  display: flex; 
  align-items: center; 
`;

const StyledCheckbox = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    color: ${props => props.theme.text.color1};
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  cursor: pointer;
`;