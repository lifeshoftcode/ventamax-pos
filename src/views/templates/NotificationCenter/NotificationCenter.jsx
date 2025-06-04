import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import NotificationWidgets from './components/NotificationWidgets';
import { selectNotificationCenter, closeNotificationCenter } from '../../../features/notification/notificationCenterSlice';

// Animaciones para apertura/cierre
const notificationVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      mass: 1,
    },
  },
  closed: {
    y: '-100%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
      mass: 1,
    },
  },
};

const NotificationCenter = () => {
  const [activeTab] = useState('notifications');
  const { isOpen } = useSelector(selectNotificationCenter);
  const dispatch = useDispatch();

  // Datos de ejemplo para las notificaciones
  const notificationData = {
    fiscalReceipts: {
      title: 'Comprobantes Fiscales',
      alertType: 'warning',
      message: 'Quedan 150 comprobantes de 1000. Solicita más antes de que se agoten.',
      percentage: 15,
      seriesInfo: 'Facturas Serie A',
    },
    inventory: {
      title: 'Inventario Bajo',
      items: [
        { name: 'Papel Térmico 80mm', status: 'crítico' },
        { name: 'Tinta Epson T664', status: 'crítico' },
        { name: 'Café Premium 1kg', status: 'bajo' },
      ],
    },
    sales: {
      title: 'Meta de Ventas',
      current: 78000,
      goal: 100000,
      percentage: 78,
      daysLeft: 3,
    },
    system: {
      title: 'Actualizaciones del Sistema',
      currentVersion: '2.4.1',
      newVersion: '2.5.0',
      hasUpdate: true,
      improvements: 'Incluye mejoras de seguridad y nuevas funcionalidades.',
    },
  };

  const handleClose = () => dispatch(closeNotificationCenter());

  return (
    <>
      <Backdrop isOpen={isOpen} onClick={handleClose} />
      <Container animate={isOpen ? 'open' : 'closed'} initial='closed' variants={notificationVariants}>
        <Header>
          <Left>
            <Icon>🔔</Icon>
            <HeaderText>
              <Title>Centro de Notificaciones</Title>
              <Subtitle>Gestiona alertas de tu TPV</Subtitle>
            </HeaderText>
          </Left>
          <CloseButton onClick={handleClose}>✕</CloseButton>
        </Header>

        <TabsContainer>
          <NotificationWidgets data={notificationData} />
        </TabsContainer>
      </Container>
    </>
  );
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9950;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: visibility 0.3s, opacity 0.3s;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-base);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  box-shadow: var(--shadow-md);
  overflow-y: auto;
  padding: var(--space-5);
  font-family: var(--font-sans);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-200);
  margin-bottom: var(--space-4);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 1.25rem;
`;

const HeaderText = styled.div`
  margin-left: var(--space-2);
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-100);
`;

const Subtitle = styled.p`
  font-size: 0.8rem;
  color: var(--text-60);
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-60);
  transition: color 0.2s;

  &:hover {
    color: var(--text-100);
  }
`;

const TabsContainer = styled.div`
  background-color: var(--bg-base);
  border-radius: var(--radius);
  overflow: hidden;
  flex: 1;
`;

export default NotificationCenter;
