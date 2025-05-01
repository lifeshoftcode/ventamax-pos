import React, { Fragment, useRef, useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import CustomInput from '../../../../templates/system/Inputs/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { SelectCartData, SelectSettingCart, selectCart, setCartId, toggleInvoicePanelOpen } from '../../../../../features/cart/cartSlice';
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
import useInsuranceFormComplete from '../../../../../hooks/useInsuranceFormComplete';
import { ActionMenu } from './components/ActionMenu/Actionmenu';
import { icons } from '../../../../../constants/icons/icons';
import { handleCancelShipping } from '../InvoicePanel/InvoicePanel';
import { Quotation } from '../../../Quotation/components/Quotation/Quotation';
import { useReactToPrint } from 'react-to-print';
import { addQuotation } from '../../../../../firebase/quotation/quotationService';
import { generateInvoicePDF } from '../../../../../utils/pdf/pdfGenerator';
import { selectBusinessData } from '../../../../../features/auth/businessSlice';
import WarningPill from './components/WarningPill/WarningPill';
import { downloadQuotationPdf } from '../../../../../firebase/quotation/downloadQuotationPDF';

const InvoiceSummary = () => {
  const [isCartValid, setIsCartValid] = useState(false);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [isOpenPreorderConfirmation, setIsOpenPreorderConfirmation] = useState(false);
  const cartData = useSelector(SelectCartData);
  const insuranceExtra = cartData?.totalInsurance?.value || 0;
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
  // Usamos el hook para validar el formulario de seguro
  const { shouldDisableButton: insuranceFormIncomplete } = useInsuranceFormComplete();

  // Función mejorada para validar la cobertura de seguro en los productos
  const validateInsuranceCoverage = useMemo(() => {
    // Si el seguro no está habilitado, no es necesario validar
    if (!insuranceEnabled) return { isValid: true, message: null };

    const products = cartData?.products || [];

    // Verificar si al menos un producto tiene cobertura configurada
    const productsWithCoverage = products.filter(product => {
      const insurance = product?.insurance || {};
      return insurance.mode && insurance.value > 0;
    });

    // Si no hay productos con cobertura y el seguro está habilitado, mostrar advertencia
    if (productsWithCoverage.length === 0) {
      return {
        isValid: false,
        message: "Al menos un producto debe tener cobertura de seguro configurada",
      };
    }

    // Verificar productos que deberían tener seguro pero no lo tienen configurado correctamente
    const medicineCategories = ['medicamento', 'medicina', 'farmacia', 'recetado'];
    const productsThatShouldHaveInsurance = products.filter(product => {
      // Verificar si el producto pertenece a categoría de medicamentos
      const categoryMatch = product?.category &&
        medicineCategories.some(cat =>
          product.category.toLowerCase().includes(cat)
        );

      // Verificar si el producto está marcado para seguro
      const isMarkedForInsurance = product?.requiresInsurance === true;

      return (categoryMatch || isMarkedForInsurance);
    });

    // De los productos que deberían tener seguro, verificar cuáles no tienen configuración adecuada
    const invalidProducts = productsThatShouldHaveInsurance.filter(product => {
      const insurance = product?.insurance || {};
      return !insurance.mode || insurance.value <= 0;
    });

    if (invalidProducts.length > 0) {
      const productNames = invalidProducts.map(p => p.productName || 'Producto sin nombre').join(', ');
      return {
        isValid: false,
        message: `Los siguientes productos requieren configuración de seguro: ${productNames}`,
        invalidProducts
      };
    }    // Verificar si hay productos con cobertura mal configurada
    const productsWithInvalidCoverage = products.filter(product => {
      const insurance = product?.insurance || {};

      // Si no hay modo de seguro configurado, no validamos
      if (!insurance.mode) return false;

      // Si el valor es menor o igual a 0, siempre es inválido
      if (insurance.value <= 0) return true;

      // Para modo de porcentaje, el valor debe estar entre 1 y 100
      if (insurance.mode === 'porcentaje' && (insurance.value < 1 || insurance.value > 100)) {
        return true;
      }

      // Para modo de monto, el valor debe ser menor al precio del producto
      if (insurance.mode === 'monto' && insurance.value > product.pricing?.price) {
        return true;
      }

      return false;
    });

    if (productsWithInvalidCoverage.length > 0) {
      const productNames = productsWithInvalidCoverage.map(p => p.productName || 'Producto sin nombre').join(', ');
      return {
        isValid: false,
        message: `Valor de cobertura inválido en: ${productNames}`,
        invalidProducts: productsWithInvalidCoverage
      };
    }

    return { isValid: true, message: null };
  }, [cartData?.products, insuranceEnabled]);

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

  async function handlePrintQuotation() {
    
    const data = await addQuotation(user, cartData, billingSettings);
    console.log("data", data);
    setQuotationData(data);
    setTimeout(() => handlePrint(), 1000);
  };
  async function handleDownloadQuotation() {
        const data = await addQuotation(user, cartData, billingSettings);
    await downloadQuotationPdf(business, data);
    setTimeout(() => {
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
    }, 1000);
  }

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

  // Calculamos si el botón debe estar deshabilitado combinando las validaciones
  const isButtonDisabled = !isCartValid || insuranceFormIncomplete || !validateInsuranceCoverage.isValid;

  // Mensaje de advertencia que incluye ambas validaciones con información más detallada
  const warningMessage = useMemo(() => {
    if (insuranceFormIncomplete) {
      return "Complete todos los datos del formulario de autorización de seguro para continuar.";
    }
    if (!validateInsuranceCoverage.isValid) {
      return validateInsuranceCoverage.message;
    }
    return null;
  }, [insuranceFormIncomplete, validateInsuranceCoverage]);

  const billingButtons = {
    direct: {
      text: 'Facturar',
      action: handleInvoicePanelOpen,
      disabled: isButtonDisabled
    },
    deferred: {
      text: 'Preventa',
      action: () => setIsOpenPreorderConfirmation(true),
      disabled: isButtonDisabled
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
      // action: handlePrintQuotation,
      action: handleDownloadQuotation,
      icon: icons.quotation.quote,
      disabled: isButtonDisabled
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
            <Label>Cobertura:</Label>
            <Label>{useFormatPrice(insuranceExtra)}</Label>
          </LineItem>
        )}
        {warningMessage && <WarningPill message={warningMessage} />}
        <TotalLine>
          <Button
            onClick={action}
            disabled={disabled}
            title={warningMessage || ""}
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