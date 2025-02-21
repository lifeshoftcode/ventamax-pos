import React from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { toggleSignUpUser } from '../../../features/modals/modalSlice';

export const BusinessEditModal = ({ isOpen, onClose, business }) => {
  const dispatch = useDispatch();
  
  const handleOpenSignUpModal = () => {
    dispatch(toggleSignUpUser({
      isOpen: true,
      businessID: business?.id
    }));
  };

  return (
    <Modal
      title="Editar Negocio"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Button type="primary" onClick={handleOpenSignUpModal}>
        Agregar Usuario [{business?.id}]
      </Button>
    </Modal>
  );
};


