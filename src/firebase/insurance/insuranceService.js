import { updateDoc, doc, serverTimestamp, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { nanoid } from '@reduxjs/toolkit';
import { selectUser } from '../../features/auth/userSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const updateInsuranceConfig = async ({ ref, insuranceData }) => await updateDoc(ref, insuranceData);

export const addInsuranceConfig = async ({ user, ref, insuranceData }) => {
    await setDoc(ref, {
        ...insuranceData,
        createdAt: serverTimestamp(),
        createdBy: user.uid
    });
}

export const saveInsuranceConfig = async (user, insuranceData) => {
    try {
        if (!user.businessID) throw new Error('No business ID found');

        const id = insuranceData.id || nanoid();
        const insuranceRef = doc(db, 'businesses', user.businessID, 'insuranceConfig', id);

        if (insuranceData.id) {
            await updateInsuranceConfig({ ref: insuranceRef, insuranceData });
        } else {
            await addInsuranceConfig({ user, ref: insuranceRef, insuranceData: { id, ...insuranceData } });
        }
        return id;
    } catch (error) {
        console.error('Error saving insurance:', error);
        throw error;
    }
}

export async function listenInsuranceConfig(user, callback, errorCallback) {
    if (!user.businessID) {
        throw new Error('No se encontró un ID de negocio');
    }

    try {
        const insuranceRef = collection(db, 'businesses', user.businessID, 'insuranceConfig');
        return onSnapshot(
            insuranceRef,
            (snapshot) => {
                const data = snapshot.docs.map(doc => (doc.data()));
                callback(data);
            },
            (error) => {
                console.error('Error al escuchar la configuración de seguros:', error);
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        );
    } catch (error) {
        console.error('Error al configurar el listener:', error);
        if (errorCallback) {
            errorCallback(error);
        }
        return () => {}; // Retorna una función vacía en caso de error
    }
}

export const useListenInsuranceConfig = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user?.businessID) {
            setLoading(false);
            return () => {};
        }

        let unsubscribe;
        try {
            unsubscribe = listenInsuranceConfig(
                user, 
                (data) => {
                    setData(data);
                    setLoading(false);
                },
                (error) => {
                    setError(error);
                    setLoading(false);
                }
            );
        } catch (error) {
            console.error('Error al iniciar el listener:', error);
            setError(error);
            setLoading(false);
            return () => {};
        }

        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [user]);

    return { data, loading, error };
};
