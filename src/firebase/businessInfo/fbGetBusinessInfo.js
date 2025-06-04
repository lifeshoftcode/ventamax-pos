import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig";

/**
 * Subscribes to real-time updates of a business document in Firestore.
 *
 * @param {string} businessID - Firestore document ID of the business.
 * @param {Function} dispatch - Redux dispatch function.
 * @returns {Function} Unsubscribe callback to stop listening.
 */
export const subscribeToBusinessInfo = (businessID, onNext, onError = console.error) => {
    if (typeof businessID !== "string" || !businessID.trim()) {
        console.warn("subscribeToBusinessInfo: businessID inválido");
        return () => { };
    }
    if (typeof onNext !== "function") {
        console.warn("subscribeToBusinessInfo: onNext no es una función");
        return () => { };
    }

    const businessRef = doc(db, "businesses", businessID);

    const unsubscribe = onSnapshot(
        businessRef,
        (snapshot) => {
            if (!snapshot.exists()) {
                console.info(`Negocio ${businessID} no encontrado.`);
                onNext(null);
                return;
            }
            const business = snapshot.get("business") ?? null;
            
            onNext(business);
        },
        (err) => {
            onError(err);
            onNext(null);
        }
    );

    return unsubscribe;
};
