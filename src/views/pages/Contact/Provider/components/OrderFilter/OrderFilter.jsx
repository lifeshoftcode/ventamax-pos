import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Button } from '../../../../../templates/system/Button/Button'
import { OrderMenuFilter } from './OrderMenuFilter/OrderMenuFilter'

export const OrderFilter = () => {
  const [MenuIsOpen, setMenuIsOpen] = useState(false)
  const handleOpenMenu = () => setMenuIsOpen(!MenuIsOpen)
  return (
    <Container>      <Button
        borderRadius='normal'
        startIcon={<FontAwesomeIcon icon={faFilter} />}
        title={`Filtros`}
        color='gray-dark'
        onClick={handleOpenMenu}
      />
      <OrderMenuFilter MenuIsOpen={MenuIsOpen}/>
    </Container>
  )
}
const Container = styled.div`
    
`
