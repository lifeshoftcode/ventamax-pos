import { Timestamp, doc, getDoc, increment, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebaseconfig";
import { fbUploadFiles } from '../img/fbUploadFileAndGetURL';
import { isImageFile, isPDFFile } from '../../utils/file/isValidFile';
import { deleteObject, ref } from "firebase/storage";

const saveCurrentPurchaseVersion = async (user, currentPurchase) => {
    const purchaseId = currentPurchase.id;
    const previousPurchaseRef = doc(db, 'businesses', user.businessID, "previousPurchases", purchaseId);

    // Guardar la compra actual en la colección 'previousPurchases' con una marca de tiempo
    await setDoc(previousPurchaseRef, { data: { ...currentPurchase, savedAt: Timestamp.now() } });
};

const updateProductsStockFromReplenishments = async (user, newPurchase, previousPurchase) => {
    // Maps para los reabastecimientos de la nueva y la versión anterior de la compra
    const newReplenishmentsMap = new Map(newPurchase.replenishments.map(item => [item.id, item]));
    const previousReplenishmentsMap = previousPurchase ? new Map(previousPurchase.replenishments.map(item => [item.id, item])) : new Map();
    console.log("newPurchase:", newPurchase);
    console.log("previousPurchase:", previousPurchase);
    for (const [productId, newReplenishment] of newReplenishmentsMap) {
        console.log("newReplenishment being processed:", newReplenishment);
        if (previousReplenishmentsMap.has(productId)) {
            const previousReplenishment = previousReplenishmentsMap.get(productId);
            console.log("previousReplenishment for existing product:", previousReplenishment);
            let stockChange = newReplenishment.newStock - previousReplenishment.newStock;
            console.log(`Producto ${productId} (${newReplenishment.productName}): stock anterior ${previousReplenishment.newStock}, stock nuevo ${newReplenishment.newStock}. Cambio: ${stockChange}`);
            // await updateProductStock(user, productId, stockChange);
        } else {
            console.log(`Producto nuevo: ${productId} (${newReplenishment.productName}). Stock establecido a ${newReplenishment.newStock}`);
            // await updateProductStock(user, productId, newReplenishment.newStock);
        }
    }

    // Procesar los productos eliminados en la nueva compra
    for (const [productId, previousReplenishment] of previousReplenishmentsMap) {
        if (!newReplenishmentsMap.has(productId)) {
            // Si un producto anterior ya no está en la nueva compra, reduce el stock
            let stockChange = -previousReplenishment.newStock;
            // await updateProductStock(user, productId, stockChange);
        }
    }
};

const updateProductStock = async (user, productId, stockChange) => {
    // Realizar la actualización del stock del producto en la base de datos
    console.log(`Actualizando el stock del producto ${productId} en ${stockChange} unidades.`);

    const productsRef = doc(db, 'businesses', user.businessID, "products", productId);
    // Usa 'increment' para ajustar el stock en lugar de establecer un nuevo valor directamente
    await updateDoc(productsRef, { "product.stock": increment(stockChange) });
};

const updateLocalAttachmentsWithRemoteURLs = (localAttachments, uploadedFiles) => {
    return localAttachments.map(attachment => {
        if (attachment.location === 'local') {
            const uploadedFile = uploadedFiles.find(uf => uf.name === attachment.name);
            if (uploadedFile) {
                return {
                    ...attachment,
                    location: 'remote',
                    url: uploadedFile.url,
                    size: uploadedFile.size,
                    mimeType: uploadedFile.mimeType
                };
            }
        }
        return attachment;
    });
};

export const findRemovedAttachments = (oldAttachments, newAttachments) => {
    return oldAttachments.filter(oldAtt =>
        oldAtt.url &&
        !newAttachments.some(newAtt => newAtt.url === oldAtt.url)
    );
};

export const deleteRemovedFiles = async (removedAttachments) => {
    const deletePromises = removedAttachments.map(async (attachment) => {
        try {
            if (attachment.url) {
                const fileRef = ref(storage, attachment.url);
                await deleteObject(fileRef);
                console.log(`Deleted file: ${attachment.url}`);
            }
        } catch (error) {
            console.error(`Error deleting file ${attachment.url}:`, error);
        }
    });
    await Promise.all(deletePromises);
};

export const fbUpdatePurchase = async ({ user, purchase, localFiles = [], setLoading = () => { } }) => {
    try {
        setLoading(true);
        console.log("Updating purchase:", purchase);
        const purchaseRef = doc(db, "businesses", user.businessID, "purchases", purchase.id);

        // Get previous version of purchase
        const previousPurchaseDoc = await getDoc(purchaseRef);
        const previousPurchase = previousPurchaseDoc.data();

        // Find and delete removed attachments
        if (previousPurchase?.attachmentUrls) {
            const removedAttachments = findRemovedAttachments(
                previousPurchase.attachmentUrls,
                purchase.attachmentUrls || []
            );
            if (removedAttachments.length > 0) {
                await deleteRemovedFiles(removedAttachments);
            }
        }

        let uploadedFiles = [];
        if (localFiles && localFiles.length > 0) {
            const files = localFiles.map(({ file }) => file);
            uploadedFiles = await fbUploadFiles(user, "purchaseAndOrderFiles", files, {
                customMetadata: {
                    type: "purchase_attachment",
                },
            });
        }

        const existingAttachments = purchase.attachmentUrls || [];
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

        const updatedData = {
            ...purchase,
            createdAt: purchase.createdAt || serverTimestamp(),
            updatedAt: serverTimestamp(),
            deliveryAt: safeTimestamp(purchase.deliveryAt),
            paymentAt: safeTimestamp(purchase.paymentAt),
            completedAt: purchase.completedAt ? safeTimestamp(purchase.completedAt) : null,
            attachmentUrls: updatedAttachments
        };

        await updateDoc(purchaseRef,  updatedData );
        setLoading(false);
        return updatedData;
    } catch (error) {
        setLoading(false);
        console.error("Error updating purchase:", error);
        throw error;
    }
};
