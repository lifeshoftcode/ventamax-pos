import React, { Fragment, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomInput from '../../../../templates/system/Inputs/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { CancelShipping, SelectCartData, SelectSettingCart, selectCart, setCartId, toggleCart, toggleInvoicePanelOpen } from '../../../../../features/cart/cartSlice';
import { useFormatPrice } from '../../../../../hooks/useFormatPrice';
import { Delivery } from './components/Delivery/Delivery';
import { validateInvoiceCart } from '../../../../../utils/invoiceValidation';
import { notification, Modal } from 'antd'
import { AnimatedNumber } from '../../../../templates/system/AnimatedNumber/AnimatedNumber';
import { fbAddPreOrder } from '../../../../../firebase/invoices/fbAddPreocer';
import { selectUser } from '../../../../../features/auth/userSlice';
import { PreorderConfirmation } from './components/Delivery/PreorderConfirmation/PreorderConfirmation';
import { getTotalDiscount } from '../../../../../utils/pricing';
import useInsuranceEnabled from '../../../../../hooks/useInsuranceEnabled';
import { ActionMenu } from './components/ActionMenu/Actionmenu';
import { icons } from '../../../../../constants/icons/icons';
import { handleCancelShipping } from '../InvoicePanel/InvoicePanel';
import { Quotation } from '../../../Quotation/components/Quotation/Quotation';
import { useReactToPrint } from 'react-to-print';
import { addQuotation } from '../../../../../firebase/quotation/quotationService';
import { generateInvoicePDF } from '../../../../../utils/pdf/pdfGenerator';
import { selectBusinessData } from '../../../../../features/auth/businessSlice';

const InvoiceSummary = () => {
  const [isCartValid, setIsCartValid] = useState(false)
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser)
  const [isOpenPreorderConfirmation, setIsOpenPreorderConfirmation] = useState(false)
  const cartData = cart?.data;
  const billingSettings = cart?.settings?.billing;
const business = useSelector(selectBusinessData) || {};
  const total = cartData?.totalPurchase?.value;
  const subTotal = cartData?.totalPurchaseWithoutTaxes?.value;
  const itbis = cartData.totalTaxes.value;
  const discountPercent = cartData.discount.value;
  const quotationPrintRef = useRef();
  const [quotationData, setQuotationData] = useState();
  const discount = getTotalDiscount(subTotal, discountPercent);
  const { billing } = useSelector(SelectSettingCart);

  const dispatch = useDispatch();
  const insuranceEnabled = useInsuranceEnabled();

  useEffect(() => {
    const { isValid } = validateInvoiceCart(cartData);
    setIsCartValid(isValid);
  }, [cartData]);

  const handleInvoicePanelOpen = () => {
    const { isValid, message } = validateInvoiceCart(cartData)
    if (isValid) {
      dispatch(toggleInvoicePanelOpen())
      dispatch(setCartId())
    } else {
      notification.error({
        description: message
      })
    }
  }

  const handlePrint = useReactToPrint({
    content: () => quotationPrintRef.current,
    onAfterPrint: () => {
      Modal.confirm({
        title: '¿Limpiar cotización?',
        content: '¿Desea limpiar los datos de la cotización?',
        okText: 'Limpiar',
        cancelText: 'Mantener',
        onOk: () => {
          handleCancelShipping({ dispatch, closeInvoicePanel: false });
          notification.success({
            message: 'Cotización eliminada',
            description: 'Los datos de la cotización han sido eliminados.',
            duration: 4
          });
        },
        onCancel: () => {
          notification.success({
            message: 'Cotización conservada',
            description: 'Los datos de la cotización se han mantenido.',
            duration: 4
          });
        }
      });
    }
  })

    const handleGeneratePDF = () => {
      generateInvoicePDF({ business, data: cartData });
    };
  

  async function handlePrintQuotation() {
    const data = await addQuotation(user, cartData, billingSettings);
    console.log("data", data);
    setQuotationData(data);
    setTimeout(() => handlePrint(), 1000);
  };

  const handleSavePreOrder = async () => {
    const { isValid, message } = validateInvoiceCart(cartData);
    try {

      await fbAddPreOrder(user, cartData)
      handleCancelShipping()
      setIsOpenPreorderConfirmation(false)
      notification.success({
        message: 'Preorden guardada con éxito',
        type: 'success'
      })
    } catch (error) {
      console.error('Error al guardar la preorden:', error)
    }
  };

  const billingButtons = {
    direct: {
      text: 'Facturar',
      action: handleInvoicePanelOpen,
      // action: handleGeneratePDF,
      disabled: !isCartValid && !billing?.isLoading
    },
    deferred: {
      text: 'Preventa',
      action: () => setIsOpenPreorderConfirmation(true),
      disabled: !isCartValid && !billing?.isLoading
    },
    default: {
      text: 'Sin accion',
      action: undefined,
      disabled: true
    }
  }

  const { text, action, disabled } = billingButtons[billing?.billingMode] || billingButtons.default;

  const menuOptions = [
    billingSettings?.quoteEnabled && {
      text: 'Cotización',
      action: () => handlePrintQuotation(),
      icon: icons.quotation.quote,
      disabled: !isCartValid && !billing?.isLoading
    },
    {
      text: 'Cancelar venta',
      action: () => handleCancelShipping({ dispatch, closeInvoicePanel: false }),
      icon: icons.operationModes.close,
      disabled: !isCartValid && !billing?.isLoading,
    },
  ].filter(Boolean);

  return (
    <Fragment>
      <SummaryContainer>
        <LineItem>
          <Label>SubTotal:</Label>
          <Label>{useFormatPrice(subTotal)}</Label>
        </LineItem>
        <LineItem>
          <Label>ITBIS:</Label>
          <Label>{useFormatPrice(itbis)}</Label>
        </LineItem>
        <Delivery />
        <LineItem>
          <Label>Descuento:</Label>
          <CustomInput
            discount={discount}
            value={discountPercent}
            options={["10", "20", "30", "40", "50"]}
          />
        </LineItem>
        {insuranceEnabled && (
          <LineItem>
            <Label>Diferencia:</Label>
            <Label>{useFormatPrice(subTotal - discount)}</Label>
          </LineItem>
        )}
        <TotalLine>
          <Button
            onClick={action}
            disabled={disabled}
          >
            {text}
          </Button>
          <ActionMenu
            disabled={disabled}
            options={menuOptions}
          />
          <Quotation ref={quotationPrintRef} data={quotationData} />
          <TotalLabel>
            <AnimatedNumber value={useFormatPrice(total)} />
          </TotalLabel>
        </TotalLine>
      </SummaryContainer>
      <PreorderConfirmation
        open={isOpenPreorderConfirmation}
        onCancel={() => setIsOpenPreorderConfirmation(false)}
        onConfirm={handleSavePreOrder}
        preorder={{ data: cartData }}
      />
    </Fragment>
  );
};

export default InvoiceSummary;

const SummaryContainer = styled.div`
  border-radius: 5px;
  padding: 0px 10px;
  position: relative;
`;

export const LineItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
  :first-child {
    border-bottom: 1px solid #ccc;
  }
  :last-child {
    border-top: 1px solid #ccc;
    padding: 0;
  }
 
  align-items: center;
`;

const TotalLine = styled(LineItem)`
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  :disabled {
    background-color: #8a8a8a;
    cursor: not-allowed;
    :hover {
      background-color: #585858;
    }
  }
  :not(:disabled):hover {
    background-color: #0056b3;
  }
`;
const TotalLabel = styled.span`
  font-weight: bold;
  font-size: 1.2em;
  height: 2.4em;
  display: grid;
  align-content: center;
`;
export const Label = styled.span`
  font-weight: 500;
  white-space: nowrap;
  font-size: 14px;
 `