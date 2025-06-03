import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { openModalAddOrder } from '../../../features/modals/modalSlice'
import { Button } from '../../templates/system/Button/Button'

export const ToolBar = () => {
    const dispatch = useDispatch()
    const openModal = () => dispatch(openModalAddOrder());
    return (
        <Container>
            <Wrapper>                <Button
                    borderRadius='normal'
                    bgcolor='primary'
                    startIcon={<FontAwesomeIcon icon={faPlus}/>}
                    title='Pedido'
                    onClick={openModal}
                />
            </Wrapper>
        </Container>
    )
}
const Container = styled.div`
    height: 2.50em;
    width: 100%;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
`
const Wrapper = styled.div`
   
    width: 100%;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    @media (max-width: 1000px){
        padding: 1em;
    }
`