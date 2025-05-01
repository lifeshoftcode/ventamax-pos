import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import styled from 'styled-components'
import { DatePicker, Input, InputNumber, Select, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SelectCartData, toggleReceivableStatus } from '../../../../../../../../../features/cart/cartSlice'
import { calculateInvoiceChange } from '../../../../../../../../../utils/invoice';
import { useFormatPrice } from '../../../../../../../../../hooks/useFormatPrice';
import { selectAR, setAR } from '../../../../../../../../../features/accountsReceivable/accountsReceivableSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { calculateAmountPerInstallment } from '../../../../../../../../../utils/accountsReceivable/accountsReceivable';
import usePaymentDates from './usePaymentDates';
import { setNumPrecision } from '../../../../../../../../../utils/pricing';
import { getMaxInstallments } from '../../../../../../../../../utils/accountsReceivable/getMaxInstallments';
import { usePendingBalance } from '../../../../../../../../../firebase/accountsReceivable/fbGetPendingBalance';
import { selectClient } from '../../../../../../../../../features/clientCart/clientCartSlice';
import { selectUser } from '../../../../../../../../../features/auth/userSlice';
import DateUtils from '../../../../../../../../../utils/date/dateUtils';
import PaymentDatesOverview from '../PaymentDatesOverview/PaymentDatesOverbiew';
import { DateTime } from 'luxon';

const { Option } = Select;
const { TextArea } = Input;
const getPositive = (value) => (value < 0 ? -value : value);

const containerVariants = {
  hidden: { opacity: 0, scaleY: 0.1, height: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, scaleY: 1, height: 'auto', transition: { duration: 0.5 } },
};

