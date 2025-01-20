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
  getDoc,
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

    // Asegurarse de que location esté en el formato 'warehouse/shelf/row/segment'
    const { warehouse, shelf, row, segment } = productStockData.location; // Asumiendo que location es un objeto
    const locationPath = [warehouse, shelf, row, segment].filter(Boolean).join('/');

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

    return productStockData;
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
    const productsStock = querySnapshot.docs.map((doc) => doc.data());
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
  const noOp = () => {};
  
  if (!user || !productId || !callback) {
    console.warn('Missing required parameters in listenAllProductStock');
    return noOp;
  }

  try {
    const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
    if (!productStockCollectionRef) {
      console.warn('No collection reference available');
      return noOp;
    }

    const q = query(
      productStockCollectionRef,
      where('productId', '==', productId),
      where('isDeleted', '==', false)
    );

    return onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        callback(data);
      },
      (error) => {
        console.error('Error al escuchar documentos en tiempo real:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error al configurar listener:', error);
    return noOp;
  }
};

// Escuchar en tiempo real todos los productos en stock por ubicación
export const listenAllProductStockByLocation = (user, location, callback) => {
  const noOp = () => {};

  if (!user || !location || !callback) {
    console.warn('Missing required parameters in listenAllProductStockByLocation');
    return noOp;
  }

  try {
    const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
    if (!productStockCollectionRef) {
      console.warn('No collection reference available');
      return noOp;
    }

    const q = query(
      productStockCollectionRef,
      where('location', '==', location),
      where('isDeleted', '==', false)
    );

    return onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        callback(data);
      },
      (error) => {
        console.error('Error al escuchar documentos en tiempo real:', error);
        callback([]);
      }
    );
  } catch (error) {
    console.error('Error al configurar listener:', error);
    return noOp;
  }
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

export const getProductStockByProductId = async (
  user,
  { productId } = {}
) => {
  console.log("Fetching stock for productId:", productId); // Debugging log
  const productStockCollectionRef = getProductStockCollectionRef(user.businessID);
  if (!productStockCollectionRef) return [];

  const q = query(
    productStockCollectionRef,
    where('isDeleted', '==', false),
    where('productId', '==', productId)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => doc.data());
  console.log('Fetched product stock:', data); // Debugging log
  return data;
};

// Obtener producto en stock por su ID
export const getProductStockById = async (user, productStockId) => {
  if (!productStockId) return null;

  try {
    const productStockDocRef = doc(db, 'businesses', user.businessID, 'productsStock', productStockId);
    const snapshot = await getDoc(productStockDocRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    console.error('Error al obtener producto en stock por ID:', error);
    throw error;
  }
};
