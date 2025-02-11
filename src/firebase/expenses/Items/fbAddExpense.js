import { Timestamp, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "../../firebaseconfig";
import { fbUploadFile } from "../../img/fbUploadFileAndGetURL";
import DateUtils from "../../../utils/date/dateUtils";
import { getNextID } from "../../Tools/getNextID";

export const fbAddExpense = async (user, setLoading, expense, receiptImage, ) => {
    try {
        setLoading({ isOpen: true, message: "Iniciando proceso de registro de gasto..." });

        if (!user.businessID) {      
            throw new Error("No businessID provided");
        }
        const numberId = await getNextID(user, 'lastExpensesId');
        
        let modifiedExpense = {
            ...expense,
            dates: {
                ...expense.dates,
                expenseDate: Timestamp.fromMillis(DateUtils.convertDateToMillis(expense.dates.expenseDate)),
                createdAt: Timestamp.now(),
            },
            status: "active",
            numberId: numberId,
            id: nanoid(),
        };
        setLoading({ isOpen: true, message: "Subiendo imagen del recibo al servidor..." });

        if (receiptImage) {
            const url = await fbUploadFile(user, 'expensesReceiptImg', receiptImage);
            modifiedExpense.receiptImageUrl = url;
        }

        setLoading({ isOpen: true, message: "Registrando detalles del gasto en la base de datos..." });

        const expenseRef = doc(db, 'businesses', user.businessID, 'expenses', modifiedExpense.id);

        await setDoc(expenseRef, { expense: modifiedExpense })


    } catch (error) {
        console.error("Error adding expense: ", error);
        return false;
    }
}
