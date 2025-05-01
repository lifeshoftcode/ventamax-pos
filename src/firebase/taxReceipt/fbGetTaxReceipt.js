import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/userSlice";
import { useEffect, useState } from "react";
import { selectTaxReceiptType } from "../../features/taxReceipt/taxReceiptSlice";

export const fbGetTaxReceipt = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [taxReceipt, setTaxReceipt] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    if (!user.businessID) {
      setTaxReceipt([]);
      setLoading(false);
      return
    }

    const taxReceiptsRef = collection(db, "businesses", user.businessID, "taxReceipts");

    unsubscribe = onSnapshot(
      taxReceiptsRef,
      (snapshot) => {
        let taxReceiptsArray = snapshot.docs.map(item => item.data());
        setTaxReceipt(taxReceiptsArray);
        const defaultOption = taxReceiptsArray.find(item => item.data.name === 'CONSUMIDOR FINAL')
        dispatch(selectTaxReceiptType(defaultOption.data.name))
      },
      (error) => {
        console.error("Error fetching tax receipts: ", error);
        setLoading(false);
        setTaxReceipt([]);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, dispatch]);

  return { taxReceipt, isLoading };
};
