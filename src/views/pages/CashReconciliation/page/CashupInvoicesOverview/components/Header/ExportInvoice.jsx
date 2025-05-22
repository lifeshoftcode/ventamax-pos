import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { formatBill } from '../../../../../../../hooks/exportToExcel/formatBill'
import exportToExcel from '../../../../../../../hooks/exportToExcel/useExportToExcel'
import { notification } from 'antd'
import { icons } from '../../../../../../../constants/icons/icons'
import { Button, Dropdown, Menu } from 'antd'

export const ExportInvoice = ({ invoices = [] }) => {
    const transformedResumenBillsData = () => invoices.map((invoice) => {
        return formatBill({ data: invoice.data, type: 'Resumen' });
    });

    const transformedDetailedBillsData = () => {
        return formatBill({ data: invoices, type: 'Detailed' });
    };

    const handleExportButton = (type) => {
        if (invoices.length === 0) {
            notification.error({
                message: 'Error al exportar',
                description: 'No hay Facturas para exportar'
            });
            return
        }
        switch (type) {
            case 'Resumen':
                exportToExcel(transformedResumenBillsData(), 'Registros', 'Registro.xlsx');
                break;
            case 'Detailed':
                exportToExcel(transformedDetailedBillsData(), 'Registros', 'Registro.xlsx');
                break;
            default:
                break;
        }
    };

    const items = [
        {
            key: 'detailed',
            label: 'Exportar Detalle',
            onClick: () => handleExportButton('Detailed'),
        },
        {
            key: 'resumen',
            label: 'Exportar Resumen',
            onClick: () => handleExportButton('Resumen'),
        },
    ];


    return (
        <Container>
            <Group>
                <Dropdown menu={{items}} placement="bottomRight">
                    <Button icon={icons.arrows.chevronDown}>Exportar</Button>
                </Dropdown>
            </Group>
        </Container>
    )
}
const Container = styled.div`
    max-width: 1300px;
    width: 100%;
    height: 3em;
    display: flex;
    align-items: center;
    margin: 0 auto;
    gap: 1em;
    justify-content: space-between;
`
const Group = styled.div`   
    display: flex;
    align-items: center;
    gap: 1em;
`