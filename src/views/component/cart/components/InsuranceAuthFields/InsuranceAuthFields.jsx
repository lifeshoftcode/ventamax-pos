import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { InsuranceAuthModal } from './InsuranceAuthModal/InsuranceAuthModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectClient } from '../../../../../features/clientCart/clientCartSlice';
import { openModal, selectInsuranceAuthData, setAuthData } from '../../../../../features/insurance/insuranceAuthSlice';
import {
  selectInsuranceData,
  updateInsuranceData
} from '../../../../../features/insurance/insuranceSlice';
import { getClientInsuranceByClientId } from '../../../../../firebase/insurance/clientInsuranceService';
import { selectUser } from '../../../../../features/auth/userSlice';

export const InsuranceAuthFields = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const client = useSelector(selectClient);
  const authData = useSelector(selectInsuranceAuthData);
  const insuranceData = useSelector(selectInsuranceData);
  const [authNumber, setAuthNumber] = useState(authData?.authNumber || '');
  const [clientInsurance, setClientInsurance] = useState(null);

  // Obtener datos de seguro del cliente cuando el cliente cambia
  useEffect(() => {
    const fetchClientInsurance = async () => {
      if (client?.id) {
        const insuranceData = await getClientInsuranceByClientId(user, client.id);
        if (insuranceData) {
          setClientInsurance(insuranceData);
          // Actualizar solo los datos específicos que necesitamos
          dispatch(setAuthData({
            insuranceId: insuranceData.insuranceId,
            insuranceType: insuranceData.insuranceType,
            birthDate: insuranceData.birthDate
          }));
        }
      }
    };

    if (client?.id) {
      fetchClientInsurance();
    }
  }, [client, user, dispatch]);

  if (!client) return null;

  const handleOpenModal = () => {
    dispatch(openModal({
      initialValues: { 
        authNumber: authNumber, 
        clientId: client?.id,
        // Incluir los datos del seguro del cliente si están disponibles
        insuranceId: clientInsurance?.insuranceId || authData?.insuranceId,
        insuranceType: clientInsurance?.insuranceType || authData?.insuranceType,
        birthDate: clientInsurance?.birthDate || authData?.birthDate
      }
    }));
  };

  const handleRecurrenceChange = (e) => {
    dispatch(updateInsuranceData({ recurrence: e.target.checked }));
  };

  const handleInputChange = (e) => {
    setAuthNumber(e.target.value);
    dispatch(setAuthData({ authNumber: e.target.value }));
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
        <InputContainer>
          <StyledInput
            placeholder="Número de autorización del seguro"
            value={authData?.authNumber}
            onChange={handleInputChange}
          />
          <EditButton 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={handleOpenModal}
          >
            Editar
          </EditButton>
        </InputContainer>
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

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  &:hover {
    border-color: #40a9ff;
  }
`;

const EditIcon = styled(EditOutlined)`
  color: #1890ff;
  cursor: pointer;
`;

const EditButton = styled(Button)`
  flex-shrink: 0;
`;