import { motion } from 'framer-motion'
import { Fragment, useEffect, useState, Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { MenuApp } from '../..'
import { selectUser } from '../../../features/auth/userSlice'
import { fbGetInvoices } from '../../../firebase/invoices/fbGetInvoices'
import useViewportWidth from '../../../hooks/windows/useViewportWidth'
import { getDateRange } from '../../../utils/date/getDateRange'
import SalesReport from './ReportsSale/ReportsSale'
import { SaleRecordList } from './SaleRecordList/RecordList'
import { FilterBar } from './components/FilterBar/FilterBar'

const SaleReportTable = lazy(() => import('./SaleReportTable/SaleReportTable'));

export const InvoicesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isReportSaleOpen, setIsReportSaleOpen] = useState(false);
  const [datesSelected, setDatesSelected] = useState(getDateRange('today'));
  const [searchTerm, setSearchTerm] = useState('');
  const { invoices } = fbGetInvoices(datesSelected);

  const [processedInvoices, setProcessedInvoices] = useState(invoices);
  const onReportSaleOpen = () => setIsReportSaleOpen(!isReportSaleOpen);
  useEffect(() => {
    setProcessedInvoices([...invoices]);
  }, [invoices]);
  const vw = useViewportWidth()

  return (
    <Fragment>
      <Container
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 0 }}
      >
        <MenuApp
          displayName='Facturas'
          data={invoices}
          searchData={searchTerm}
          setSearchData={setSearchTerm}
        />
        <FilterBar
          invoices={invoices}
          processedInvoices={processedInvoices}
          setProcessedInvoices={setProcessedInvoices}
          datesSelected={datesSelected}
          setDatesSelected={setDatesSelected}
          onReportSaleOpen={onReportSaleOpen}
        />        {
          vw > 900 ? (
            <Suspense fallback={<div style={{ padding: '2em', textAlign: 'center' }}>Cargando...</div>}>
              <SaleReportTable
                bills={processedInvoices}
                searchTerm={searchTerm}
              />
            </Suspense>
          ) : (
            <SaleRecordList
              invoices={processedInvoices}
              searchTerm={searchTerm}
            />
          )
        }
      </Container>
      <SalesReport isOpen={isReportSaleOpen} onOpen={onReportSaleOpen} sales={invoices} />
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





