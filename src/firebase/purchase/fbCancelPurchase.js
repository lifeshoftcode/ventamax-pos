import { doc, getDoc, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../firebaseconfig'

/**
 * Cancela una compra en Firebase
 * @param {string} purchaseId - ID de la compra a cancelar
 * @param {string} cancelReason - Motivo de la cancelación
 * @returns {Promise} Promesa que resuelve cuando la compra es cancelada
 */
export const fbCancelPurchase = async (user, purchaseId) => {

  if (!user || !user?.businessID) {
    console.warn('Usuario no autenticado');
    return { success: false, message: 'Usuario no autenticado' }
  }

  const purchaseRef = doc(db, 'businesses', user.businessID, 'purchases', purchaseId);

  try {
    const purchaseSnap = await getDoc(purchaseRef);
    if(!purchaseSnap.exists()) {
      console.warn('Compra no encontrada');
      return { success: false, message: 'Compra no encontrada' }
    }
    const purchaseData = purchaseSnap.data();

    const backOrdersToRelease = [];
    if(purchaseData.replenishments) {
      purchaseData.replenishments.forEach(item => {
        if(item.selectedBackOrders && item.selectedBackOrders.length > 0) {
          item.selectedBackOrders.forEach(bo => backOrdersToRelease.push(bo.id));
        }
      });
    }

    const batch = writeBatch(db);

    backOrdersToRelease.forEach(boId => {
      const backOrderRef = doc(db, 'businesses', user.businessID, 'backOrders', boId);
      batch.update(backOrderRef, {
        'status': 'pending',
        'reservedBy': null,
        'reservedAt': null,
        'purchaseId': null,
        'updatedAt': serverTimestamp(),
        'updatedBy': user.uid
      });
    });

    batch.update(purchaseRef, {
      'status': 'canceled',
      'canceledAt': serverTimestamp(),
      'updatedAt': serverTimestamp(),
      'updatedBy': user.uid
    });

    if (purchaseData.orderId) {
      const orderRef = doc(db, 'businesses', user.businessID, 'orders', purchaseData.orderId);
      batch.update(orderRef, {
        status: 'canceled',
        canceledAt: serverTimestamp(), // Opcional: registrar la fecha de cancelación del pedido
        updatedAt: serverTimestamp(),
        updatedBy: user.uid
      });
    }

    await batch.commit();

 
    console.log(`Compra ${purchaseId} cancelada exitosamente, back orders liberados y pedido cancelado.`);
    return { success: true, message: 'Compra y pedido cancelados exitosamente' };

  } catch (error) {
    console.error('Error al cancelar la compra:', error)
    throw {
      success: false,
      message: 'Error al cancelar la compra',
      error
    }
  }
}
