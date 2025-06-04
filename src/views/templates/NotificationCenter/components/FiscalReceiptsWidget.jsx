import React from 'react';
import styled from 'styled-components';

const FiscalReceiptsWidget = ({ data }) => {
  const { title, message, percentage, seriesInfo } = data;
  
  return (
    <WidgetContainer>
      <Icon>📄</Icon>
      <Title>{title}</Title>
      <SeriesInfo>{seriesInfo}</SeriesInfo>
      
      <ProgressBarContainer>
        <ProgressBar percentage={percentage} />
        <PercentageLabel>{percentage}% restante</PercentageLabel>
      </ProgressBarContainer>
      
      <Message>{message}</Message>
      
      <ActionButton>
        Solicitar más
      </ActionButton>
    </WidgetContainer>
  );
};

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--space-5);
  background-color: var(--bg-base);
  border-left: 4px solid var(--warning);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
`;

const Icon = styled.div`
  font-size: 1.25rem;
  margin-bottom: var(--space-3);
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-100);
`;

const SeriesInfo = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-60);
  margin: var(--space-1) 0 var(--space-4) 0;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  margin-bottom: var(--space-3);
  position: relative;
`;

const ProgressBar = styled.div`
  height: 6px;
  width: 100%;
  background-color: var(--progress-bg);
  border-radius: 3px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.percentage}%;
    background-color: var(--warning);
    border-radius: 3px;
  }
`;

const PercentageLabel = styled.div`
  position: absolute;
  right: 0;
  top: -1.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--warning);
`;

const Message = styled.p`
  font-size: 0.9rem;
  margin: var(--space-3) 0 var(--space-5) 0;
  color: var(--text-100);
`;

const ActionButton = styled.button`
  padding: var(--space-2) var(--space-3);
  background-color: transparent;
  border: none;
  border-radius: var(--radius);
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  color: var(--primary);
  
  &:hover {
    background-color: rgba(0, 102, 255, 0.05); /* primary con baja opacidad */
  }
`;

export default FiscalReceiptsWidget;