export const ReceivableManagementPanel = ({
  form,
  creditLimit,
  activeAccountsReceivableCount,
  isWithinCreditLimit,
  isWithinInvoiceCount,
  isChangeNegative,
  receivableStatus
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [userModifiedDate, setUserModifiedDate] = useState(false);
  const [forceRecalculate, setForceRecalculate] = useState(false);
  const [baseCalculationDate, setBaseCalculationDate] = useState(
    DateTime.now().startOf("day").toMillis()
  );

  const {
    paymentFrequency,
    totalInstallments,
    installmentAmount,
    currentBalance,
    paymentDate,
    totalReceivable,
    comments
  } = useSelector(selectAR);

  const cartData = useSelector(SelectCartData);
  const client = useSelector(selectClient);
  const change = useMemo(() => calculateInvoiceChange(cartData), [cartData]);
  const isReceivable = receivableStatus && isChangeNegative;
  const maxInstallments = getMaxInstallments(paymentFrequency);
  const generalBalance = useMemo(() => getPositive(change) + currentBalance, [change, currentBalance]);
  const isInvalidClient = !client.id || client.id === "GC-0000";

  const updatePaymentDateInStore = useCallback(
    (value) => dispatch(setAR({ paymentDate: value })),
    [dispatch]
  );

  const updateARConfig = useCallback((updates) => {
    const newBase = DateTime.now().startOf("day").toMillis();
    setBaseCalculationDate(newBase);
    setUserModifiedDate(false);
    setForceRecalculate(true);
    dispatch(setAR({ ...updates, paymentDate: null }));
    console.log("Base date updated:", new Date(newBase).toLocaleDateString(), updates);
  }, [dispatch]);

  const handleDateChange = useCallback(
    (date) => {
      if (date) {
        const newDateMillis = date.valueOf();
        if (newDateMillis !== paymentDate) {
          console.log("Date manually changed:", date.format('DD/MM/YYYY'));
          setUserModifiedDate(true);
          setForceRecalculate(false);
          updatePaymentDateInStore(newDateMillis);
        }
      } else {
        console.log("Date cleared by user");
        setUserModifiedDate(false);
        updatePaymentDateInStore(null);
        setBaseCalculationDate(DateTime.now().startOf("day").toMillis());
        setForceRecalculate(true);
      }
    },
    [paymentDate, updatePaymentDateInStore]
  );

  const setInstallments = useCallback(
    (value) => {
      const numValue = Number(value) || 1;
      if (numValue !== totalInstallments) {
        console.log('Installments changed:', totalInstallments, '->', numValue);
        updateARConfig({ totalInstallments: numValue });
      } else {
        dispatch(setAR({ totalInstallments: numValue }));
      }
    },
    [dispatch, totalInstallments, updateARConfig]
  );

  const setFrequency = useCallback(
    (value) => {
      if (value !== paymentFrequency) {
        console.log('Frequency changed:', paymentFrequency, '->', value);
        updateARConfig({ paymentFrequency: value });
      } else {
        dispatch(setAR({ paymentFrequency: value }));
      }
    },
    [dispatch, paymentFrequency, updateARConfig]
  );

  const setAmountPerInstallment = useCallback(
    (value) => dispatch(setAR({ installmentAmount: getPositive(setNumPrecision(value)) })),
    [dispatch]
  );
  const setComments = useCallback((value) => dispatch(setAR({ comments: value })), [dispatch]);
  const setCurrentBalance = useCallback((value) => dispatch(setAR({ currentBalance: value })), [dispatch]);
  const setTotalReceivable = useCallback((value) => dispatch(setAR({ totalReceivable: value })), [dispatch]);

  const { paymentDates, nextPaymentDate } = usePaymentDates(
    paymentFrequency,
    totalInstallments,
    userModifiedDate ? paymentDate : baseCalculationDate,
    forceRecalculate
  );

  usePendingBalance(user?.businessID, client?.id, setCurrentBalance);

  useEffect(() => {
    const shouldAutoSet =
      (!userModifiedDate || forceRecalculate) &&
      (!paymentDate || forceRecalculate) &&
      paymentFrequency &&
      totalInstallments > 0 &&
      nextPaymentDate;
    if (shouldAutoSet) {
      if (nextPaymentDate !== paymentDate) {
        console.log(
          `Auto-setting Payment Date (Forced: ${forceRecalculate}):`,
          new Date(nextPaymentDate).toLocaleDateString(),
          `(Base: ${new Date(baseCalculationDate).toLocaleDateString()})`
        );
        updatePaymentDateInStore(nextPaymentDate);
        setUserModifiedDate(false);
        if (forceRecalculate) setForceRecalculate(false);
      } else if (forceRecalculate) {
        setForceRecalculate(false);
        console.log("Force recalculate flag reset (date matched).");
      }
    } else if (forceRecalculate) {
      setForceRecalculate(false);
      console.log("Force recalculate flag reset (conditions not met).");
    }
  }, [
    nextPaymentDate,
    paymentFrequency,
    totalInstallments,
    paymentDate,
    userModifiedDate,
    forceRecalculate,
    baseCalculationDate,
    updatePaymentDateInStore
  ]);

  useEffect(() => {
    const newAmount = calculateAmountPerInstallment(change, totalInstallments);
    const newTotalReceivable = getPositive(change);
    setAmountPerInstallment(newAmount);
    setTotalReceivable(newTotalReceivable);
  }, [change, totalInstallments, setAmountPerInstallment, setTotalReceivable]);

  useEffect(() => {
    if (receivableStatus && (client?.id === "GC-0000" || !client?.id) && isReceivable) {
      dispatch(toggleReceivableStatus(false));
    }
  }, [client?.id, isReceivable, receivableStatus, dispatch]);

  useEffect(() => {
    if (form && paymentDate) {
      form.setFieldsValue({ paymentDate: DateUtils.convertMillisToDayjs(paymentDate) });
    }
  }, [form, paymentDate]);

  useEffect(() => {
    if (form) {
      form.setFieldsValue({ paymentFrequency, totalInstallments });
    }
  }, [form, paymentFrequency, totalInstallments]);

  useEffect(() => {
    if (!baseCalculationDate) {
      const initialBase = DateTime.now().startOf("day").toMillis();
      setBaseCalculationDate(initialBase);
      console.log("Initializing base calculation date:", new Date(initialBase).toLocaleDateString());
    }
  }, [baseCalculationDate]);

  if (!isReceivable || isInvalidClient || !isChangeNegative) return null;

  return (
    <AnimatePresence>
      <PanelContainer
        key="receivable-panel"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
      >
        <Header>
          <Label>Balance pendiente</Label>
          <Label>{useFormatPrice(getPositive(currentBalance))}</Label>
        </Header>
        <Form layout="vertical" form={form}>
          <Group>
            <FormItem
              label="Frecuencia de Pago"
              name="paymentFrequency"
              rules={[{ required: true, message: 'Seleccione una frecuencia de pago' }]}
            >
              <Select value={paymentFrequency} style={{ width: '100%' }} onChange={setFrequency}>
                <Option value="monthly">Mensual</Option>
                <Option value="weekly">Semanal</Option>
              </Select>
            </FormItem>
            <FormItem
              label="Cuotas"
              name="totalInstallments"
              rules={[
                { required: true, message: 'Seleccione el número de cuotas' },
                { type: 'number', min: 1, max: maxInstallments, message: `Cuotas entre 1 y ${maxInstallments}` }
              ]}
            >
              <InputNumber value={totalInstallments} onChange={setInstallments} style={{ width: '100%' }} />
            </FormItem>
          </Group>
          <Group>
            <FormItem
              label="Fecha de Primer Pago"
              name="paymentDate"
              rules={[{ required: true, message: 'Seleccione una fecha de pago' }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                value={paymentDate ? DateUtils.convertMillisToDayjs(paymentDate) : null}
                onChange={handleDateChange}
                disabledDate={(current) =>
                  current && current < DateUtils.convertMillisToDayjs(Date.now()).startOf('day')
                }
              />
            </FormItem>
            <FormItem label="Monto por Cuota">
              <div style={{ fontWeight: 600 }}>
                <span>{useFormatPrice(installmentAmount)}</span>
              </div>
            </FormItem>
          </Group>
          <FormItem label="Comentarios" name="comments">
            <TextArea rows={3} value={comments} onChange={(e) => setComments(e.target.value)} />
          </FormItem>
          {paymentDates.length > 0 && totalInstallments > 0 && (
            <PaymentDatesOverview
              paymentDates={paymentDates}
              nextPaymentDate={nextPaymentDate}
              frequency={paymentFrequency}
              installments={totalInstallments}
            />
          )}
        </Form>
        <Footer>
          <Header>
            <Label>Total a Crédito.</Label>
            <Label>{useFormatPrice(getPositive(change))}</Label>
          </Header>
          <Header>
            <Label>Balance General</Label>
            <Label>{useFormatPrice(getPositive(generalBalance))} / {useFormatPrice(creditLimit?.creditLimit?.value || 0)}</Label>
          </Header>
        </Footer>
      </PanelContainer>
    </AnimatePresence>
  );
};

const PanelContainer = styled(motion.div)`
  padding: 6px 12px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  padding: 0.2em 0;
  display: flex;
  justify-content: space-between;
`;

const Footer = styled.div`
  :nth-child(n) {
    div {
      border-bottom: 1px solid #ccc;
      :last-child {
        border-bottom: 0;
      }
    }
  }
`;

const Label = styled.span`
  color: #333;
  font-weight: 600;
  font-size: 1.1em;
  display: block;
  margin-bottom: 5px;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 15px;
`;

const Group = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr 0.8fr;
`;
