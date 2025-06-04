import React from 'react';
import styled from 'styled-components';

const ProcessModal = ({ isOpen, progress, message }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>{message || 'Processing...'}</ModalTitle>
        <ProgressBarContainer>
          <ProgressBarFill progress={progress} />
        </ProgressBarContainer>
        <PercentageText>{Math.round(progress)}%</PercentageText>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.25rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${props => `${props.progress}%`};
  background-color: #0d6efd;
  border-radius: 10px;
  transition: width 0.3s ease;
`;

const PercentageText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

export default ProcessModal;