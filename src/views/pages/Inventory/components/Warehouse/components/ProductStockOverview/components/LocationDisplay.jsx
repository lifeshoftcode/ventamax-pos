import { faArrowRight, faBox, faLayerGroup, faMapMarkerAlt, faTable, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const LocationDisplay = ({ location, onClick, locationNames }) => {
  // Ensure location is a string and provide a default value
  const locationString = String(location || '');
  const [warehouseId, shelfId, rowId, segmentId] = locationString.split('/');
  
  const getLocationIcon = (type) => {
    switch(type) {
      case 'warehouse': return faWarehouse;
      case 'shelf': return faLayerGroup;
      case 'row': return faTable;
      case 'segment': return faBox;
      default: return faWarehouse;
    }
  };

  const formatLocationPart = (path) => {
    if (!path) return 'Ubicación no disponible';
    return locationNames[path] || 'Cargando...';
  };

  return (
    <LocationBadge onClick={onClick}>
      <div className="location-label">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
        Ubicación
      </div>
      <LocationPath>
        <div className="location-content">
          <div className="location-segment">
            <FontAwesomeIcon icon={getLocationIcon('segment')} className="icon" />
            <span className="location-text">{formatLocationPart(locationString)}</span>
          </div>
        </div>
        <FontAwesomeIcon icon={faArrowRight} className="navigation-icon" />
      </LocationPath>
    </LocationBadge>
  );
};

const LocationPath = styled.div`
  display: flex;
  align-items: flex-start; // Changed from center to allow wrapping
  gap: 8px;
  width: 100%;


  .location-content {
    flex: 1;
    min-width: 0;
  }

  .location-segment {
    display: flex;
    align-items: flex-start; // Allow wrapping
    padding: 4px 12px;
    background: #f8fafc;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #1e293b;
    border: 1px solid #e2e8f0;
    white-space: normal; // Allow text wrapping
    word-break: break-word; // Better word wrapping
    
    .icon {
      color: #2563eb;
      margin-right: 6px;
      font-size: 0.85rem;
      flex-shrink: 0;
      margin-top: 3px; // Align icon with first line of text
    }

    .location-text {
      flex: 1;
    }
  }

  .navigation-icon {
    color: #2563eb;
    transition: transform 0.2s ease;
    font-size: 0.9rem;
    flex-shrink: 0;
    margin-top: 6px; // Align with first line of text
  }
`;

const LocationBadge = styled.div`
  position: relative;
  background: #ffffff;
  padding: 8px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
  margin-top: auto;
 

  &:hover {
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);

    .navigation-icon {
      transform: translateX(4px);
    }
  }

  .location-label {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;

    .icon {
      color: #2563eb;
    }
  }

  .location-content {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;