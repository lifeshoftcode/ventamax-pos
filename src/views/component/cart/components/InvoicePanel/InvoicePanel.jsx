import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Body } from './components/Body/Body'
import { Button, notification, Spin, Form, Modal as AntdModal, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart, SelectCartData, SelectSettingCart, toggleCart, toggleInvoicePanel, toggleInvoicePanelOpen, setPaymentMethod, recalcTotals } from '../../../../../features/cart/cartSlice'
import { processInvoice } from '../../../../../services/invoice/invoiceService'
import { selectUser } from '../../../../../features/auth/userSlice'
import { deleteClient, selectClient } from '../../../../../features/clientCart/clientCartSlice'
import { selectAR } from '../../../../../features/accountsReceivable/accountsReceivableSlice'
import { clearTaxReceiptData, selectNcfType, selectTaxReceipt } from '../../../../../features/taxReceipt/taxReceiptSlice'
import { useReactToPrint } from 'react-to-print'
import useViewportWidth from '../../../../../hooks/windows/useViewportWidth'
import DateUtils from '../../../../../utils/date/dateUtils'
import { Invoice } from '../../../Invoice/components/Invoice/Invoice'
import dayjs from 'dayjs'
import useInsuranceEnabled from '../../../../../hooks/useInsuranceEnabled'
import { selectInsuranceAR } from '../../../../../features/insurance/insuranceAccountsReceivableSlice'
import { selectInsuranceAuthData, clearAuthData } from '../../../../../features/insurance/insuranceAuthSlice'
import useInvoice from '../../../../../services/invoice/useInvoice'
import { selectBusinessData } from '../../../../../features/auth/businessSlice'
import { downloadInvoiceLetterPdf } from '../../../../../firebase/quotation/downloadQuotationPDF'

export const modalStyles = {
    mask: {
        backdropFilter: 'blur(2px)',
        display: 'grid',
        overflow: 'hidden'
    },
    content: {
        padding: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        overflowY: 'hidden',
        display: 'grid',
    },
    body: {
        margin: 0,
        padding: '1em',
        overflowY: 'auto'
    }
}

const calculateDueDate = (duePeriod, hasDueDate) => {
    if (!hasDueDate) return null;

    const currentDate = dayjs();
    return currentDate
        .add(duePeriod.months || 0, 'month')
        .add(duePeriod.weeks || 0, 'week')
        .add(duePeriod.days || 0, 'day');
}

export const handleCancelShipping = ({ dispatch, viewport, closeInvoicePanel = true }) => {
    if (dispatch === undefined) return;
    if (viewport !== undefined && viewport <= 800) dispatch(toggleCart());
    if (closeInvoicePanel) dispatch(toggleInvoicePanel());
    dispatch(resetCart());
    dispatch(clearTaxReceiptData());
    dispatch(deleteClient());
    dispatch(clearAuthData());
};

