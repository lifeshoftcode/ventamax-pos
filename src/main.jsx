import React, { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './firebase/firebaseconfig';
import App from './App';
import './index.css';
import './App.css';
import './styles/normalize/normalize.css';
import './variable.css';
import './styles/typography/typographyStyle.scss';
import './styles/theme.css';
import './styles/darkTheme.css';


import { Provider } from 'react-redux'
import { store } from './app/store'
import AppProviders from './Context/AppProviders';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AntConfigProvider } from './ant/AntConfigProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as antd from "antd";
import { HelmetProvider } from 'react-helmet-async';
const AntApp = antd.App;

// Función para detectar si estamos en localhost
const isLocalhost = () => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.includes('192.168.');
};

// Componente wrapper para manejar la clase de producción
const ProductionWrapper = ({ children }) => {
  useEffect(() => {
    if (!isLocalhost()) {
      document.body.classList.add('production-mode');
    }
  }, []);

  return children;
};

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <AntApp>
        <HelmetProvider>
          <I18nextProvider i18n={i18n}>
            <AppProviders>
              <AntConfigProvider>
                <QueryClientProvider client={queryClient}>
                  <ProductionWrapper>
                    <App />
                  </ProductionWrapper>
                </QueryClientProvider>
              </AntConfigProvider>
            </AppProviders>
          </I18nextProvider>
        </HelmetProvider>
      </AntApp>
    </Provider>
  </StrictMode>
)
