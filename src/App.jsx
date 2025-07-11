import { scan } from 'react-scan'; // import this BEFORE react
import { Fragment, useEffect } from 'react';

//importando componentes de react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//redux config
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, logout } from './features/auth/userSlice'
import { ReloadImageHiddenSetting } from './features/setting/settingSlice';
import { useCheckForInternetConnection } from './hooks/useCheckForInternetConnection';
import { useFullScreen } from './hooks/useFullScreen';
import { fbAutoCreateDefaultTaxReceipt } from './firebase/taxReceipt/fbAutoCreateDefaultReceipt';
import { useBusinessDataConfig } from './features/auth/useBusinessDataConfig';
import { routes } from './routes/routes';
import { useAbilities, useLoadUserAbilities } from './hooks/abilities/useAbilities';
import { ModalManager } from './views';
import { AnimatePresence } from 'framer-motion';
import { useFbTaxReceiptToggleStatus } from './firebase/Settings/taxReceipt/fbGetTaxReceiptToggleStatus';
import { useUserDocListener } from './firebase/Auth/fbAuthV2/fbSignIn/updateUserData';
import { useCurrentCashDrawer } from './firebase/cashCount/useCurrentCashDrawer';
import SEO from './Seo/Seo';
import { SessionManager } from './views/templates/system/SessionManager';
import { useAutoStockSync } from './firebase/warehouse/stockSyncService';
import { useNavigationTracker } from './hooks/routes/useNavigationTracker';
import { useTaxReceiptsFix } from './hooks/useTaxReceiptsFix';
import NotificationCenter from './views/templates/NotificationCenter/NotificationCenter';
import { useInitializeBillingSettings } from './firebase/billing/useInitializeBillingSettings';
import { useBackfillUserNumbers } from './firebase/Auth/fbBackfillUserNumbers';
import { useDeveloperCommands } from './hooks/useDeveloperCommands';


// Componente para rastrear la navegación dentro del Router
const NavigationTracker = () => {
  useNavigationTracker();
  return null;
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useTaxReceiptsFix();
  useDeveloperCommands(); // Activar comandos de desarrollador

  useEffect(() => {
    dispatch(ReloadImageHiddenSetting())
  }, [])

  useInitializeBillingSettings()

  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });

  useLoadUserAbilities(); // Carga las habilidades del usuario actual

  useBackfillUserNumbers();

  useUserDocListener(user?.uid); // escucha los cambios en el documento del usuario actual

  useCurrentCashDrawer();// obtiene el cajón actual

  useAbilities()// establece la abilidad que puede usar el usuario actual

  fbAutoCreateDefaultTaxReceipt()// crea el comprobante fiscal por defecto

  useFbTaxReceiptToggleStatus()// obtiene el estado del comprobante fiscal

  useBusinessDataConfig()// obtiene la configuración de la empresa

  useFullScreen()// establece el modo pantalla completa

  useCheckForInternetConnection()// verifica la conexión a internet

  useAutoStockSync();// sincroniza el stock de los productos

  return (
    <Fragment>
      <Router>
        <NavigationTracker />
        <SessionManager />
        <SEO />
        <AnimatePresence mode="wait">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children && route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute?.path}
                    element={childRoute?.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </AnimatePresence>
        <AnimatePresence>
          <ModalManager />
        </AnimatePresence>
        <NotificationCenter />
      </Router>
    </Fragment>
  )
}

export default App;
