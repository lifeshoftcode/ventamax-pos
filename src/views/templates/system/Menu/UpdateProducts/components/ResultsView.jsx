import React from 'react';
import styled from 'styled-components';

const ResultsView = ({ results, onReset, onExportToExcel }) => {
  if (!results) return null;
  
  return (
    <ResultsContainer>
      <ResultsCard>
        <ResultsTitle>Results Summary</ResultsTitle>
        <ResultsStats>
          <StatItem>
            <StatLabel>Total Products:</StatLabel>
            <StatValue>{results.total}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Successfully Updated:</StatLabel>
            <StatValue className="success">{results.updated}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Not Found:</StatLabel>
            <StatValue className="warning">{results.notFound || 0}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Skipped/Errors:</StatLabel>
            <StatValue className="error">{results.skipped}</StatValue>
          </StatItem>
        </ResultsStats>
        
        {results.errors && results.errors.length > 0 && (
          <ErrorDetails>
            <ErrorTitle>Error Details:</ErrorTitle>
            <ErrorList>
              {results.errors.slice(0, 10).map((error, index) => (
                <ErrorItem key={index}>
                  <span className="product">{error.product}</span>: {error.error}
                </ErrorItem>
              ))}
              {results.errors.length > 10 && (
                <ErrorItem>...and {results.errors.length - 10} more errors</ErrorItem>
              )}
            </ErrorList>
          </ErrorDetails>
        )}
        
        <ButtonGroup>
          <Button onClick={onReset}>Start New Batch</Button>
          <Button onClick={onExportToExcel} className="secondary">Export to Excel</Button>
        </ButtonGroup>
      </ResultsCard>
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 1rem 0;
`;

const ResultsCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  max-width: 800px;
`;

const ResultsTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const ResultsStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  padding: 1rem;
  border-radius: 6px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatLabel = styled.span`
  font-weight: 600;
  color: #495057;
`;

const StatValue = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
  &.success {
    color: #28a745;
  }
  &.error {
    color: #dc3545;
  }
  &.warning {
    color: #fd7e14;
  }
`;

const ErrorDetails = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

const ErrorTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #dc3545;
`;

const ErrorList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
`;

const ErrorItem = styled.li`
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  .product {
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  background-color: #0d6efd;
  color: white;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0b5ed7;
  }
  
  &.secondary {
    background-color: #6c757d;
    &:hover {
      background-color: #5a6268;
    }
  }
`;

export default ResultsView;