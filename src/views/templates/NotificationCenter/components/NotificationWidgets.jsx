import React from 'react';
import styled from 'styled-components';
import FiscalReceiptsWidget from './FiscalReceiptsWidget';

/**
 * Componente que muestra todos los widgets de notificaciones
 * Recibe los datos de las notificaciones y renderiza cada widget
 */
const NotificationWidgets = ({ data }) => {
  const { fiscalReceipts, inventory, sales, system } = data;
  
  return (
    <WidgetsContainer>
      <WidgetGrid>
        <FiscalReceiptsWidget data={fiscalReceipts} />
      </WidgetGrid>
    </WidgetsContainer>
  );
};

const WidgetsContainer = styled.div`
  padding: var(--space-4);
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  
  /* Media query para pantallas más grandes */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default NotificationWidgets;
