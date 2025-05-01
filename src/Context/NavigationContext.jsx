import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [pathHistory, setPathHistory] = useState([]);
  
  // Update path history whenever location changes
  useEffect(() => {
    // Don't add duplicate consecutive paths
    if (pathHistory.length === 0 || pathHistory[pathHistory.length - 1] !== location.pathname) {
      setPathHistory(prev => [...prev, location.pathname].slice(-10)); // Keep last 10 paths
    }
  }, [location.pathname]);

  // Get the previous path (excluding current path)
  const getPreviousPath = (currentPath) => {
    const currentIndex = pathHistory.lastIndexOf(currentPath);
    if (currentIndex > 0) {
      return pathHistory[currentIndex - 1];
    }
    return null;
  };

  const value = {
    pathHistory,
    getPreviousPath,
    currentPath: location.pathname
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
