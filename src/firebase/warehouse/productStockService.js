// productStockService.js
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';
import { nanoid } from '@reduxjs/toolkit';
import { db } from '../firebaseconfig';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  setDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';

// Obtener referencia de la colección de productos en stock
export const getProductStockCollectionRef = (businessID) => {
  if (!businessID) {
    console.warn('businessID is empty. Skipping collection reference.');
    return null; // Return early or handle gracefully
  }
  return collection(db, 'businesses', businessID, 'productsStock');
};

// Crear un nuevo producto en stock
export const createProductStock = async (user, productStockData) => {
  const id = nanoid();

  try {
    const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
    if (!productStockCollectionRef) return; // If null, do not proceed

    const productStockDocRef = doc(productStockCollectionRef, id);
    console.log("product stock: ", productStockData);
    await setDoc(productStockDocRef, {
      ...productStockData,
      id,
      createdAt: serverTimestamp(),
      createdBy: user.uid,
      updatedAt: serverTimestamp(),
      updatedBy: user.uid,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
    });

    return { ...productStockData, id };
  } catch (error) {
    console.error('Error al añadir el documento: ', error);
    throw error;
  }
};

// Leer todos los productos en stock
export const getAllProductStocks = async (user) => {
  try {
    const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
    if (!productStockCollectionRef) return []; // If null, return empty array

    const querySnapshot = await getDocs(productStockCollectionRef);
    const productsStock = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      productId: doc.data().productId, // Ensure productId is included
      location: doc.data().location, // Ensure location is included
      stock: doc.data().stock, // Ensure stock is included
      ...doc.data(),
    }));
    return productsStock;
  } catch (error) {
    console.error('Error al obtener documentos: ', error);
    throw error;
  }
};

// Actualizar un producto en stock
export const updateProductStock = async (user, data) => {
  try {
    const productStockDocRef = doc(db, 'businesses', user.businessID, 'productsStock', data.id);
    await updateDoc(productStockDocRef, {
      ...data,
      updatedAt: serverTimestamp(),
      updatedBy: user.uid,
    });
    return { data };
  } catch (error) {
    console.error('Error al actualizar el documento: ', error);
    throw error;
  }
};

// Marcar un producto en stock como eliminado
export const deleteProductStock = async (user, id) => {
  try {
    const productStockDocRef = doc(db, 'businesses', user.businessID, 'productsStock', id);
    await updateDoc(productStockDocRef, {
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

// Escuchar en tiempo real todos los productos en stock filtrados por productId
export const listenAllProductStock = (user, productId, callback) => {
  try {
    const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
    if (!productStockCollectionRef) return; // If null, do not proceed

    const q = query(
      productStockCollectionRef,
      where('productId', '==', productId),
      where('isDeleted', '==', false)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        callback(data);
      },
      (error) => {
        console.error('Error al escuchar documentos en tiempo real:', error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Error al escuchar documentos en tiempo real:', error);
    throw error;
  }
};

// Escuchar en tiempo real todos los productos en stock por ubicación
export const listenAllProductStockByLocation = (user, location, callback) => {
  if (!location) {
    console.warn('location is undefined or empty. Skipping listener.');
    return () => {}; // Return no-op function
  }
  const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
  if (!productStockCollectionRef) return () => {}; // No-op if collection ref is null

  let q = query(
    productStockCollectionRef,
    where('location', '==', location),
    where('isDeleted', '==', false)
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      callback(data);
    },
    (error) => {
      console.error('Error al escuchar documentos en tiempo real:', error);
    }
  );

  return unsubscribe; // Return the actual unsubscribe
};

// Hook para escuchar productos en stock por ubicación
export const useListenProductsStockByLocation = (location = null) => {
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si no hay location.id o no hay user, limpiamos y salimos.
    if (!location || !user) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = listenAllProductStockByLocation(
      user,
      location,
      (updatedProducts) => {
        setData(updatedProducts);
        setLoading(false);
      }
    );

    // Limpiamos el listener al desmontar
    return () => unsubscribe();
  }, [user, location]);

  return { data, loading };
};

// Hook para escuchar productos en stock por producto
export const useListenProductsStock = (productId = null) => {
  const user = useSelector(selectUser);
  const stableUser = useMemo(() => user, [user]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId || !stableUser) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = listenAllProductStock(stableUser, productId, (newData) => {
      setData((prevData) => {
        if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
          return newData;
        }
        return prevData;
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [stableUser, productId]);

  return { data, loading };
};

/* ==========================
   Exportación de Servicios
========================== */

export const getProductStockByBatch = async (
  user,
  { productId, batchId, location } = {}
) => {
  console.log("businessId: ", user.businessID);
  console.log("productId: ", productId);
  console.log("batchId: ", batchId);
  console.log("location: ", location);

  const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
  if (!productStockCollectionRef) return [];

  // Armamos los filtros dinámicamente
  const filters = [where('isDeleted', '==', false)];

  if (productId) {
    filters.push(where('productId', '==', productId));
  }

  if (batchId) {
    filters.push(where('batchId', '==', batchId));
  }

  if (location) {
    filters.push(where('location', '==', location));
  }

  // Creamos la query con todos los filtros
  const q = query(productStockCollectionRef, ...filters);

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

