import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseconfig";

/**
 * Obtiene la lista de negocios de una sola vez (sin listener)
 * @returns {Promise<Array>} Array con la lista de negocios
 */
export const fbGetBusinessesList = async () => {
    try {
        const businessesRef = collection(db, "businesses");
        const snapshot = await getDocs(businessesRef);
        
        const businesses = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return businesses;
    } catch (error) {
        console.error("Error al obtener la lista de negocios:", error);
        return [];
    }
};
