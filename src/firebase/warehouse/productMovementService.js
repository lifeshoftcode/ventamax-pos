import { nanoid } from 'nanoid';
import {
  getAllProductStocks,
  createProductStock,
  updateProductStock,
  deleteProductStock,
  getProductStockByBatch
} from './productStockService';
import { doc, getDocs, query, serverTimestamp, setDoc, where, or, collection, onSnapshot, getDoc, and, orderBy } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { useState, useEffect } from 'react';
import { MovementReason, MovementType } from '../../models/Warehouse/Movement';

// Agregar funciones para crear y leer movimientos
export const createMovementLog = async (
  user,
  {
    sourceLocation,
    destinationLocation,
    productId,
    productName,
    quantity,
    movementType,
    movementReason,  // NEW
    batchId,         // NEW
    notes            // NEW
  }
) => {
  // Usa una colección "movements" para almacenar
  const movementId = nanoid();
  const movementRef = doc(db, 'businesses', user.businessID, 'movements', movementId);

  await setDoc(movementRef, {
    id: movementId,
    createdAt: serverTimestamp(),
    createdBy: user.uid,
    productId,
    productName,
    batchId,          // NEW
    sourceLocation,
    destinationLocation,
    movementType,        // Tipo de movimiento (Entrada/Salida)
    movementReason,    // NEW
    quantity,
    notes,            // NEW
    isDeleted: false
  });
};

export const getMovementsByLocation = async (user, locationId) => {
  if (!locationId) return [];

  try {
    const movementsRef = collection(db, 'businesses', user.businessID, 'movements');

    // Firestore no soporta consultas OR directamente, así que hacemos dos consultas y combinamos
    const sourceQuery = query(
      movementsRef,
      where('sourceLocation', '==', locationId),
      where('isDeleted', '==', false)
    );

    const destinationQuery = query(
      movementsRef,
      where('destinationLocation', '==', locationId),
      where('isDeleted', '==', false)
    );

    const [sourceSnapshot, destinationSnapshot] = await Promise.all([
      getDocs(sourceQuery),
      getDocs(destinationQuery)
    ]);

    const sourceMovements = sourceSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      movementType: 'out' // Cambiado de 'Salida' a 'out'
    }));

    const destinationMovements = destinationSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      movementType: 'in' // Cambiado de 'Entrada' a 'in'
    }));

    // Combinar ambos conjuntos de movimientos
    return [...sourceMovements, ...destinationMovements].sort((a, b) => {
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });
  } catch (error) {
    console.error('Error al obtener movimientos por ubicación:', error);
    throw error;
  }
};

export const moveProduct = async ({
  user,
  productId,
  batchId,         // New parameter
  productName,
  quantityToMove,
  sourceLocation,
  destinationLocation
}) => {
  // 1. Fetch stocks with location filter
  const matchingStocks = await getProductStockByBatch(user, {
    productId,
    batchId,
    location: sourceLocation
  });

  // 2. Find source doc (now simpler since filtered by location)
  const sourceDoc = matchingStocks[0];

  if (!sourceDoc || sourceDoc.stock < quantityToMove) {
    throw new Error('Stock insuficiente en ubicación origen');
  }

  // 3. Update source
  const updatedSource = { ...sourceDoc, quantity: sourceDoc.quantity - quantityToMove };
  updatedSource.quantity === 0 
  ? await deleteProductStock(user, updatedSource.id)
  : await updateProductStock(user, updatedSource);
 

  // Registrar movimiento
  await createMovementLog(user, {
    sourceLocation,
    destinationLocation,
    productId: sourceDoc.productId,
    productName: sourceDoc.productName,
    quantity: quantityToMove,
    movementType: MovementType.Exit,
    movementReason: MovementReason.Transfer, 
    batchId,
    notes: ''
  });

  // 4. Find destination stocks
  const destinationStocks = await getProductStockByBatch(user, {
    productId,
    batchId,
    location: destinationLocation
  });
  const destinationDoc = destinationStocks[0];

  if (destinationDoc) {
    await updateProductStock(user, {
      ...destinationDoc,
      quantity: destinationDoc.quantity + quantityToMove
    });
  } else {
    const newDestData = {
      ...sourceDoc,
      location: destinationLocation,
      quantity: quantityToMove,
      isDeleted: false,
      productId,
      productName
    };

    await createProductStock(user, newDestData);
  }

  return { success: true };
};

