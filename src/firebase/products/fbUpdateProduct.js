import { doc, updateDoc } from "firebase/firestore"
import { toggleLoader } from "../../features/loader/loaderSlice"
import { db } from "../firebaseconfig"
import { addNotification } from "../../features/notification/notificationSlice"

export const fbUpdateProduct = async (data, user) => {
    const product = {
        ...data,
    }
    const { businessID } = user
    const productRef = doc(db, "businesses", businessID, "products", product.id)
    await updateDoc(productRef,  product )

}