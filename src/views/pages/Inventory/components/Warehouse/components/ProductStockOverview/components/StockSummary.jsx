import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CalendarOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  margin-bottom: 24px;

  .summary-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 
                0 2px 4px rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
    }

    .label {
      color: #64748b;
      font-size: 0.9rem;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .value {
      font-size: 1.75rem;
      font-weight: 600;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
  }
`;

const SummaryCard = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;
  min-width: 200px;

  .label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
`;

const StockSummary = ({ filteredStock }) => {
    if (!filteredStock || filteredStock.length === 0) return null;

    // Move helper functions outside of render
    const calculateTotals = useCallback((stocks) => {
        if (!stocks.length) return { totalUnits: 0, totalLocations: 0, totalBatches: 0 };
        const uniqueLocations = new Set(stocks.map(stock => stock.location));
        return {
            totalUnits: stocks.reduce((sum, stock) => sum + stock.quantity, 0),
            totalLocations: uniqueLocations.size,
            totalBatches: new Set(stocks.filter(s => s.batchId).map(s => s.batchId)).size
        };
    }, []);

    const { totalUnits, totalLocations, totalBatches } = calculateTotals(filteredStock);

    return (
        <Container>
            <SummaryCard>
                <div className="label">
                    <FontAwesomeIcon icon={faBoxes} />
                    <span>Total Unidades</span>
                </div>
                <div className="value">{totalUnits}</div>
            </SummaryCard>

            <SummaryCard>
                <div className="label">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>Ubicaciones</span>
                </div>
                <div className="value">{totalLocations}</div>
            </SummaryCard>

            <SummaryCard>
                <div className="label">
                    <CalendarOutlined />
                    <span>Lotes Activos</span>
                </div>
                <div className="value">{totalBatches}</div>
            </SummaryCard>
        </Container>
    );
};

export default StockSummary;