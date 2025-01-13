import {  doc, getDoc,  updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { fbUploadFiles } from '../img/fbUploadFileAndGetURL';
import { deleteRemovedFiles, findRemovedAttachments } from "./fbUpdatePurchase";
import { createBatch } from "../warehouse/batchService";
import { createProductStock } from "../warehouse/productStockService";
import { getDefaultWarehouse } from "../warehouse/warehouseService";
import { safeTimestamp, updateLocalAttachmentsWithRemoteURLs } from "./fbAddPurchase";
import { getNextID } from "../Tools/getNextID";

const updatePurchaseWarehouseStock = async (user, purchase, defaultWarehouse) => {
    const productBatches = {};

    // Group replenishments by product and expiration date
    for (const replenishment of purchase.replenishments) {
        const key = `${replenishment.id}_${replenishment.expirationDate}`;
        if (!productBatches[key]) {
            productBatches[key] = {
                productId: replenishment.id,
                productName: replenishment.name,
                expirationDate: replenishment.expirationDate,
                items: []
            };
        }
        productBatches[key].items.push(replenishment);
    }

    // Create batch and update stock for each product
    for (const key in productBatches) {
        const batch = productBatches[key];
        console.log("batch ", batch);
        console.log("purchase", purchase)
        const totalStock = batch.items.reduce((acc, item) => acc + item.quantity, 0);
        const batchId = `${purchase.id}_${batch.productId}_${new Date(batch.expirationDate).getTime()}`;

        // Create batch for this product
        const batchData = await createBatch(user, {
            productId: batch.productId,
            purchaseId: purchase.id,
            numberId: await getNextID(user, 'batches'),
            shortName: `${batch.productName}_${new Date(batch.expirationDate).toISOString().split('T')[0]}`,
            batchNumber: batchId,
            status: 'active',
            receivedDate: new Date(),
            providerId: purchase.provider,
            count: totalStock,
            createdAt: serverTimestamp(),
            createdBy: user.uid,
            updatedAt: serverTimestamp(),
            updatedBy: user.uid
        });

        // Update product stock
        const productStockData = {
            batchId: batchData.id,
            batchNumberId: batchData.numberId,
            //path structured: 'warehouseId/shefId/rowId/segmentId'
            location: `${defaultWarehouse.id}`,
            productId: batch.productId,
            productName: batch.productName,
            stock: totalStock,
            expirationDate: batch?.expirationDate ? new Date(batch.expirationDate) : null,
            createdAt: serverTimestamp(),
            createdBy: user.uid,
            updatedAt: serverTimestamp(),
            updatedBy: user.uid
        };

        await createProductStock(user, productStockData);
    }
};

const handleFileAttachments = async (user, purchase, localFiles) => {
    // Get previous version of purchase
    const purchaseRef = doc(db, "businesses", user.businessID, "purchases", purchase.id);
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

    return updatedAttachments;
};

const generateShortName = (purchase) => {
    const expirationDate = new Date(purchase.replenishments[0].expirationDate);
    const formattedDate = expirationDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    return `${purchase.name}_${formattedDate}`;
};

export const fbCompletePurchase = async ({ user, purchase, localFiles = [], setLoading = () => { } }) => {
    try {
        setLoading(true);
        console.log("Completing purchase:", purchase);
        const purchaseRef = doc(db, "businesses", user.businessID, "purchases", purchase.id);

        // Ensure default warehouse exists
        const defaultWarehouse = await getDefaultWarehouse(user);

        // Handle file attachments
        const updatedAttachments = await handleFileAttachments(user, purchase, localFiles);

        const updatedData = {
            ...purchase,
            status: 'completed',
            updatedAt: serverTimestamp(),
            deliveryAt: safeTimestamp(purchase.deliveryAt),
            paymentAt: safeTimestamp(purchase.paymentAt),
            completedAt: purchase.completedAt ? safeTimestamp(purchase.completedAt) : null,
            attachmentUrls: updatedAttachments
        };

        await updateDoc(purchaseRef, updatedData);
        await updatePurchaseWarehouseStock(user, purchase, defaultWarehouse);

        setLoading(false);
        return updatedData;
    } catch (error) {
        setLoading(false);
        console.error("Error completing purchase:", error);
        throw error;
    }
};