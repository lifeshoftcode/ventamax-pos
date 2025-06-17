import { motion } from 'framer-motion'
import { Fragment, useEffect, useState, Suspense, lazy } from 'react'
import styled from 'styled-components'
import { MenuApp } from '../..'
import { getDateRange } from '../../../utils/date/getDateRange'
import { FilterBar } from './components/FilterBar/FilterBar'
import { useAccountsReceivablePaymentReceipts } from '../../../firebase/accountsReceivable/paymentReceipt/useAccountsReceivablePaymentReceipts'

const SaleReportTable = lazy(() => import('./SaleReportTable/SaleReportTable'));

export const ReceivablePaymentReceipt = () => {
  const [datesSelected, setDatesSelected] = useState(getDateRange('today'));

  const {loading, paymentReceipts} = useAccountsReceivablePaymentReceipts(datesSelected);

  const [isReportSaleOpen, setIsReportSaleOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [processedInvoices, setProcessedInvoices] = useState(paymentReceipts || []);

  const onReportSaleOpen = () => setIsReportSaleOpen(!isReportSaleOpen);

  useEffect(() => {
    setProcessedInvoices(paymentReceipts);
  }, [paymentReceipts]);

  return (
    <Fragment>
      <Container
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 0 }}
      >
        <MenuApp
          displayName='Recibos de Pagos por Cobrar'
          data={paymentReceipts}
          searchData={searchTerm}
          setSearchData={setSearchTerm}
        />
        <FilterBar
          invoices={paymentReceipts}
          processedInvoices={processedInvoices}
          setProcessedInvoices={setProcessedInvoices}
          datesSelected={datesSelected}
          setDatesSelected={setDatesSelected}
          onReportSaleOpen={onReportSaleOpen}
        />        <Suspense fallback={<div style={{ padding: '2em', textAlign: 'center' }}>Cargando...</div>}>
          <SaleReportTable
            bills={processedInvoices}
            searchTerm={searchTerm}
            loading={loading}
          />
        </Suspense>
      </Container>
    </Fragment>
  )
}
const Container = styled(motion.div)`
  max-height: calc(100vh);
  height: 100vh;
  overflow: hidden;
  display: grid;
  background-color: var(--color2);
  grid-template-rows: min-content min-content 1fr;
  box-sizing: border-box;
`





