import { validateUser } from "../../utils/userValidation"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebaseconfig"
import { nanoid } from "nanoid";

export const fbCreateTaxReceipt = async (taxReceipt, user) => {

  taxReceipt = {
    ...taxReceipt,
    id: nanoid(),
  };

  try {
    validateUser(user)
    const { businessID } = user
    const taxReceiptRef = doc(db, "businesses", businessID, "taxReceipts", taxReceipt.id);

    const docSnap = await getDoc(taxReceiptRef);

    if (docSnap.exists()) {
      console.log("El recibo fiscal con la serie", taxReceipt.id, "ya existe.");
      return;
    }

    await setDoc(taxReceiptRef, { data: taxReceipt });
  } catch (err) {
    console.log(err)
  }
}