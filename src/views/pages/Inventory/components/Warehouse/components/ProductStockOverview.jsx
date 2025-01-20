import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Input, Empty, Spin } from 'antd';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faMapMarkerAlt, faArrowRight, faExclamationTriangle, faCheckCircle, faTimesCircle, faWarehouse, faLayerGroup, faTable, faBox } from '@fortawesome/free-solid-svg-icons';
import { useListenProductsStock } from '../../../../../../firebase/warehouse/productStockService';
import { useLocationNames } from '../../../../../../hooks/useLocationNames';

const Container = styled.div`
  padding: 32px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  background: #ffffff;
  min-height: calc(100vh - 64px);
`;

const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  padding: 12px 3px;
  max-height: 70vh;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 4px;
  }
`;

const getQuantityColor = (quantity) => {
  if (quantity < 0) return '#dc2626'; // red-600
  if (quantity === 0) return '#64748b'; // slate-500
  return '#059669'; // green-600
};

const getQuantityBackgroundColor = (quantity) => {
  if (quantity < 0) return '#fee2e2'; // red-100
  if (quantity === 0) return '#f1f5f9'; // slate-100
  return '#dcfce7'; // green-100
};

const getStockStatus = (quantity) => {
  if (quantity <= 0) return {
    icon: faTimesCircle,
    color: '#dc2626',
    background: '#fee2e2',
    label: 'Sin Stock'
  };
  if (quantity < 10) return {
    icon: faExclamationTriangle,
    color: '#ea580c',
    background: '#ffedd5',
    label: 'Stock Bajo'
  };
  return {
    icon: faCheckCircle,
    color: '#059669',
    background: '#dcfce7',
    label: 'Stock OK'
  };
};

const StockCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  height: 100%;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }

  .card-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
  }

  .quantity-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .quantity {
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    padding: 12px 16px;
    border-radius: 12px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease;
    border: 1px solid ${props => props.$status.color}20;
    background: ${props => props.$status.background}50;
    color: ${props => props.$status.color};

    .quantity-main {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      padding: 4px 12px;
      border-radius: 20px;
      background: ${props => props.$status.background};
      border: 1px solid ${props => props.$status.color}30;
    }
  }
`;

const LocationPath = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;

  .location-content {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .location-segment {
    display: flex;
    align-items: center;
    padding: 4px 12px;
    background: #f8fafc;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #1e293b;
    transition: all 0.2s ease;
    border: 1px solid #e2e8f0;
    
    .icon {
      color: #2563eb;
      margin-right: 6px;
      font-size: 0.85rem;
    }
  }

  .navigation-icon {
    color: #2563eb;
    transition: transform 0.2s ease;
    font-size: 0.9rem;
  }
`;

const LocationBadge = styled.div`
  position: relative;
  background: #ffffff;
  padding: 12px;
  border-radius: 12px;
  font-size: 0.925rem;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
    font-size: 0.8rem;
    color: #64748b;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;

    .icon {
      color: #2563eb;
    }
  }
`;

const BatchGroup = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 
              0 4px 6px rgba(0, 0, 0, 0.02);
  margin-bottom: 24px;
  
  .batch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f1f5f9;

    .batch-info {
      .batch-number {
        font-size: 1.35rem;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 6px;
        letter-spacing: -0.01em;
      }

      .batch-meta {
        display: flex;
        align-items: center;
        gap: 20px;
        color: #64748b;
        font-size: 0.9rem;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 0;
        }
      }
    }

    .batch-total {
      padding: 10px 20px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.95rem;
      letter-spacing: 0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
      background: ${props => props.$status.background}50;
      color: ${props => props.$status.color};
      border: 1px solid ${props => props.$status.color}20;

      .status-icon {
        font-size: 0.9rem;
      }
    }
  }

  .locations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 4px;
  }
`;

const StockSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  .summary-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 
                0 2px 4px rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
    }

    .label {
      color: #64748b;
      font-size: 0.95rem;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .value {
      font-size: 2rem;
      font-weight: 600;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
  }
`;

const SearchBar = styled(Input)`
  margin-bottom: 32px;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  background: #ffffff;

  .ant-input {
    font-size: 1.05rem;
  }

  .ant-input-prefix {
    color: #64748b;
    margin-right: 12px;
    font-size: 1.1rem;
  }

  &:hover, &:focus {
    border-color: #cbd5e1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  }
`;

const ProductStockOverview = ({ preloadedProducts }) => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const { productId } = useParams();
    const { data: stockData, loading } = useListenProductsStock(productId);
    const { locationNames, fetchLocationName } = useLocationNames();

    const filteredStock = React.useMemo(() => {
        if (!stockData) return [];
        return stockData.filter(stock =>
            stock.location.toLowerCase().includes(searchText.toLowerCase()) ||
            (stock?.batchNumberId && stock.batchNumberId.toString().toLowerCase().includes(searchText.toLowerCase()))
        );
    }, [stockData, searchText]);

    const formatLocation = React.useCallback((locationId) => {
        return locationNames[locationId] || 'Cargando...';
    }, [locationNames]);

    const handleLocationClick = React.useCallback((locationPath) => {
        const [warehouseId, shelfId, rowId, segmentId] = locationPath.split('/');
        let navigationPath = `/inventory/warehouses/warehouse/${warehouseId}`;
        if (shelfId) {
            navigationPath += `/shelf/${shelfId}`;
            if (rowId) {
                navigationPath += `/row/${rowId}`;
                if (segmentId) {
                    navigationPath += `/segment/${segmentId}`;
                }
            }
        }
        navigate(navigationPath);
    }, [navigate]);

    React.useEffect(() => {
        if (!stockData) return;
        stockData.forEach(stock => {
            if (stock.location && !locationNames[stock.location]) {
                fetchLocationName(stock.location);
            }
        });
    }, [stockData, locationNames, fetchLocationName]);

    // Move helper functions outside of render
    const calculateTotals = React.useCallback((stocks) => {
        if (!stocks.length) return { totalUnits: 0, totalLocations: 0, totalBatches: 0 };
        const uniqueLocations = new Set(stocks.map(stock => stock.location));
        return {
            totalUnits: stocks.reduce((sum, stock) => sum + stock.quantity, 0),
            totalLocations: uniqueLocations.size,
            totalBatches: new Set(stocks.filter(s => s.batchId).map(s => s.batchId)).size
        };
    }, []);

    const groupStockByBatch = React.useCallback((stocks) => {
        if (!stocks.length) return {};
        return stocks.reduce((groups, stock) => {
            const batchKey = stock.batchId || 'sin-lote';
            if (!groups[batchKey]) {
                groups[batchKey] = {
                    batchId: stock.batchId,
                    batchNumberId: stock.batchNumberId,
                    expirationDate: stock.expirationDate,
                    productName: stock.productName,
                    items: [],
                    total: 0
                };
            }
            groups[batchKey].items.push(stock);
            groups[batchKey].total += stock.quantity;
            return groups;
        }, {});
    }, []);

    const renderContent = () => {
        if (!productId) {
            return <Empty description="No se ha seleccionado ningún producto" />;
        }

        if (loading) {
            return (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Spin size="large" />
                </div>
            );
        }

        return (
            <>
                {filteredStock.length > 0 && (
                    <StockSummary>
                        {(() => {
                            const { totalUnits, totalLocations, totalBatches } = calculateTotals(filteredStock);
                            return (
                                <>
                                    <div className="summary-card">
                                        <div className="label">
                                            <FontAwesomeIcon icon={faBoxes} />
                                            Total Unidades
                                        </div>
                                        <div className="value">{totalUnits}</div>
                                    </div>
                                    <div className="summary-card">
                                        <div className="label">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            Ubicaciones
                                        </div>
                                        <div className="value">{totalLocations}</div>
                                    </div>
                                    <div className="summary-card">
                                        <div className="label">
                                            <CalendarOutlined />
                                            Lotes Activos
                                        </div>
                                        <div className="value">{totalBatches}</div>
                                    </div>
                                </>
                            );
                        })()}
                    </StockSummary>
                )}

                <SearchBar
                    placeholder="Buscar por ubicación o número de lote..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {filteredStock.length === 0 ? (
                        <Empty description="No hay stock disponible para este producto" />
                    ) : (
                        Object.values(groupStockByBatch(filteredStock)).map((group) => (
                            <BatchGroup 
                                key={group.batchId || 'sin-lote'}
                                $status={getStockStatus(group.total)}
                            >
                                <div className="batch-header">
                                    <div className="batch-info">
                                        <div className="batch-number">
                                            {group.batchNumberId ? `Lote #${group.batchNumberId}` : 'Sin lote asignado'}
                                        </div>
                                        <div className="batch-meta">
                                            {group.expirationDate && (
                                                <span className="meta-item">
                                                    <CalendarOutlined />
                                                    Vence: {new Date(group.expirationDate.seconds * 1000).toLocaleDateString()}
                                                </span>
                                            )}
                                            <span className="meta-item">
                                                <FontAwesomeIcon icon={faBoxes} />
                                                {group.items.length} ubicaciones
                                            </span>
                                        </div>
                                    </div>
                                    <div className="batch-total">
                                        <FontAwesomeIcon 
                                            icon={getStockStatus(group.total).icon} 
                                            className="status-icon" 
                                        />
                                        {group.total} unidades
                                    </div>
                                </div>
                                <div className="locations-grid">
                                    {group.items.map((stock, index) => (
                                        <StockCard
                                            key={stock.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            $status={getStockStatus(stock.quantity)}
                                        >
                                            <div className="card-content">
                                                <div className="quantity-wrapper">
                                                    <div className="quantity">
                                                        <div className="quantity-main">
                                                            <FontAwesomeIcon icon={faBoxes} />
                                                            {stock.quantity} unidades
                                                        </div>
                                                        <div className="status-indicator">
                                                            <FontAwesomeIcon icon={getStockStatus(stock.quantity).icon} />
                                                            {getStockStatus(stock.quantity).label}
                                                        </div>
                                                    </div>
                                                </div>
                                                <LocationDisplay
                                                    location={stock.location}
                                                    onClick={() => handleLocationClick(stock.location)}
                                                    locationNames={locationNames}
                                                />
                                            </div>
                                        </StockCard>
                                    ))}
                                </div>
                            </BatchGroup>
                        ))
                    )}
                </div>
            </>
        );
    };

    return (
        <Container>
            {renderContent()}
        </Container>
    );
};

const LocationDisplay = ({ location, onClick, locationNames }) => {
  const [warehouseId, shelfId, rowId, segmentId] = location.split('/');
  
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
            {formatLocationPart(location)}
          </div>
        </div>
        <FontAwesomeIcon icon={faArrowRight} className="navigation-icon" />
      </LocationPath>
    </LocationBadge>
  );
};

export default ProductStockOverview;