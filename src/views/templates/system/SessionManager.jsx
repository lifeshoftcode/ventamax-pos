import { useEffect, useRef, useState } from 'react';
import { useAutomaticLogin } from '../../../firebase/Auth/fbAuthV2/fbSignIn/checkSession';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/auth/userSlice';
import VentamaxLoader from './loader/GenericLoader';

export const SessionManager = () => {
    const user = useSelector(selectUser);
    useAutomaticLogin();

    const MIN_TIME = 1200;
    const MAX_TIME = 8000;

    const [loaderVisible, setLoaderVisible] = useState(true);
    const [canHide, setCanHide] = useState(false);
    const startRef = useRef(Date.now()); // Referencia para el temporizador

    useEffect(() => {
        if (canHide) {
            setLoaderVisible(false);
        } else {
            // esperamos a que el mínimo se cumpla
            const id = setInterval(() => {
                if (canHide) {
                    clearInterval(id);
                    setLoaderVisible(false);
                }
            }, 50);
        }
    }, [user]);

    const handleLoaderFinish = () => setLoaderVisible(false);

    return (
        <>
            {loaderVisible && <VentamaxLoader onFinish={handleLoaderFinish} />}
        </>
    )

};