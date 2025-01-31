import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseconfig";

export const fbSignOut = async () => {
    // Limpiar sesión nueva
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
        await deleteDoc(doc(db, 'sessionTokens', sessionToken));
    }

    localStorage.removeItem('sessionToken');
};