import { collection, doc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebaseconfig"
import { useEffect, useState } from "react";
import { selectUser } from "../../features/auth/userSlice";
import { useSelector } from "react-redux";
import { fbGetDocs } from "../firebaseOperations";

export function useIsOpenCashReconciliation() {
    const [value, setValue] = useState(false);
    const [cashReconciliation, setCashReconciliation] = useState(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user || !user?.businessID) { 
            setValue('none');
            setCashReconciliation(null);
            return;
        }
        
        const cashReconciliationRef = collection(db, 'businesses', user?.businessID, 'cashCounts');
        const q = query(cashReconciliationRef, where("cashCount.state", "in", ["open", "closing"]));

        const unsubscribe = onSnapshot(q,
            querySnapshot => {
                const isEmpty = querySnapshot.empty;
                
                if (isEmpty) {
                    setValue('none');
                    setCashReconciliation(null);
                    return;
                }
                
                // Find the document that belongs to the current user
                const userDoc = querySnapshot.docs.find(doc => {
                    const data = doc.data();
                    return data.cashCount?.opening?.employee?.id === user.uid;
                });
                
                if (!userDoc) {
                    setValue('closed');
                    setCashReconciliation(null);
                    return;
                }
                
                const cashCountData = userDoc.data().cashCount;
                setCashReconciliation(cashCountData);
                
                if (cashCountData.state === 'open') {
                    setValue('open');
                } else if (cashCountData.state === 'closing') {
                    setValue('closing');
                } else {
                    setValue('closed');
                }
            },
            error => {
                console.error("Error en la suscripción a Firestore: ", error);
                setValue('error');
                setCashReconciliation(null);
            }
        );

        // Cuando el componente se desmonta, cancela la suscripción
        return () => unsubscribe();
    }, [user?.uid, user?.businessID]); // Fix dependencies

    return { status: value, cashCount: cashReconciliation };
}

export async function checkOpenCashReconciliation(user) {
    try {
        if (!user || !user.businessID || !user.uid) {
            throw new Error('Datos del usuario incompletos');
        }
        const employeeRef = doc(db, 'users', user.uid);

        const cashReconciliationRef = collection(db, 'businesses', user.businessID, 'cashCounts');

        const q = query(cashReconciliationRef,
            where("cashCount.state", "in", ["open", "closing"]),
            where("cashCount.opening.employee", "==", employeeRef)
        );
        
        const querySnapshot = await fbGetDocs(q);

        if (querySnapshot.empty) {
            return { state: 'none', cashCount: null };
        }
        const cashCountOpen = (doc) => doc.data().cashCount.state === 'open';
        const cashCountClosing = (doc) => doc.data().cashCount.state === 'closing';

        const cashCountDoc = querySnapshot.docs.find(doc => cashCountOpen(doc) || cashCountClosing(doc));

        if (!cashCountDoc) {
            return { state: 'closed', cashCount: null };
        }

        if (cashCountOpen(cashCountDoc)) {
            return { state: 'open', cashCount: cashCountDoc.data().cashCount };
        } else if (cashCountClosing(cashCountDoc)) {
            return { state: 'closing', cashCount: cashCountDoc.data().cashCount };
        } else {
            return { state: 'closed', cashCount: null };
        }
    } catch (error) {
        console.error("Error al consultar Firestore: ", error);
        throw error; // Re-lanza el error para manejarlo más adelante si es necesario
    }
}

