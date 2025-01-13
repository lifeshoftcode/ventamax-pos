import { Timestamp, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { nanoid } from "nanoid";
import { getNextID } from "../Tools/getNextID";
import { fbUploadFiles } from "../img/fbUploadFileAndGetURL";
import { updateLocalAttachmentsWithRemoteURLs } from "../purchase/fbAddPurchase";

export const fbAddOrder = async (user, value, fileList = []) => {
    try {
        if (!user || !user.businessID) return;
        const nextID = await getNextID(user, 'lastOrdersId');
        let data = {
            ...value,
            id: nanoid(12),
            numberId: nextID,
            dates: {
                ...value.dates,
                deliveryDate: Timestamp.fromMillis(value.dates.deliveryDate),
                createdAt: Timestamp.now(),
            },
            provider: value.providerId,
            state: 'state_2'
        }
        const OrderRef = doc(db, "businesses", user.businessID, "orders", data.id)
        if (fileList.length > 0) {
            const files = await fbUploadFiles(user, "orderReceipts", fileList);
            data.fileList = [...(data?.fileList || []), ...files]

        }
        await setDoc(OrderRef, { data })
    } catch (error) {
        console.error("Error adding document: ", error)
    }
}

export async function addOrder({ user, order, localFiles = [], setLoading = () => { } }) {
    try {
        const id = nanoid();
        const numberId = await getNextID(user, 'lastPurchaseNumberId');


        const ordersRef = doc(db, "businesses", user.businessID, "orders", id);



        let uploadedFiles = [];
        // Solo intentar subir archivos si hay archivos locales
        if (localFiles && localFiles.length > 0) {
            const files = localFiles.map(({ file }) => file);
            uploadedFiles = await fbUploadFiles(user, "purchaseAndOrderFiles", files, {
                customMetadata: {
                    type: "purchase_attachment",
                },
            });
        }

        const existingAttachments = order.attachmentUrls || [];

        const updatedAttachments = updateLocalAttachmentsWithRemoteURLs(
            existingAttachments,
            uploadedFiles
        );

        // Safely convert dates to timestamps
        const safeTimestamp = (date) => {
            if (!date) return serverTimestamp();
            const milliseconds = typeof date === 'number' ? date : new Date(date).getTime();
            if (isNaN(milliseconds)) return serverTimestamp();
            return Timestamp.fromMillis(milliseconds);
        };

        const data = {
            ...order,
            id,
            numberId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            deliveryAt: safeTimestamp(order.deliveryAt),
            paymentAt: safeTimestamp(order.paymentAt),
            completedAt: order.completedAt ? safeTimestamp(order.completedAt) : null,
            attachmentUrls: updatedAttachments
        };

        await setDoc(ordersRef, data);
        setLoading(false);
        return data;
    } catch (error) {
        setLoading(false);
        console.error("Error in addPurchase:", error);
        throw error;
    }
}