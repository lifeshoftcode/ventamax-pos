import React from 'react';
import styled from 'styled-components';
import { Checkbox, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { InsuranceAuthModal } from './InsuranceAuthModal/InsuranceAuthModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectClient } from '../../../../../features/clientCart/clientCartSlice';
import { openModal, selectInsuranceAuthData } from '../../../../../features/insurance/insuranceAuthSlice';
import {
  selectInsuranceData,
  updateInsuranceData
} from '../../../../../features/insurance/insuranceSlice';

export const InsuranceAuthFields = () => {
  const dispatch = useDispatch();
  const client = useSelector(selectClient);
  const authData = useSelector(selectInsuranceAuthData);
  const insuranceData = useSelector(selectInsuranceData);

  if (!client) return null;

  const handleInputClick = () => {
    dispatch(openModal({
      initialValues: { authNumber: authData?.authNumber, clientId: client?.id }
    }));
  };

  const handleRecurrenceChange = (e) => {
    dispatch(updateInsuranceData({ recurrence: e.target.checked }));
  };

  return (
    <Container>
      <FormRow>
        <StyledCheckbox
          checked={insuranceData?.recurrence}
          onChange={handleRecurrenceChange}
        >
          Guardar recurrencia de seguro
        </StyledCheckbox>
      </FormRow>
      <FormRow>
        <StyledInput
          placeholder="Número de autorización del seguro"
          value={authData?.authNumber}
          onClick={handleInputClick}
          readOnly
          suffix={<EditIcon onClick={handleInputClick} />}
        />
      </FormRow>
      <InsuranceAuthModal />
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
  width: 100%;
`;

const StyledCheckbox = styled(Checkbox)`
  &.ant-checkbox-wrapper {
    color: ${props => props.theme.text.color1};
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  cursor: pointer;
  &:hover {
    border-color: #40a9ff;
  }
`;

const EditIcon = styled(EditOutlined)`
  color: #1890ff;
  cursor: pointer;
`;