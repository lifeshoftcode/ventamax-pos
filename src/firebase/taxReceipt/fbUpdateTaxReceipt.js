import { collection, doc, writeBatch, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const fbUpdateTaxReceipt = async (user, taxReceiptArray) => {
    if (!user || !user?.businessID) return;
    
    try {
        const { businessID } = user;
        const taxReceiptsRef = collection(db, "businesses", businessID, "taxReceipts");
        const batch = writeBatch(db);

        // Para cada comprobante en el array
        for (const receipt of taxReceiptArray) {
            if (receipt && receipt.data) {
                const { serie } = receipt.data;
                const taxReceiptRef = doc(taxReceiptsRef, serie);
                
                // CRITICAL FIX: Check if document exists and preserve sequence if it's higher
                let finalSequence = receipt.data.sequence;
                
                try {
                    const existingDoc = await getDoc(taxReceiptRef);
                    if (existingDoc.exists()) {
                        const existingData = existingDoc.data().data;
                        const existingSequence = typeof existingData.sequence === 'number' 
                            ? existingData.sequence 
                            : parseInt(existingData.sequence, 10) || 0;
                        
                        const proposedSequence = typeof receipt.data.sequence === 'number'
                            ? receipt.data.sequence
                            : parseInt(receipt.data.sequence, 10) || 0;
                        
                        // If the existing sequence is higher, preserve it
                        // This prevents sequences from going backwards during updates
                        if (existingSequence > proposedSequence) {
                            finalSequence = existingSequence;
                            console.log(`Preserving higher sequence for ${serie}: ${existingSequence} > ${proposedSequence}`);
                        }
                    }
                } catch (readError) {
                    console.warn(`Could not read existing document for ${serie}:`, readError);
                    // If we can't read the existing document, use the proposed sequence
                }
                
                // Establecer los datos del comprobante con la secuencia preservada
                batch.set(taxReceiptRef, {
                    data: {
                        ...receipt.data,
                        sequence: finalSequence, // Use preserved or proposed sequence
                        id: serie, // Usar la serie como ID para facilitar referencias
                    }
                });
            }
        }

        // Confirmar la transacción por lotes
        await batch.commit();
        console.log("Comprobantes fiscales actualizados con éxito.");
        
    } catch (error) {
        console.error("Error al actualizar los comprobantes fiscales:", error);
        throw error;
    }
};