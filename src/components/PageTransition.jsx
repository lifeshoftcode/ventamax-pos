import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageTransition = {
  initial: {
    opacity: 0,
    // x: -20
  },
  animate: {
    opacity: 1,
    // x: 0
  },
  exit: {
    opacity: 0,
    // x: 20
  }
};

export const PageTransition = ({ children }) => {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
