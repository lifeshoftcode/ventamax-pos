import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from './ventamax.svg';

const Wrapper = styled(motion.div)`
  background-color: #000000;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GenericLoader = () => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <motion.img
        src={logo}
        alt="Ventamax Logo"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 4, 2] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </Wrapper>
  );
}
