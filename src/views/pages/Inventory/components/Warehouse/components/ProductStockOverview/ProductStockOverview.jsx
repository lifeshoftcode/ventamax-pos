import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Empty, Spin, Modal, Button } from 'antd'; // Añadido Button
import { SearchOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faMapMarkerAlt, faArrowRight, faExclamationTriangle, faCheckCircle, faTimesCircle, faWarehouse, faLayerGroup, faTable, faBox } from '@fortawesome/free-solid-svg-icons';
import { useListenProductsStock } from '../../../../../../../firebase/warehouse/productStockService';
import { useLocationNames } from '../../../../../../../hooks/useLocationNames';
import ProductStock from './components/ProductStock';
import StockSummary from './components/StockSummary';
import { openDeleteModal } from '../../../../../../../features/productStock/deleteProductStockSlice';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: #ffffff;
`;

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

const BatchGroup = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  margin-bottom: 0px;
  
  .batch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;

    .batch-info {
      .batch-number {
        font-size: 1.2rem;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 6px;
        letter-spacing: -0.01em;
      }

      .batch-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #64748b;
        font-size: 0.85rem;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 0;
        }
      }
    }

    .batch-total {
      padding: 6px 12px;
      border-radius: 30px;
      font-weight: 600;
      font-size: 0.9rem;
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
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 12px;
    padding: 0px;
  }
`;

const SearchBar = styled(Input)`
  margin-bottom: 24px;
  border-radius: 8px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  background: #ffffff;

  .ant-input {
    font-size: 0.95rem;
  }

  .ant-input-prefix {
    color: #64748b;
    margin-right: 8px;
    font-size: 1rem;
  }

  &:hover, &:focus {
    border-color: #cbd5e1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  }
`;

const BatchActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DeleteButton = styled(Button)`
  &.ant-btn {
    border: none;
    background: transparent;
    color: #64748b;
    padding: 4px 8px;
    
    &:hover {
      color: #dc2626;
      background: #fee2e2;
    }
  }
`;

const ProductStockOverview = ({ }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const { productId } = useParams();
  const { data: stockData, loading } = useListenProductsStock(productId);
  const { locationNames, fetchLocationName } = useLocationNames();

  const filteredStock = React.useMemo(() => {
    if (!stockData) return [];
    return stockData.filter(stock => {
      const locationStr = String(stock.location || '');
      const batchStr = String(stock.batchNumberId || '');
      return locationStr.toLowerCase().includes(searchText.toLowerCase()) ||
        batchStr.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [stockData, searchText]);

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

  const handleDeleteBatch = (group) => {
       console.log(group)
       dispatch(openDeleteModal({
         productStockId: null,
         batchId: group.batchId,
         actionType: 'batch',
       }));
  };

  const handleDeleteProductStock = (stock) => {
    dispatch(openDeleteModal({
      productStockId: stock.id,
      batchId: stock.batchId,
      actionType: 'productStock',
    }));
  };

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
        <StockSummary
          filteredStock={filteredStock}
        />
        <SearchBar
          placeholder="Buscar por ubicación o número de lote..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                  <BatchActions>
                    <DeleteButton
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteBatch(group)}
                      title="Eliminar batch completo"
                    />
                    <div className="batch-total">
                      <FontAwesomeIcon
                        icon={getStockStatus(group.total).icon}
                        className="status-icon"
                      />
                      {group.total} unidades
                    </div>
                  </BatchActions>
                </div>
                <div className="locations-grid">
                  {group.items.map((stock, index) => (
                    <ProductStock
                      getStockStatus={getStockStatus}
                      handleDeleteProductStock={handleDeleteProductStock}
                      handleLocationClick={handleLocationClick}
                      index={index}
                      locationNames={locationNames}
                      stock={stock}

                    />
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

export default ProductStockOverview;