import React, { Fragment, useState } from 'react'
import { Button } from '../../../system/Button/Button'
import styled from 'styled-components'
import ROUTES_NAME from '../../../../../routes/routesName'
import { useLocation, useMatch } from 'react-router-dom'
import { icons } from '../../../../../constants/icons/icons'
import { WarehouseForm } from '../../../../pages/Inventory/components/Warehouse/forms/WarehouseForm/WarehouseForm'
import { useDispatch } from 'react-redux'
import { openWarehouseForm } from '../../../../../features/warehouse/warehouseModalSlice'

export const WarehouseToolbar = ({ side = 'left' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const { WAREHOUSES, WAREHOUSE, SHELF, ROW, SEGMENT } = ROUTES_NAME.INVENTORY_TERM;
  
    const paths = [WAREHOUSES, WAREHOUSE, SHELF, ROW, SEGMENT];

    // Función para comparar rutas dinámicas
    const isMatchingPath = (targetPath) => {
        // Convertir la ruta dinámica a un patrón regex
        const dynamicPathRegex = new RegExp(
            `^${targetPath.replace(/:\w+/g, '[^/]+')}$`
        );
        return dynamicPathRegex.test(pathname);
    };

    // Verificar si la ruta actual coincide con alguna de las rutas
    const matchWithWarehouses = paths.some(isMatchingPath);
    const handleAddWarehouse = () => {
        dispatch(openWarehouseForm())
    }
    return (
        matchWithWarehouses && (
            <Fragment>
                <Container>
                    {
                        side === 'right' && (
                            <Group >
                                <Button
                                    tooltipDescription={'Agregar almacén'}
                                    tooltipPlacement={'bottom-end'}
                                    startIcon={icons.operationModes.add}
                                    borderRadius='normal'
                                    title={'Almacén'}
                                    onClick={handleAddWarehouse}
                                />

                            </Group>
                        )
                    }
                </Container>
                {/* {isOpen && (
                    <WarehouseForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        
                    />
                )} */}
            </Fragment>
        )
    )
}
const Container = styled.div`

`
const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
 
`