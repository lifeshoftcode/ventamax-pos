import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button } from '../../../../templates/system/Button/Button'
import { openModalAddProd } from '../../../../../features/modals/modalSlice'


export const AddProductButton = () => {
  const dispatch = useDispatch()
  const OpenAddProductModal = () => dispatch(openModalAddProd());
  return (    <Button
      startIcon={<FontAwesomeIcon icon={faPlus} />}
      borderRadius={'normal'}
      onClick={OpenAddProductModal}
    />
  )
}