export const InvoicePanel = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [invoice, setInvoice] = useState({})
    const [submitted, setSubmitted] = useState(false);

    const { processInvoice: runInvoice } = useInvoice();

    const [loading, setLoading] = useState({
        status: false,
        message: ''
    })

    const viewport = useViewportWidth();
    const handleInvoicePanel = () => dispatch(toggleInvoicePanelOpen())
    const cart = useSelector(SelectCartData)
    const cartSettings = useSelector(SelectSettingCart)
    const invoicePanel = cartSettings.isInvoicePanelOpen;
    const shouldPrintInvoice = cartSettings.printInvoice;
    const { duePeriod, hasDueDate } = cartSettings?.billing;
    const componentToPrintRef = useRef();
    const user = useSelector(selectUser)
    const client = useSelector(selectClient)
    const ncfType = useSelector(selectNcfType);
    const accountsReceivable = useSelector(selectAR)
    const { settings: { taxReceiptEnabled } } = useSelector(selectTaxReceipt);
    const total = cart?.payment?.value;
    const isAddedToReceivables = cart?.isAddedToReceivables;
    const business = useSelector(selectBusinessData) || {};
    const insuranceEnabled = useInsuranceEnabled();
    const change = cart?.change?.value;
    const isChangeNegative = change < 0;
    const insuranceAR = useSelector(selectInsuranceAR);
    const insuranceAuth = useSelector(selectInsuranceAuthData) || null;
    const invoiceType = cartSettings.billing.invoiceType;

    //function para despues de imprimir la factura
    const handleAfterPrint = () => {
        setInvoice({});
        handleCancelShipping({ dispatch, viewport });
        notification.success({
            message: 'Venta Procesada',
            description: 'La venta ha sido procesada con éxito',
            duration: 4
        })
        setLoading({ status: false, message: '' });
        setSubmitted(true)
    }


    const handlePrint = useReactToPrint({
        content: () => componentToPrintRef.current,
        onAfterPrint: () => handleAfterPrint(),
    })

    // Reinstate the showCancelSaleConfirm function
    const showCancelSaleConfirm = () => {
        AntdModal.confirm({ // Use AntdModal directly to avoid conflict with styled Modal
            title: '¿Cancelar Venta?',
            content: 'Si cancelas, se perderán los datos de la venta actual.',
            okText: 'Cerrar y Volver',
            zIndex: 999999999999,
            okType: 'danger',
            cancelText: 'Atrás',
            onOk() {
                message.success('Venta cancelada', 2.5)
                handleCancelShipping({ dispatch, viewport })
            },
            onCancel() {
                message.info('Continuando con la venta', 2.5)
            },
        });
    };

    const handleInvoicePriting = async (invoice) => {
        if (invoiceType === 'template2') {
            try {
                await downloadInvoiceLetterPdf(business, invoice, handleAfterPrint);
            } catch (e) {
                notification.error({
                    message: 'Error al imprimir',
                    description: 'No se pudo generar el PDF de la factura',
                    duration: 4
                });
                console.error('PDF generation failed', error);
            }
        } else {
            setTimeout(() => handlePrint(), 1000);
        }
    }

    async function handleSubmit() {
        try {
            setLoading({ status: true, message: '' })
            if (cart?.isAddedToReceivables) {
                await form.validateFields()
            }

            const dueDate = calculateDueDate(duePeriod, hasDueDate);

            // Extract all comments from products and join them for the invoice
            const invoiceComment = cart?.products
                ?.filter(product => product.comment)
                ?.map(product => `${product.name}: ${product.comment}`)
                ?.join('; ');

            const { invoice } = await processInvoice({
                cart,
                user,
                client,
                accountsReceivable,
                taxReceiptEnabled,
                ncfType,
                setLoading,
                dispatch,
                dueDate: dueDate?.valueOf(), // Convert to milliseconds
                insuranceEnabled: insuranceEnabled,
                insuranceAR: insuranceAR,
                insuranceAuth,
                invoiceComment, // Add comments from products to the invoice
            })

            // const invoice = await runInvoice({
            //     cart,
            //     user,
            //     client,
            //     accountsReceivable,
            //     taxReceiptEnabled,
            //     ncfType,
            //     dueDate: dueDate?.valueOf(), // Convert to milliseconds
            //     insuranceEnabled,
            //     insuranceAR,
            //     insuranceAuth,
            // })

            if (shouldPrintInvoice) {
                setInvoice(invoice);
                await handleInvoicePriting(invoice);
            }
            if (!shouldPrintInvoice) {
                setInvoice({});
                handleAfterPrint();
            }

        } catch (error) {
            notification.error({
                message: 'Error de Proceso',
                description: error.message,
                duration: 4
            })
            setLoading({ status: false, message: '' })
            setSubmitted(false)
            console.error('Error processing invoice:', error)
        } 
    }

    // const installments = generateInstallments({ ar: accountsReceivable, user })

    useEffect(() => {
        form.setFieldsValue({
            frequency: 'monthly',
            totalInstallments: 1,
            paymentDate: DateUtils.convertMillisToDayjs(Date.now()),
        });
    }, []);
    useEffect(() => {
        form.setFieldsValue({
            ...accountsReceivable,
            paymentDate: DateUtils.convertMillisToDayjs(accountsReceivable?.paymentDate),
        });
    }, [accountsReceivable]);
    useEffect(() => {
        if (!invoicePanel) {
            setSubmitted(false);
        }
    }, [invoicePanel]);    // Efecto para inicializar el método de pago cuando se abre el panel
    useEffect(() => {
        // Solo se ejecuta cuando se abre el panel de factura, no en cada actualización
        if (invoicePanel) {
            // Verificar si algún método de pago tiene un valor establecido
            const totalPaymentValue = cart?.paymentMethod?.reduce((total, method) => {
                return method.status ? total + (Number(method.value) || 0) : total;
            }, 0);

            // Obtenemos el valor de totalPurchase en lugar de payment para inicializar
            const purchaseTotal = cart?.totalPurchase?.value || 0;

            // Si ningún método de pago tiene valor, establece el método de pago predeterminado (efectivo)
            if (totalPaymentValue === 0 && purchaseTotal > 0) {
                const cashMethod = cart?.paymentMethod?.find(method => method.method === 'cash');
                if (cashMethod) {
                    // Solo establece el estado una vez, cuando se abre el panel
                    dispatch(setPaymentMethod({
                        ...cashMethod,
                        status: true,
                        value: purchaseTotal
                    }));
                    // No llamamos a recalcTotals ya que el middleware lo hará por nosotros
                }
            }
        }
    }, [invoicePanel]); // Solo depende de si el panel está abierto o cerrado

    return (
        <Modal
            style={{ top: 10 }}
            open={invoicePanel}
            title='Pago de Factura'
            onCancel={handleInvoicePanel} // This handles closing via 'X' or outside click
            styles={modalStyles}
            footer={
                [<Button
                    key="cancel"
                    type='default'
                    danger
                    disabled={loading.status || submitted}
                    onClick={showCancelSaleConfirm} // Use confirmation modal
                >
                    Cancelar
                </Button>,
                <Button
                    key="close"
                    type='default'
                    disabled={loading.status || submitted}
                    onClick={handleInvoicePanel} // Simply close the modal
                >
                    Cerrar
                </Button>,
                <Button
                    key="submit"
                    type='primary'
                    loading={loading.status}
                    disabled={(isChangeNegative && !isAddedToReceivables) || submitted}
                    onClick={handleSubmit}
                >
                    Facturar
                </Button>
                ]
            }
        >
            <Invoice ref={componentToPrintRef} data={invoice} />
            <Spin
                spinning={loading.status}
            >
                <Body
                    form={form}
                />
            </Spin>
        </Modal>
    )
}

export const Modal = styled(AntdModal)`
    .ant-modal-content{
    }
    .ant-modal-header{
        padding: 1em 1em 0;
    }
    .ant-modal-body{
        padding: 1em ;
        /* overflow-y: scroll;    */
    }
    .ant-modal-footer{
        padding: 0 1em 1em;
    }
    padding: 0;

`