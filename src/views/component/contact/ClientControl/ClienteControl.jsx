import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setClient as setClientInClientCart, setChange, toggleCart, totalPurchase, updateInsuranceStatus, selectInsuranceEnabled } from '../../../../features/cart/cartSlice'
import { ClientDetails } from './ClientDetails/ClientDetails.jsx'
import { updateObject } from '../../../../utils/object/updateObject'
import { deleteClient, selectClient, selectClientMode, selectClientSearchTerm, selectIsOpen, selectLabelClientMode, setClient, setClientMode, setClientSearchTerm, setIsOpen } from '../../../../features/clientCart/clientCartSlice'
import { CLIENT_MODE_BAR } from '../../../../features/clientCart/clientMode'
import { useWindowWidth } from '../../../../hooks/useWindowWidth'
import { toggleClientModal } from '../../../../features/modals/modalSlice.js'
import { OPERATION_MODES } from '../../../../constants/modes.js'
import { fbGetTaxReceipt } from '../../../../firebase/taxReceipt/fbGetTaxReceipt.js'
import { selectNcfType, selectTaxReceipt, selectTaxReceiptType } from '../../../../features/taxReceipt/taxReceiptSlice.js'
import { Input, Button as AntButton, Checkbox, Select } from 'antd';
import { selectBusinessData } from '../../../../features/auth/businessSlice.js'
import { clearAuthData } from '../../../../features/insurance/insuranceAuthSlice.js'
import useInsuranceEnabled from '../../../../hooks/useInsuranceEnabled';
import { icons } from '../../../../constants/icons/icons.jsx'

