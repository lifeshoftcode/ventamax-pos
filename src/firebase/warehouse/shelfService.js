import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';
import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { db } from '../firebaseconfig';
import {
    collection,
    updateDoc,
    doc,
    serverTimestamp,
    onSnapshot,
    setDoc,
    query,
    where,
    orderBy,
    getDocs,
} from 'firebase/firestore';

// Obtener referencia de la colección de estantes de un almacén
const getShelfCollectionRef = (businessId) => {
    if (typeof businessId !== 'string' || !businessId) {
        console.error("Invalid parameter passed to getShelfCollectionRef", businessId);
        return;
    }
    return collection(db, 'businesses', businessId, 'shelves');
};

// Crear un nuevo estante
const createShelf = async (user, warehouseId, data) => {
    const id = nanoid();
    console.log('data', data);
    try {
        const shelfCollectionRef = getShelfCollectionRef(user.businessID);
        const shelfDocRef = doc(shelfCollectionRef, id);

        await setDoc(shelfDocRef, {
            ...data,
            id,
            warehouseId,
            createdAt: serverTimestamp(),
            createdBy: user.uid,
            updatedAt: serverTimestamp(),
            updatedBy: user.uid,
            isDeleted: false,
            deletedAt: null,
            deletedBy: null,
        });

        return data;
    } catch (error) {
        console.error('Error al añadir el documento: ', error);
        throw error;
    }
};

// Leer todos los estantes de un almacén específico
const getShelves = async (user, warehouseId) => {
    try {
        const shelfCollectionRef = getShelfCollectionRef(user.businessID);
        const q = query(shelfCollectionRef, where('warehouseId', '==', warehouseId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
        console.error('Error al obtener estantes:', error);
        throw error;
    }
};

// Escuchar en tiempo real todos los estantes de un almacén específico
const listenAllShelves = (user, warehouseId, callback, onError) => {
    const shelfCollectionRef = getShelfCollectionRef(user.businessID);
    const q = query(shelfCollectionRef, where('isDeleted', "==", false), where('warehouseId', "==", warehouseId));

    return onSnapshot(
        q,
        (snapshot) => {
            const shelves = snapshot.docs.map((doc) => doc.data());
            const order = shelves.sort((a, b) => a.createdAt - b.createdAt);
            callback(order);
        },
        (error) => {
            if (onError) {
                onError(error);
            }
        }
    );
};

// Actualizar un estante
const updateShelf = async (user, data) => {
    try {
        const shelfDocRef = doc(db, 'businesses', user.businessID, 'shelves', data.id);
        await updateDoc(shelfDocRef, {
            ...data,
            updatedAt: serverTimestamp(),
            updatedBy: user.uid,
        });
        return data;
    } catch (error) {
        console.error('Error al actualizar el documento: ', error);
        throw error;
    }
};

// Marcar un estante como eliminado
const deleteShelf = async (user, id) => {
    try {
        const shelfDocRef = doc(db, 'businesses', user.businessID, 'shelves', id);
        await updateDoc(shelfDocRef, {
            isDeleted: true,
            deletedAt: serverTimestamp(),
            deletedBy: user.uid,
        });
        return id;
    } catch (error) {
        console.error('Error al marcar el documento como eliminado: ', error);
        throw error;
    }
};

const useListenShelves = (warehouseId) => {
    const user = useSelector(selectUser);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (warehouseId && user?.businessID) {
            setLoading(true); // Iniciar el estado de carga
            const unsubscribe = listenAllShelves(
                user,
                warehouseId,
                (data) => {
                    setData(data);
                    setLoading(false);
                },
                (error) => {
                    setError(error);
                    setLoading(false);
                });
            return () => unsubscribe(); // Cleanup al desmontar
        }
    }, [warehouseId, user]);

    return { data, loading, error };
};

export {
    createShelf,
    getShelves,
    listenAllShelves,
    updateShelf,
    deleteShelf,
    useListenShelves // Ensure this is only exported once
};