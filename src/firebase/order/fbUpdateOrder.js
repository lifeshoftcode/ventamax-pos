import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { fbUploadFiles } from "../img/fbUploadFileAndGetURL";

export const fbUpdateOrder = async (user, order, fileList) => {
   
    try {
        if (!user || !user.businessID) return;
        const providerRef = doc(db, 'businesses', user.businessID, 'providers', order.provider.id)
        let data = {
            ...order,
            dates: {
                ...order.dates,
                updatedAt: Timestamp.now(),
                createdAt: Timestamp.fromMillis(order.dates.createdAt),
                deliveryDate: Timestamp.fromMillis(order.dates.deliveryDate),
            },
            provider: providerRef
        }
        const orderRef = doc(db, 'businesses', user.businessID, 'orders', order.id)
        if(fileList && fileList.length > 0){
            const files = await fbUploadFiles(user, "orderReceipts", fileList);
            data.fileList = [...(data?.fileList || []), ...files]
        }
        await updateDoc(orderRef, { data })
    }
    catch (error) {
        console.error("Error updating document: ", error)
    }
}

