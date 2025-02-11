import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '../../../../templates/system/Typografy/Typografy';
import { selectUser } from '../../../../../features/auth/userSlice';
import { selectBusinessData } from '../../../../../features/auth/businessSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';

const PersonalizedGreeting = ({ greetingText = 'Bienvenid@' }) => {
  const user = useSelector(selectUser);
  const business = useSelector(selectBusinessData);

  const showSessionInfo = () => {
    const sessionExpires = localStorage.getItem('sessionExpires');
    if (!sessionExpires) {
      Modal.info({
        title: 'Información de Sesión',
        content: 'No hay información de sesión disponible',
        centered: true,
        okText: 'Cerrar'
      });
      return;
    }

    const expirationTime = parseInt(sessionExpires);
    const now = Date.now();
    const timeLeft = expirationTime - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    Modal.info({
      title: 'Tiempo Restante de Sesión',
      content: (
        <div>
          <p>Tu sesión expirará en:</p>
          <ul>
            <li>{days} días</li>
            <li>{hours} horas</li>
            <li>{minutes} minutos</li>
          </ul>
        </div>
      ),
      centered: true,
      okText: 'Cerrar'
    });
  };

  const [personalizedMessage, setPersonalizedMessage] = useState(greetingText);
  const [loading, setLoading] = useState(false);

  const realName = user?.realName?.trim();
  const username = user?.username?.trim();
  const nameToDisplay = realName || username || 'Usuario';

  useEffect(() => {
    const message = `${greetingText}, ${nameToDisplay}`;
    setPersonalizedMessage(message);
  }, [nameToDisplay, greetingText]);

  return (
    <div onClick={showSessionInfo} style={{ cursor: 'pointer' }}>
      <Typography variant='h3' disableMargins>
        {loading ? "Cargando..." : `${personalizedMessage}, `} 
      </Typography>
      <BusinessName>
        {business && business?.name}
      </BusinessName>
    </div>
  );
};

PersonalizedGreeting.propTypes = {
  greetingText: PropTypes.string,
};

export default PersonalizedGreeting;

const BusinessName = styled.div``;