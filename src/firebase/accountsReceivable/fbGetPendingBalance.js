import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useCallback, useState, useEffect } from "react";

export function fbGetPendingBalance(businessID, clientId, callback) {
    if (!businessID || !clientId || clientId === "GC-0000") {
        callback(0);
        return () => {};
    }

    const accountsReceivableRef = collection(db, `businesses/${businessID}/accountsReceivable`);
    const q = query(accountsReceivableRef, where('clientId', '==', clientId));

    try {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.empty) {
                callback(0);
                return;
            }

            let totalPendingBalance = 0;
            querySnapshot.forEach(doc => {
                const data = doc.data();
                totalPendingBalance += Number(data.arBalance) || 0;
            });

            callback(totalPendingBalance);
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error getting documents: ', error);
        callback(0);
        return () => {};
    }
}

function usePendingBalance(businessID, clientId, onBalanceChange = null) {
    const [pendingBalance, setPendingBalance] = useState(0);

    const handleBalanceUpdate = useCallback((balance) => {
        setPendingBalance(prevBalance => {
            // Solo actualizar si el valor ha cambiado
            if (prevBalance === balance) return prevBalance;
            
            // Si hay callback externo, solo llamar si el valor cambió
            if (onBalanceChange && typeof onBalanceChange === 'function') {
                onBalanceChange(balance);
            }
            
            return balance;
        });
    }, [onBalanceChange]);

    useEffect(() => {
        if (!businessID || !clientId || clientId === "GC-0000") {
            setPendingBalance(0);
            if(onBalanceChange) onBalanceChange(0);
            return;
        }

        const unsubscribe = fbGetPendingBalance(businessID, clientId, handleBalanceUpdate);
        return () => unsubscribe();
    }, [businessID, clientId, handleBalanceUpdate]);

    return pendingBalance;
}

export { usePendingBalance };
