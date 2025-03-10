import { collection, onSnapshot, runTransaction, doc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/userSlice";
import { validateUser } from "../../utils/userValidation";
import { useEffect } from "react";
import { taxReceiptDefault } from "./taxReceiptsDefault";
import { getTaxReceiptData } from "../../features/taxReceipt/taxReceiptSlice";
import { removeDuplicateTaxReceipts } from "./removeDuplicateTaxReceipts";

export const fbAutoCreateDefaultTaxReceipt = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
  
    useEffect(() => {
      if (!user || !user.businessID) return;
  
      const taxReceiptsRef = collection(db, "businesses", user.businessID, "taxReceipts");
  
      const unsubscribe = onSnapshot(taxReceiptsRef, async (snapshot) => {
        // Si hay documentos, primero eliminamos duplicados
        if (!snapshot.empty) {
          try {
            await removeDuplicateTaxReceipts(user.businessID);
          } catch (err) {
            console.error("Error al eliminar duplicados:", err);
          }
        } else {
          // Si la colección está vacía, crear los recibos fiscales por defecto
          try {
            await runTransaction(db, async (transaction) => {
              for (const item of taxReceiptDefault) {
                const serie = item.serie;
                const taxReceiptRef = doc(db, "businesses", user.businessID, "taxReceipts", serie);
                const docSnapshot = await transaction.get(taxReceiptRef);
                if (!docSnapshot.exists()) {
                  validateUser(user);
                  transaction.set(taxReceiptRef, {
                    data: { ...item, id: serie, createdAt: serverTimestamp() },
                  });
                }
              }
            });
            console.log("Los recibos fiscales por defecto fueron creados o ya existían.");
          } catch (err) {
            console.error("Error en la transacción al crear los recibos por defecto:", err);
          }
          return; // Finalizamos si se crearon los documentos por defecto
        }
  
        // Luego, actualizamos el estado con la data (ya limpia de duplicados)
        const taxReceiptsArray = snapshot.docs.map((doc) => doc.data());
        dispatch(getTaxReceiptData(taxReceiptsArray));
      });
  
      return () => {
        unsubscribe();
      };
    }, [user, dispatch]);
  
    return null;
  };
