import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig";

export const subscribeSinglePurchase = (businessID, purchaseId, callback) => {
    const docRef = doc(db, 'businesses', businessID, 'purchases', purchaseId);
    return onSnapshot(docRef, callback);
};
