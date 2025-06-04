import React from 'react'
import { useMatch } from 'react-router-dom'
import styled from 'styled-components'
import { notification } from 'antd'
import routesName from '../../../../../routes/routesName'
import exportToExcel from '../../../../../hooks/exportToExcel/useExportToExcel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faTable } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu } from '../../../system/DropdownMenu/DropdowMenu'
import { formatBill } from '../../../../../hooks/exportToExcel/formatBill'
import { DateTime } from 'luxon'

export const RegistroToolbar = ({ side = 'left', data, searchData, setSearchData }) => {
  const { BILLS } = routesName.SALES_TERM;
  const matchWithCashReconciliation = useMatch(BILLS);
  const invoices = data;
  const currentDate = DateTime.now().toFormat('ddMMyyyy');

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
      return;
    }
    switch (type) {
      case 'Resumen':
        exportToExcel(transformedResumenBillsData(), 'Registros', `resumen_facturas_${currentDate}.xlsx`);
        break;
      case 'Detailed':
        exportToExcel(transformedDetailedBillsData(), 'Registros', `detalle_facturas_${currentDate}.xlsx`);
        break;
      default:
        break;
    }
  };

  const options = [
    {
      text: 'Resumen de Factura',
      description: 'Obtén un resumen consolidado que incluye información general del cliente, totales y métodos de pago.',
      icon: <FontAwesomeIcon icon={faListAlt} />,
      action: () => handleExportButton('Resumen')
    },
    {
      text: 'Detalle de Factura',
      description: 'Accede a un desglose detallado con información de cada producto vendido, categorías, precios y cantidades.',
      icon: <FontAwesomeIcon icon={faTable} />,
      action: () => handleExportButton('Detailed')
    },
  ];
  return (
    matchWithCashReconciliation ? (
      <Container>
        {
          side === 'right' && (
            <DropdownMenu
              title={'Exportar excel'}
              options={options}
            />
          )
        }
      </Container>
    ) : null
  )
}

const Container = styled.div`

`



