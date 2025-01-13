import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseconfig'


/**
 * Cancela una compra en Firebase
 * @param {string} purchaseId - ID de la compra a cancelar
 * @param {string} cancelReason - Motivo de la cancelación
 * @returns {Promise} Promesa que resuelve cuando la compra es cancelada
 */
export const fbCancelPurchase = async (user, purchaseId, cancelReason = '') => {
  try {
    const purchaseRef = doc(db,'businesses', user.businessID, 'purchases', purchaseId)
    
    await updateDoc(purchaseRef, {
      "data.status": 'canceled',
      "data.cancelReason": cancelReason,
      "data.dates.canceledAt": serverTimestamp(),
      "data.dates.updateAt": serverTimestamp()
    })

    return {
      success: true,
      message: 'Compra cancelada exitosamente'
    }
  } catch (error) {
    console.error('Error al cancelar la compra:', error)
    throw {
      success: false,
      message: 'Error al cancelar la compra',
      error
    }
  }
}
