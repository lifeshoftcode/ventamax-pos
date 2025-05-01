import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { generateNCFCode } from "../../utils/taxReceipt";

export const fbGetAndUpdateTaxReceipt = async (user, taxReceiptName) => {
    try {
        const taxReceiptRef = collection(db, 'businesses', user.businessID, 'taxReceipts');
        const q = query(taxReceiptRef, where('data.name', '==', taxReceiptName));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log('No matching documents found');
            return null;  // Return null or appropriate value if no documents found
        }
        const taxReceiptDoc = querySnapshot.docs[0];
        const docRef = taxReceiptDoc.ref;
        const taxReceiptData = taxReceiptDoc.data();

        const { ncfCode, updatedData } = generateNCFCode(taxReceiptData);

        await updateDoc(docRef, { data: updatedData });
        return ncfCode;  // Returns the NCF code of the first document found

    } catch (error) {
        console.error('Error updating Tax Receipt: ', error);
        return null;  // Return null or appropriate error handling
    }
}
