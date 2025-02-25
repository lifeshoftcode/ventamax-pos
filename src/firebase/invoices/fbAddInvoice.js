import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { fbAddBillToOpenCashCount } from "../cashCount/fbAddBillToOpenCashCount";
import { nanoid } from "nanoid";
import { getNextID } from "../Tools/getNextID";
import { fbSetDoc } from "../firebaseOperations";
import { fbGetInvoice } from "./fbGetInvoice";

export const fbAddInvoice = async (data, user) => {
  if (!user || !user.businessID) return

  try {
    const userRef = doc(db, "users", user.uid);
    const nextNumberId = await getNextID(user, 'lastInvoiceId');

    let bill = {
      ...data,
      id: data?.id || nanoid(),
      date: serverTimestamp(),
      numberID: nextNumberId,
      userID: user.uid,
      user: userRef
    }

    const billRef = doc(db, 'businesses', user.businessID, "invoices", bill.id);

    await fbSetDoc(billRef, { data: bill });

    await fbAddBillToOpenCashCount(user, billRef);

    const invoice = await fbGetInvoice(user.businessID, bill.id);

    return invoice.data;
  } catch (error) {
    console.log(error)
  }
}