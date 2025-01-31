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
  increment,
  runTransaction,
} from 'firebase/firestore';
import { MovementReason, MovementType } from '../../models/Warehouse/Movement';
import { createMovementLog } from './productMovementService';
import { checkAndDeleteEmptyBatch } from './batchService';

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

export const deleteAllProductStocksByBatch = async ({ user, batchId, movement }) => {
  try {
    // 1. Obtener todos los productStock del batch
    const batchStocks = await getProductStockByBatch(user, { batchId });

    // 2. Eliminar cada registro con su movimiento asociado
    const deletionPromises = batchStocks.map(stock =>
      deleteProductStock({
        user,
        productStockId: stock.id,
        movement: {
          ...movement,
          quantity: stock.quantity,
          notes: `${movement.notes || ''} - Eliminación por batch ${batchId}`
        }
      })
    );

    // 3. Ejecutar todas las eliminaciones en paralelo
    const results = await Promise.all(deletionPromises);

    return {
      batchId,
      deletedItems: results.length,
      quantity: batchStocks.reduce((sum, stock) => sum + stock.quantity, 0)
    };

  } catch (error) {
    console.error(`Error eliminando productStocks del batch ${batchId}:`, error);
    throw error;
  }
};

export const deleteProductStock = async ({ user, productStockId, movement = {} }) => {
  if (!user?.businessID || !productStockId) {
    throw new Error('Missing required parameters: user.businessID or productStockId');
  }

  try {
    const { businessID, uid } = user;
    const stockRef = doc(db, 'businesses', businessID, 'productsStock', productStockId);

    // 1. Validate stock document exists
    const stockDoc = await getDoc(stockRef);
    if (!stockDoc.exists()) {
      throw new Error('Stock record not found');
    }

    const stockData = stockDoc.data();
    const {
      batchId,
      productId,
      location,
      productName,
      batchNumberId,
      quantity: stockQuantity
    } = stockData;

    // 2. Validate required data
    if (!batchId || !productId) {
      throw new Error('Invalid stock record - missing batch or product reference');
    }

    // 3. Get references
    const batchRef = doc(db, 'businesses', businessID, 'batches', batchId);
    const productRef = doc(db, 'businesses', businessID, 'products', productId);

    // 4. Validate batch exists
    const batchDoc = await getDoc(batchRef);
    if (!batchDoc.exists()) {
      throw new Error('Associated batch not found');
    }

    // 5. Validate quantity
     const quantityToRemove = movement?.quantity || stockQuantity;
    // if (quantityToRemove <= 0 || quantityToRemove > stockQuantity) {
    //   throw new Error('Cantidad a eliminar inválida');
    // }

    // 6. Check if batch will be empty
    const productStocksRef = collection(db, 'businesses', businessID, 'productsStock');
    const stocksQuery = query(
      productStocksRef,
      where('batchId', '==', batchId),
      where('isDeleted', '==', false)
    );
    const otherStocksSnap = await getDocs(stocksQuery);
    const willBatchBeEmpty = otherStocksSnap.size <= 1;

    // 7. Perform updates (no transacciones: cada operación es individual)
    // 7a. Decrementa stock en el producto
    await updateDoc(productRef, {
      stock: increment(-quantityToRemove)
    });

    // 7b. Decrementa stock en el batch
    await updateDoc(batchRef, {
      quantity: increment(-quantityToRemove)
    });

    // 7c. Marca el stock actual como eliminado
    await updateDoc(stockRef, {
      isDeleted: true,
      quantity: 0,
      deletedAt: serverTimestamp(),
      deletedBy: uid
    });

    // 7d. Si ya no hay stock de ese batch, márcalo como eliminado
    if (willBatchBeEmpty) {
      await updateDoc(batchRef, {
        isDeleted: true,
        deletedAt: serverTimestamp(),
        deletedBy: uid
      });
      await updateDoc(productRef, {
        stock: 0
      })
    }

    // 8. Create movement record
    const movementId = nanoid();
    const movementRef = doc(db, 'businesses', businessID, 'movements', movementId);

    await setDoc(movementRef, {
      id: movementId,
      sourceLocation: location || '',
      destinationLocation: 'deleted',
      productId,
      productName: productName || '',
      quantity: quantityToRemove,
      movementType: MovementType.Exit,
      movementReason: movement?.reason ?? MovementReason.Adjustment,
      batchId,
      batchNumberId: batchNumberId || '',
      notes: movement?.notes || 'Eliminación de stock',
      createdAt: serverTimestamp(),
      createdBy: uid,
      isDeleted: false
    });

    // 9. Retorna el id del stock eliminado
    return productStockId;
  } catch (error) {
    console.error('Error al marcar el documento como eliminado: ', error);
    throw error;
  }
};


// Escuchar en tiempo real todos los productos en stock filtrados por productId
export const listenAllProductStock = (user, productId, callback) => {
  const noOp = () => { };

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
  const noOp = () => { };

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