// Función helper para obtener nombre de ubicación
export const getLocationName = async (user, locationId) => {
  if (!locationId) return 'N/A';
  try {
    const [warehouseId, shelfId, rowId, segmentId] = locationId.split('/');

    if (segmentId) {
      const segmentDoc = await getDoc(doc(db, 'businesses', user.businessID, 'segments', segmentId));
      if (segmentDoc.exists()) return segmentDoc.data().name;
    }
    if (rowId) {
      const rowDoc = await getDoc(doc(db, 'businesses', user.businessID, 'rows', rowId));
      if (rowDoc.exists()) return rowDoc.data().name;
    }
    if (shelfId) {
      const shelfDoc = await getDoc(doc(db, 'businesses', user.businessID, 'shelves', shelfId));
      if (shelfDoc.exists()) return shelfDoc.data().name;
    }
    if (warehouseId) {
      const warehouseDoc = await getDoc(doc(db, 'businesses', user.businessID, 'warehouses', warehouseId));
      if (warehouseDoc.exists()) return warehouseDoc.data().name;
    }
    return 'Ubicación no encontrada';
  } catch (error) {
    console.error('Error getting location name:', error);
    return 'Error al obtener ubicación';
  }
};

// Hook modificado para incluir la comparación con params
export const useListenMovementsByLocation = (user, locationId, currentLocationId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('useListenMovementsByLocation:', { locationId, currentLocationId });

  useEffect(() => {
    if (!user || !locationId) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const movementsRef = collection(db, 'businesses', user.businessID, 'movements');

     const q = query(
      movementsRef,
      and(
        or(
          where('sourceLocation', '==', locationId),
          where('destinationLocation', '==', locationId)
        ),
        where('isDeleted', '==', false)
      ),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const movementsPromises = snapshot.docs.map(async (doc) => {
        const movement = doc.data();

        // Si el currentLocationId coincide con sourceLocation es una salida
        // Si coincide con destinationLocation es una entrada

        console.log('Checking movement:', movement);
        console.log('Current Location:', currentLocationId);
        console.log('Source Location:', movement.sourceLocation);
        console.log('Destination Location:', movement.destinationLocation);

        let movementType;

        /*
            Paso 1: Verificar si coincide con ambas.
            - Si coincide con ambas y NO quieres tratarlo como "internal", 
              podrías marcarlo como "unknown" o manejarlo de otra forma.
        */
        if (
          currentLocationId === movement.sourceLocation &&
          currentLocationId === movement.destinationLocation
        ) {
          movementType = 'unknown'; // o un tipo especial si lo necesitas
        }
        /*
            Paso 2: Verificar explícitamente si coincide con Source y a la vez
            es diferente de Destination para evitar falsos positivos de entrada.
        */
        else if (
          currentLocationId === movement.sourceLocation &&
          currentLocationId !== movement.destinationLocation
        ) {
          movementType = 'out'; // Movimiento de salida
        }
        /*
            Paso 3: Verificar explícitamente si coincide con Destination y a la vez
            es diferente de Source para evitar falsos positivos de salida.
        */
        else if (
          currentLocationId === movement.destinationLocation &&
          currentLocationId !== movement.sourceLocation
        ) {
          movementType = 'in'; // Movimiento de entrada
        }
        /*
            Paso 4: Caso desconocido
        */
        else {
          movementType = 'unknown';
        }

        console.log('Movement Type:', movementType);



        const [sourceName, destName] = await Promise.all([
          getLocationName(user, movement.sourceLocation),
          getLocationName(user, movement.destinationLocation)
        ]);

        return {
          ...movement,
          id: doc.id,
          movementType,
          sourceLocationName: sourceName,
          destinationLocationName: destName
        };
      });

      const movements = await Promise.all(movementsPromises);
      setData(movements);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, locationId, currentLocationId]);

  return { data, loading };
};