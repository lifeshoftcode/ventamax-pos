import styled from 'styled-components'
// import { SaleReportTable } from '../../../Registro/SaleReportTable/SaleReportTable'
import { ExportInvoice } from './components/Header/ExportInvoice'
import { Drawer } from 'antd'
import { Suspense, useMemo, lazy, memo } from 'react'

const SaleReportTable = lazy(() => import('../../../Registro/SaleReportTable/SaleReportTable'));

const Spinner = () => (
    <div style={{ padding: '2em', textAlign: 'center' }}>Cargando...</div>
)

export const CashupInvoicesOverview = memo(({ invoices = [], isOpen, onClose }) => {
    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            width={'100%'}
            height={'100%'}
            placement="bottom"
            extra={<ExportInvoice invoices={invoices} />}
            styles={{
                header: {
                    paddingBlock: 0,
                },
                body: {
                    padding: 0,
                },
            }}
        >
            <Suspense fallback={<Spinner />}>

                <Container>
                    <SaleReportTable
                        bills={invoices}
                    />
                </Container>
            </Suspense>
        </Drawer>
    )
})
const Container = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr;
    background-color: var(--color2);
`