import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

function StockIndicator({ stock, trackInventory }) {
    if (trackInventory) {
        return (
            <StockContainer trackInventory={trackInventory} stock={stock}>
                {stock || 0}
            </StockContainer>
        );
    } else {
        return (
            <StockContainer trackInventory={trackInventory}>
                <span>
                    <FontAwesomeIcon icon={faCircleMinus} />
                </span>
            </StockContainer>
        );
    }
}

export default StockIndicator;

const StockContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
  height: 2em;
    justify-content: right;
    padding: 0 0.4em;    
    border-radius: var(--border-radius-light);
    ${props => !props.stock && `
    white-space: nowrap;

    background-color: #ebebeb !important;
    color: #616161 !important;
    `}
    
    ${props => {
        switch (props.trackInventory) {
            case false:
                return `
                display: flex;
        `;
            default:
                break;
        }
    }}
    ${props => {
        switch (true) {
            case props.stock < 10:
                return `
          justify-content: right;
          background-color: rgb(255, 220, 220);
        `;
            case props.stock >= 10:
                return `
            justify-content: right;
            background-color: rgb(220, 255, 220);
            `;
            default:
                break;
        }
    }}
    ${props => {
        switch (!props.trackInventory) {
            case true:
                return `
          justify-content: right;
          background-color: transparent !important;
        `;

            default:
                break;
        }
    }}
`;

