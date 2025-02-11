import { useAutomaticLogin } from '../../../firebase/Auth/fbAuthV2/fbSignIn/checkSession';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/auth/userSlice';
import { GenericLoader } from './loader/GenericLoader';

export const SessionManager = () => {
    const user = useSelector(selectUser);
    useAutomaticLogin();
    
    // Mostrar loader mientras se verifica el estado inicial
    if (user === false) {
        return <GenericLoader />;
    }

    return null;
};