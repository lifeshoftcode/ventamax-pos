import React from 'react'
import styled from 'styled-components'
import { useMatch, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { icons } from '../../../../../constants/icons/icons'
import { useDispatch } from 'react-redux'
import { toggleSignUpUser } from '../../../../../features/modals/modalSlice'
import ROUTES_PATH from '../../../../../routes/routesName'

const BusinessManagerToolbar = ({ side = 'left' }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { CREATE_BUSINESS, BUSINESSES } = ROUTES_PATH.DEV_VIEW_TERM;

    const handleOpenModal = () => navigate(CREATE_BUSINESS) // Use the CREATE_BUSINESS route here
    
    const matchWithUsers = useMatch(BUSINESSES)

    return (
        matchWithUsers ? (
            <Container>
                {
                    side === 'right' && (
                       <Button 
                        onClick={handleOpenModal}
                        icon={icons.operationModes.add}
                       >
                        Negocio
                       </Button>
                    )
                }
            </Container>
        ) : null
    )
}

export default BusinessManagerToolbar

const Container = styled.div``