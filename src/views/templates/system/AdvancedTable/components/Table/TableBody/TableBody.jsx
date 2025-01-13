import React, { Fragment } from 'react';
import { Row } from '../../../AdvancedTable';
import styled from 'styled-components';
import { CenteredText } from '../../../../CentredText';
import Loader from '../../../../../../component/Loader/Loader';
import { CellRenderer } from '../../CellRenderer/CellRenderer';

const Body = styled.div`
  position: relative;
`;

const renderCell = (col, value) => {
  if (col.cell) {
    return col.cell({ value });
  }
  return (
    <CellRenderer
      type={col.type}
      value={value}
      cellProps={col.cellProps}
      format={col.format}
    />
  );
};

export const TableBody = ({ 
  loading = false, 
  shouldGroup, 
  groupedData, 
  currentData, 
  columnOrder, 
  onRowClick, 
  emptyText, 
  isWideScreen,
  isWideLayout 
}) => {
  const activeColumns = columnOrder.filter(col => col.status === 'active');
  
  const handleCellClick = (e, col, row) => {
    if (onRowClick && col?.clickable !== false) onRowClick(row);
  };

  const tableContent = (
    <Container columns={activeColumns}>
      {shouldGroup
        ? Object.entries(groupedData).map(([groupKey, groupItems]) => (
          <Fragment key={groupKey}>
            <GroupHeader>{groupKey}</GroupHeader>
            {groupItems.map((row, rowIndex) => (
              <Row key={rowIndex} columns={activeColumns} isWideScreen={isWideScreen} isWideLayout={isWideLayout}>
                {activeColumns.map((col, colIndex) => (
                  <BodyCell 
                    key={colIndex} 
                    align={col.align}
                    fixed={col.fixed}
                    clickable={col?.clickable !== false ? true : false} 
                    columns={activeColumns} 
                    onClick={(e) => handleCellClick(e, col, row)}
                  >
                    {renderCell(col, row[col.accessor])}
                  </BodyCell>
                ))}
              </Row>
            ))}
          </Fragment>
        ))
        : currentData.map((row, rowIndex) => (
          <Row key={rowIndex} columns={activeColumns} isWideScreen={isWideScreen} isWideLayout={isWideLayout}>
            {activeColumns.map((col, colIndex) => (
              <BodyCell 
                key={colIndex} 
                align={col.align}
                fixed={col.fixed}
                clickable={col?.clickable !== false ? true : false} 
                columns={activeColumns} 
                onClick={(e) => handleCellClick(e, col, row)}
              >
                {renderCell(col, row[col.accessor])}
              </BodyCell>
            ))}
          </Row>
        ))}
      {!currentData.length && <CenteredText text={emptyText} />}
    </Container>
  );

  return (
    <Body>
      <Loader loading={loading} overlay>
        {tableContent}
      </Loader>
    </Body>
  );
};

const Container = styled.div`
 display: grid;
   align-content: flex-start;
   gap: 0.2em 1em;
`
const GroupHeader = styled.div`
  background-color: #f0f0f09e;
  padding: 10px;
  font-weight: bold;
  // Otros estilos que desees agregar
`;
const BodyCell = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 100%;
  height: 3.4em;
  position: ${props => props.fixed ? 'sticky' : 'relative'};
  ${props => props.fixed === 'left' && `
    left: 0;
    z-index: 1;
    background-color: white;
    border-right: 1px solid var(--Gray1);
  `}
  ${props => props.fixed === 'right' && `
    right: 0;
    z-index: 1;
    background-color: white;
    border-left: 1px solid var(--Gray1);
  `}
  justify-content: ${props => props.align || 'flex-start'};
  text-align: ${props => props.align || 'left'};
  ${props => props.clickable && `
    cursor: pointer;
  `}
  ${props => props?.columns?.minWidth && `
    min-width: ${props?.columns?.minWidth};
  `}
`;