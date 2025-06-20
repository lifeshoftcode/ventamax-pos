import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { selectUser } from "../../features/auth/userSlice";
import { db } from "../firebaseconfig";

export const useFbGetInvoicesByClient = (clientId) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user?.businessID || !clientId) {
            setInvoices([]);
            return;
        }

        setLoading(true);

        const invoicesRef = collection(db, 'businesses', user.businessID, 'invoices');
        const q = query(
            invoicesRef,
            where('data.client.id', '==', clientId),
            orderBy('data.date', 'desc')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                if (snapshot.empty) {
                    setInvoices([]);
                    setLoading(false);
                    return;
                }
                const invoicesData = snapshot.docs.map((doc) => doc.data().data);
                setInvoices(invoicesData);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching invoices by client:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user?.businessID, clientId]);

    return { invoices, loading };
}; 