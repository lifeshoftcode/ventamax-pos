import React, { useState } from 'react'
import { useMatch } from 'react-router-dom'
import styled from 'styled-components'
import { message } from 'antd'
import routesName from '../../../../../routes/routesName'
import exportToExcel from '../../../../../hooks/exportToExcel/useExportToExcel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt, faTable, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { DropdownMenu } from '../../../system/DropdownMenu/DropdowMenu'
import { formatBill } from '../../../../../hooks/exportToExcel/formatBill'
import { DateTime } from 'luxon'
import { getBillExportCallback, createProfessionalReportCallback } from '../../../../../hooks/exportToExcel/exportConfig'

export const RegistroToolbar = ({ side = 'left', data, searchData, setSearchData }) => {
  const [isExporting, setIsExporting] = useState(false)
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
  const handleExportButton = async (type) => {
    if (invoices.length === 0) {
      message.error('No hay Facturas para exportar');
      return;
    }

    setIsExporting(true);

    try {
      // Delay mínimo para mostrar el loading
      const exportPromise = (async () => {
        switch (type) {
          case 'Resumen':
            const resumenCallback = createProfessionalReportCallback(
              'Resumen', 
              'REPORTE DE FACTURACIÓN - RESUMEN'
            );
            await exportToExcel(
              transformedResumenBillsData(),
              'Resumen de Facturas',
              `resumen_facturas_${currentDate}.xlsx`,
              resumenCallback
            );
            return 'El reporte resumen se ha generado correctamente';
          case 'Detailed':
            const detailedCallback = createProfessionalReportCallback(
              'Detailed', 
              'REPORTE DE FACTURACIÓN - DETALLE POR PRODUCTO'
            );
            await exportToExcel(
              transformedDetailedBillsData(),
              'Detalle de Facturas',
              `detalle_facturas_${currentDate}.xlsx`,
              detailedCallback
            );
            return 'El reporte detallado se ha generado correctamente';
          default:
            return 'Exportación completada';
        }
      })();      // Asegurar un delay mínimo de 1 segundo para ver el loading
      const [result] = await Promise.all([
        exportPromise,
        new Promise(resolve => setTimeout(resolve, 1000))
      ]);

      message.success(result);
    } catch (error) {
      console.error('Error al exportar:', error);
      message.error('Hubo un problema al generar el archivo Excel. Inténtelo nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };  const options = [
    {
      text: isExporting ? 'Generando resumen...' : 'Resumen de Factura',
      description: 'Obtén un resumen consolidado que incluye información general del cliente, totales y métodos de pago.',
      icon: isExporting ? (
        <SpinningIcon icon={faSpinner} />
      ) : (
        <FontAwesomeIcon icon={faListAlt} />
      ),
      action: () => handleExportButton('Resumen'),
      disabled: isExporting
    },
    {
      text: isExporting ? 'Generando detalle...' : 'Detalle de Factura',
      description: 'Accede a un desglose detallado con información de cada producto vendido, categorías, precios y cantidades.',
      icon: isExporting ? (
        <SpinningIcon icon={faSpinner} />
      ) : (
        <FontAwesomeIcon icon={faTable} />
      ),
      action: () => handleExportButton('Detailed'),
      disabled: isExporting
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
  
`;

const SpinningIcon = styled(FontAwesomeIcon)`
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;



