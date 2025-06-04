
import { deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseconfig';

export const cleanInventoryData = async (businessID) => {
    if (!businessID) throw new Error('BusinessID es requerido');

    const collectionsToClean = [
        'products',
        'backOrders',
        'productsStock',
        'movements',
        'batches',
        'categories',
        'invoices'
    ];

    try {
        for (const collectionName of collectionsToClean) {
            const q = query(collection(db, 'businesses', businessID, collectionName));

            const querySnapshot = await getDocs(q);
            
            const deletePromises = querySnapshot.docs.map(doc => 
                deleteDoc(doc.ref)
            );

            await Promise.all(deletePromises);
        }

        return { success: true, message: 'Datos limpiados exitosamente' };
    } catch (error) {
        console.error('Error al limpiar datos:', error);
        throw error;
    }
};
