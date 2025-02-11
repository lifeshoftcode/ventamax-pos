import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import ROUTES_PATH from '../../../../../../../routes/routesName';
import { useDefaultWarehouse } from '../../../../../../../firebase/warehouse/warehouseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const MenuContainer = styled.div`
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0;
`;

const TabList = styled.div`
    display: flex;
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }
`;

const Tab = styled.button`
    padding: 12px 16px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    color: ${props => props.active ? '#1976d2' : '#666'};
    border-bottom: 2px solid ${props => props.active ? '#1976d2' : 'transparent'};
    transition: all 0.3s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
        color: #1976d2;
    }
`;

const ExternalArrow = styled.span`
    font-size: 12px;
    margin-left: 2px;
    opacity: 0.7;
`;

const InventoryMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { defaultWarehouse, loading: loadingDefault } = useDefaultWarehouse();

    const { INVENTORY_TERM, PURCHASE_TERM, ORDER_TERM } = ROUTES_PATH;
    const { WAREHOUSES, PRODUCTS_STOCK, WAREHOUSE } = INVENTORY_TERM;
    const { BACKORDERS, PURCHASES } = PURCHASE_TERM;
    const { ORDERS } = ORDER_TERM;

    const [value, setValue] = React.useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
        let selectedRoute;

        switch (newValue) {
            case 0: // Almacenes
                if (!loadingDefault && defaultWarehouse) {
                    selectedRoute = `${WAREHOUSES}/warehouse/${defaultWarehouse.id}`;
                }
                break;
            case 1: // Stock
                selectedRoute = PRODUCTS_STOCK;
                break;
            case 2: // Backorders
                selectedRoute = BACKORDERS;
                break;
            case 3: // Compras
                selectedRoute = PURCHASES;
                break;
            case 4: // Pedidos
                selectedRoute = ORDERS;
                break;
            default:
                selectedRoute = WAREHOUSES; // Default to warehouses if no match
        }

        if (selectedRoute) {
            navigate(selectedRoute);
        }
    };

    React.useEffect(() => {
        const path = location.pathname;

        if (path === `${WAREHOUSES}/products-stock`) {
            setValue(1);
        } else if (path.startsWith(`${WAREHOUSES}/warehouse/`)) {
            setValue(0);
        } else if (path.includes('backorders')) {
            setValue(2);
        } else if (path.includes('purchases')) {
            setValue(3);
        } else if (path.includes('orders')) {
            setValue(4);
        } else if (path === WAREHOUSES) {
            setValue(0);
            if (!loadingDefault && defaultWarehouse) {
                navigate(`${WAREHOUSES}/warehouse/${defaultWarehouse.id}`);
            }
        }
    }, [location.pathname, loadingDefault, defaultWarehouse, navigate, WAREHOUSES]);

    return (
        <MenuContainer>
            <TabList>
                <Tab active={value === 0} onClick={() => handleChange(0)}>Almacenes</Tab>
                <Tab active={value === 1} onClick={() => handleChange(1)}>Stock</Tab>
                <Tab active={value === 2} onClick={() => handleChange(2)}>Backorders</Tab>
                <Tab active={value === 3} onClick={() => handleChange(3)}>
                    Compras
                    <ExternalArrow>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </ExternalArrow>
                </Tab>
                <Tab active={value === 4} onClick={() => handleChange(4)}>
                    Pedidos
                    <ExternalArrow>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </ExternalArrow>
                </Tab>
            </TabList>
        </MenuContainer>
    );
};

export default InventoryMenu;