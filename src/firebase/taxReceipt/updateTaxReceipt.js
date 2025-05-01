import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig"; // Assuming firebaseconfig.js is in the parent directory

/**
 * Actualiza un comprobante fiscal existente.
 * @param {string} businessID  id del negocio
 * @param {string} receiptID   id del comprobante (document.id)
 * @param {object} data        campos a actualizar
 */
/**
 * Updates specific fields of an existing tax receipt document in Firestore.
 *
 * @async
 * @function fbUpdateSingleTaxReceipt
 * @param {string} businessID - The ID of the business collection.
 * @param {string} receiptID - The document ID of the tax receipt to update.
 * @param {object} dataToUpdate - An object containing the fields and values to update.
 * @throws {Error} Throws an error if the update operation fails or inputs are invalid.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 */
export const updateTaxReceipt = async (user, data) => {
    // Input validation
    if (!user?.businessID || typeof user?.businessID !== 'string') {
        throw new Error("Invalid businessID provided.");
    }
    if (!data || typeof data?.id !== 'string') {
        throw new Error("Invalid or empty data provided for update.");
    }

    try {
        const receiptRef = doc(db, "businesses", user.businessID, "taxReceipts", data.id);

        await updateDoc(receiptRef, {data});
        console.log(`Tax receipt ${data.id} updated successfully.`);

    } catch (error) {
        console.error(`Error updating tax receipt ${data.id}:`, error);
        throw new Error(`Failed to update tax receipt ${data.id}.`);
    }
};