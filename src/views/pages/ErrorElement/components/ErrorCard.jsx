import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import { motion } from 'framer-motion';

export const ErrorCard = ({ children }) => {
    return (
        <StyledCard>
            {children}
        </StyledCard>
    );
};

ErrorCard.propTypes = {
    children: PropTypes.node.isRequired,
};

const StyledCard = styled(Card)`
    max-width: 600px;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    
    .ant-card-body {
        padding: 24px;
        
        @media (max-width: 576px) {
            padding: 16px;
        }
    }
    
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
`;