export const ClientControl = () => {
  const dispatch = useDispatch()
  const business = useSelector(selectBusinessData);
  const client = useSelector(selectClient)
  const mode = useSelector(selectClientMode)
  const taxReceipt = useSelector(selectTaxReceipt)
  const taxReceiptSettingEnabled = taxReceipt?.settings?.taxReceiptEnabled;
  const searchTerm = useSelector(selectClientSearchTerm)
  const [inputIcon, setInputIcon] = useState()
  const taxReceiptData = fbGetTaxReceipt()
  const nfcType = useSelector(selectNcfType)
  const insuranceEnabled = useInsuranceEnabled();
  const closeMenu = () => dispatch(setIsOpen(false))
  const setSearchTerm = (e) => dispatch(setClientSearchTerm(e))
  const openAddClientModal = () => dispatch(toggleClientModal({ mode: OPERATION_MODES.CREATE.id, data: null, addClientToCart: true }))
  const openUpdateClientModal = () => dispatch(toggleClientModal({ mode: OPERATION_MODES.UPDATE.id, data: client, addClientToCart: true }))

  const handleDeleteData = () => {
    dispatch(deleteClient())
    dispatch(clearAuthData());
    dispatch(updateInsuranceStatus(false))
  }

  const handleChangeClient = (e) => {
    if (mode === CLIENT_MODE_BAR.SEARCH.id) {
      setSearchTerm(e.target.value)
    }
    if (mode === CLIENT_MODE_BAR.UPDATE.id || mode === CLIENT_MODE_BAR.CREATE.id) {
      dispatch(setClient(updateObject(client, e)))
    }
  }

  const handleInsuranceChange = (e) => {
    const isChecked = e.target.checked;
    dispatch(updateInsuranceStatus(isChecked));
  };

  useEffect(() => {
    switch (mode) {
      case CLIENT_MODE_BAR.SEARCH.id:
        setInputIcon(CLIENT_MODE_BAR.SEARCH.icon)
        setSearchTerm('')
        break;

      case CLIENT_MODE_BAR.UPDATE.id:
        setInputIcon(CLIENT_MODE_BAR.UPDATE.icon)
        closeMenu()
        break;

      case CLIENT_MODE_BAR.CREATE.id:
        setInputIcon(CLIENT_MODE_BAR.CREATE.icon)
        closeMenu()
        break;

      default:
        break;
    }
  }, [mode])

  useEffect(() => { dispatch(setClientInClientCart(client)) }, [client])

  useEffect(() => {
    if (!client?.id) {
      dispatch(updateInsuranceStatus(false))
    }
  }, [client, dispatch])

  const searchClientRef = useRef(null)

  const OpenClientList = () => {
    switch (mode) {
      case CLIENT_MODE_BAR.CREATE.id:
        closeMenu()
        break;
      case CLIENT_MODE_BAR.SEARCH.id:
        dispatch(setIsOpen(true))
        break;
      case CLIENT_MODE_BAR.UPDATE.id:
        dispatch(setIsOpen(true))
        break;

      default:
        break;
    }
  }

  const handleCloseCart = () => dispatch(toggleCart())

  const limitByWindowWidth = useWindowWidth();

  return (
    <Container ref={searchClientRef}>
      <Header>
        <InputWrapper data-client-control-input="true">
          <Input
            prefix={inputIcon}
            placeholder="Buscar cliente..."
            value={mode === CLIENT_MODE_BAR.SEARCH.id ? searchTerm : client.name}
            onChange={(e) => handleChangeClient(e)}
            onClick={OpenClientList}
            style={{ width: '100%' }}
            allowClear
            onClear={handleDeleteData}
            data-client-control-input="true"
          />
          {mode === CLIENT_MODE_BAR.SEARCH.id && (
            <ClientButton
              color='blue'
              variant="solid"
              icon={icons.operationModes.add}
              onClick={openAddClientModal}
              data-client-control-input="true"
            >
              Cliente
            </ClientButton>
          )}

          {mode === CLIENT_MODE_BAR.UPDATE.id && (
            <ClientButton
              type="primary"
              icon={icons.operationModes.edit}
              onClick={openUpdateClientModal}
              data-client-control-input="true"
            >
              Cliente
            </ClientButton>
          )}

          {!limitByWindowWidth && (
            <ClientButton
              onClick={handleCloseCart}
              data-client-control-input="true"
            >
              Volver
            </ClientButton>
          )}
        </InputWrapper>
      </Header>
      <ClientDetails
        mode={mode === CLIENT_MODE_BAR.CREATE.id}
      />

      {
        taxReceiptSettingEnabled && (
          <SelectContainer>
            <Select
              style={{ width: 200 }}
              value={nfcType}
              onChange={(e) => dispatch(selectTaxReceiptType(e))}
            >
              <Select.OptGroup label="Comprobantes Fiscal" >
                {
                  taxReceiptData.taxReceipt
                    .filter(receipt => !receipt.data?.disabled) // Solo mostrar comprobantes activos
                    .map(({ data }, index) => (
                      <Select.Option value={data.name} key={index}>{data.name}</Select.Option>
                    ))
                }
              </Select.OptGroup>
            </Select>
            {
              business?.businessType === 'pharmacy' && (
                <Checkbox
                  onChange={handleInsuranceChange}
                  disabled={!client?.id}
                  checked={insuranceEnabled} // Directly use cart's insurance status
                >
                  Seguro
                </Checkbox>
              )
            }
          </SelectContainer>
        )
      }
    </Container>
  )
}

const Container = styled.div`
    position: relative;
    display: grid;
    gap: 6px;
    margin: 0;
    border: 0;
    width: 100%;
`
const Header = styled.div`
   width: 100%;
   display: flex;
   align-items: center; 
   justify-content: space-between;
   height: 2.75em;
   position: relative;
   z-index: 10;
   background-color: var(--Gray8);
   border-bottom-left-radius: var(--border-radius-light);
   padding: 0.5em;
   
   .ant-input-affix-wrapper {
      border-right: none;
   }
`

const InputWrapper = styled.div`
   display: flex;
   width: 100%;
   
   .ant-input-affix-wrapper {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
   }
`

const ClientButton = styled(AntButton)`
   border-radius: 0;
   height: 32px;
   display: flex;
   align-items: center;
   justify-content: center;
   
   &.ant-btn-primary {
      background-color: #1890ff;
   }
   
   &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
   }
`

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 6px;

  .ant-select {
    width: 200px;
  }

  .ant-select:hover {
    border-color: var(--primary-color);
  }
`