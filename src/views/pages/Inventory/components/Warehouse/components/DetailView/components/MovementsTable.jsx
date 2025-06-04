import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../../../features/auth/userSlice';
import { useListenMovementsByLocation } from '../../../../../../../../firebase/warehouse/productMovementService';
import { useNavigate } from 'react-router-dom';
import { AdvancedTable } from '../../../../../../../templates/system/AdvancedTable/AdvancedTable';
import { MovementReason } from '../../../../../../../../models/Warehouse/Movement';

const StyledCard = styled.div`
  margin-top: 16px;
  display: grid;
  min-height: 300px;
`;

const LocationCell = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ isEntry }) =>
    isEntry
      ? 'rgba(76, 175, 80, 0.08)'   // Verde más natural y familiar (como éxito)
      : 'rgba(239, 83, 80, 0.08)'}; // Rojo más suave y familiar (como acción)
  border-radius: 8px;
  border: 1px solid ${({ isEntry }) =>
    isEntry
      ? 'rgba(76, 175, 80, 0.25)'   // Verde institucional
      : 'rgba(239, 83, 80, 0.25)'}; // Rojo institucional
  opacity: ${({ isExternal }) => isExternal ? 0.85 : 1};
  ${({ isExternal }) => isExternal && `
    background: #f5f5f5;
    border: 1px dashed #bdbdbd;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}
  
  &:hover {
    transform: translateY(-1px);
    background: ${({ isEntry }) =>
      isEntry
        ? 'rgba(76, 175, 80, 0.15)'
        : 'rgba(239, 83, 80, 0.15)'};
    box-shadow: 0 2px 8px ${({ isEntry }) =>
      isEntry
        ? 'rgba(76, 175, 80, 0.2)'
        : 'rgba(239, 83, 80, 0.2)'};
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LocationName = styled.div`
  font-weight: 600;
  color: ${({ isEntry }) => (isEntry ? '#2E7D32' : '#C62828')};
  font-size: 1em;
  white-space: nowrap;
  letter-spacing: -0.3px;
`;

const DirectionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DirectionArrow = styled.span`
  font-size: 1.1em;
  color: ${({ isEntry }) => (isEntry ? '#2E7D32' : '#C62828')};
  font-weight: bold;
`;

const DirectionLabel = styled.span`
  color: ${({ isEntry }) => (isEntry ? '#2E7D32' : '#C62828')};
  font-size: 0.85em;
  font-weight: 500;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DirectionIndicator = styled.span`
  color: #8E8E93;
  font-size: 0.85em;
  font-weight: 500;
  letter-spacing: -0.2px;
  background: #F2F2F7;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 4px;
`;

const MovementTypeBadge = styled.span`
  background: ${({ isEntry }) =>
    isEntry
      ? 'rgba(33, 150, 243, 0.1)'    // Azul corporativo (confianza y profesionalismo)
      : 'rgba(156, 39, 176, 0.1)'};  // Púrpura (calidad y dignidad)
  color: ${({ isEntry }) => (isEntry ? '#1976D2' : '#7B1FA2')};
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9em;
  letter-spacing: -0.2px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ isEntry }) =>
      isEntry
        ? 'rgba(33, 150, 243, 0.15)'
        : 'rgba(156, 39, 176, 0.15)'};
  }
`;

const ReasonBadge = styled.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.85em;
  font-weight: 500;
  white-space: nowrap;
  
  ${({ reasonType }) => {
    switch (reasonType) {
      case MovementReason.Purchase:
        return `
          background: rgba(25, 118, 210, 0.1);
          color: #1976D2;
          border: 1px solid rgba(25, 118, 210, 0.2);
        `;
      case MovementReason.Sale:
        return `
          background: rgba(76, 175, 80, 0.1);
          color: #388E3C;
          border: 1px solid rgba(76, 175, 80, 0.2);
        `;
      case 'adjustment':
        return `
          background: rgba(255, 152, 0, 0.1);
          color: #F57C00;
          border: 1px solid rgba(255, 152, 0.2);
        `;
      case 'return':
        return `
          background: rgba(156, 39, 176, 0.1);
          color: #7B1FA2;
          border: 1px solid rgba(156, 39, 176, 0.2);
        `;
      case 'initial_stock':
        return `
          background: rgba(0, 150, 136, 0.1);
          color: #00796B;
          border: 1px solid rgba(0, 150, 136, 0.2);
        `;
      case 'transfer':
        return `
          background: rgba(121, 134, 203, 0.1);
          color: #5C6BC0;
          border: 1px solid rgba(121, 134, 203, 0.2);
        `;
      case 'damaged':
        return `
          background: rgba(244, 67, 54, 0.1);
          color: #D32F2F;
          border: 1px solid rgba(244, 67, 54, 0.2);
        `;
      case 'expired':
        return `
          background: rgba(121, 85, 72, 0.1);
          color: #5D4037;
          border: 1px solid rgba(121, 85, 72, 0.2);
        `;
      case 'lost':
        return `
          background: rgba(96, 125, 139, 0.1);
          color: #455A64;
          border: 1px solid rgba(96, 125, 139, 0.2);
        `;
      default:
        return `
          background: rgba(158, 158, 158, 0.1);
          color: #757575;
          border: 1px solid rgba(158, 158, 158, 0.2);
        `;
    }
  }}
`;

// Add this helper function before generateRoute
const getExternalLocationText = (movement) => {
  // Para casos especiales que no tienen ubicación de origen/destino
  const specialCases = ['damaged', 'expired', 'lost', 'other'];
  if (specialCases.includes(movement.movementReason)) {
    return 'Baja de Inventario';
  }

  switch (movement.movementReason) {
    case 'purchase':
      return 'Proveedor Externo';
    case 'sale':
      return 'Cliente';
    case 'return':
      return movement.movementType === 'in' ? 'Devolución Cliente' : 'Devolución Proveedor';
    case 'initial_stock':
      return 'Inventario Inicial';
    case 'adjustment':
      return 'Ajuste de Inventario';
    default:
      return movement.movementType === 'in' ? 'Origen Externo' : 'Destino Externo';
  }
};

const getLocationDisplay = (movement) => {
  // Para casos especiales que no tienen ubicación de origen/destino
  const specialCases = ['damaged', 'expired', 'lost', 'other'];
  if (specialCases.includes(movement.movementReason)) {
    return 'Baja de Inventario';
  }

  const isEntry = movement.movementType === 'in';
  const locationName = isEntry ? movement.sourceLocationName : movement.destinationLocationName;
  const location = isEntry ? movement.sourceLocation : movement.destinationLocation;

  if (!location || !locationName) {
    return getExternalLocationText(movement);
  }

  return locationName;
};

const formatMovementReason = (reason) => {
  const reasonMap = {
    'purchase': 'Compra',
    'sale': 'Venta',
    'adjustment': 'Ajuste',
    'return': 'Devolución',
    'initial_stock': 'Stock Inicial',
    'transfer': 'Transferencia',
    'damaged': 'Dañado',
    'expired': 'Expirado',
    'lost': 'Perdido',
    'other': 'Otro'
  };
  return reasonMap[reason] || 'Desconocido';
};

// Update helper function to build route dynamically
const generateRoute = (isEntry, location) => {
  const loc = isEntry ? location.sourceLocation : location.destinationLocation;
  if (!loc) return null; // Return null if no location exists
    const segments = loc.split('/');
  let route = '/inventory/warehouses/warehouse';

  if (segments[0]) {
    route += `/${segments[0]}`;
  }
  if (segments[1]) {
    route += `/shelf/${segments[1]}`;
  }
  if (segments[2]) {
    route += `/row/${segments[2]}`;
  }
  if (segments[3]) {
    route += `/segment/${segments[3]}`;
  }

  return route;
};

export const MovementsTable = ({ location }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { data: movementsData, loading } = useListenMovementsByLocation(user, location, location);

  // Transform the data to include date as property
  const transformedData = movementsData.map(mov => {
    const dateObj = mov.createdAt?.toDate?.();
    return {
      ...mov,
      key: mov.id,
      date: dateObj ? dateObj.toLocaleDateString() : 'Sin fecha',
      time: dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sin hora',
      product: mov.productName,
      movementType: mov.movementType,
      sourceLocationName: mov.sourceLocationName,
      location: mov,
      destinationLocationName: mov.destinationLocationName,
      quantity: mov.quantity,
    };
  });

  const columns = [
    {
      Header: "Hora",
      accessor: "time",
      minWidth: "100px",
      keepWidth: true,
    },
    {
      Header: "Producto",
      accessor: "product",
      minWidth: "200px",
    },
    {
      Header: "Tipo",
      accessor: "movementType",
      minWidth: "120px",
      // type: 'badge',
      cell: ({ value }) => {
        const isEntry = value === 'in';
        return <MovementTypeBadge isEntry={isEntry}>{isEntry ? 'Entrada' : 'Salida'}</MovementTypeBadge>;
      },
    },
    {
      Header: "Ubicación",
      accessor: "location",
      minWidth: "200px",
      cell: ({ value }) => {
        const isEntry = value.movementType === 'in';
        const route = generateRoute(isEntry, value);
        const locationDisplay = getLocationDisplay(value);
        const isExternal = !route;
        
        return (
          <LocationCell 
            isEntry={isEntry}
            isExternal={isExternal}
            onClick={() => route ? navigate(route) : null}
            style={{ cursor: route ? 'pointer' : 'default' }}
          >
            <LocationName isEntry={isEntry}>
              {locationDisplay}
            </LocationName>
            <DirectionWrapper>
              <DirectionLabel isEntry={isEntry}>
                <DirectionArrow isEntry={isEntry}>
                  {isEntry ? '←' : '→'}
                </DirectionArrow>
                {isEntry ? 'Origen' : 'Destino'}
              </DirectionLabel>
            </DirectionWrapper>
          </LocationCell>
        );
      },
    },
    {
      Header: "Motivo",
      accessor: "movementReason",
      minWidth: "150px",
      cell: ({ value }) => (
        <ReasonBadge reasonType={value}>
          {formatMovementReason(value)}
        </ReasonBadge>
      ),
    },
    {
      Header: "Cantidad",
      accessor: "quantity",
      align: "right",
      minWidth: "100px",
      type: 'badge',
    }
  ];

  return (
    <StyledCard title="Últimos Movimientos">
      <AdvancedTable
        title="Historial de Movimientos" // Add this line to show the title
        columns={columns}
        data={transformedData}
        loading={loading}
        groupBy="date"
        elementName="movimientos"
        numberOfElementsPerPage={8}
        emptyText="No hay movimientos para mostrar"
      />
    </StyledCard>
  );
};
