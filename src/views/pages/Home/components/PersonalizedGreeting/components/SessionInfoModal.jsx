import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../../../features/auth/userSlice';
import { selectBusinessData } from '../../../../../../features/auth/businessSlice';

export const SessionInfoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const business = useSelector(selectBusinessData);
  const showSessionInfo = () => {
    setIsModalOpen(true);
    // You can implement the modal display logic here
  };

  const hideSessionInfo = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    showSessionInfo,
    hideSessionInfo,
  };
};