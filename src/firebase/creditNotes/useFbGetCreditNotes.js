import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { selectUser } from "../../features/auth/userSlice";
import { db } from "../firebaseconfig";

export const useFbGetCreditNotes = () => {
  const user = useSelector(selectUser);
  const [creditNotes, setCreditNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.businessID) {
      setCreditNotes([]);
      return;
    }

    setLoading(true);

    const creditNotesRef = collection(db, "businesses", user.businessID, "creditNotes");
    const q = query(creditNotesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => doc.data());
        setCreditNotes(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching credit notes:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.businessID]);

  return { creditNotes, loading };
}; 