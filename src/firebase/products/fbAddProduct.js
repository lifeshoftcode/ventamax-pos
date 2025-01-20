import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "../firebaseconfig";
import { BatchStatus } from "../../models/Warehouse/Batch";
import { getDefaultWarehouse } from "../warehouse/warehouseService";
import { getNextID } from "../Tools/getNextID";
import { MovementReason, MovementType } from "../../models/Warehouse/Movement";

export const fbAddProduct = (data, dispatch, user) => {
    if (!user && !user.businessID) return

    const baseFields = {
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
        deletedAt: null,
        deletedBy: null,
        isDeleted: false
    };

    const product = {
        ...data,
        id: nanoid(10)
    }

    return new Promise(async (resolve, reject) => {
        const productRef = doc(db, "businesses", user.businessID, "products", product.id);
        const batchRef = collection(db, "businesses", user.businessID, "batches");
        const movementRef = collection(db, "businesses", user.businessID, "movements");
        const stockRef = collection(db, "businesses", user.businessID, "productsStock");
        const defaultWarehouse = await getDefaultWarehouse(user);
        const batchNumber = await getNextID(user, 'batches');
        try {
            await setDoc(productRef, product);
            console.log('Product document written', product);

            const batch = {
                ...baseFields,
                id: nanoid(10),
                productId: product.id,
                productName: product.name,
                numberId: batchNumber,
                status: BatchStatus.Active,
                receivedDate: new Date(),
                providerId: "defaultProvider",
                quantity: product.stock,
                initialQuantity: product.stock,
            };

            const batchDoc = await addDoc(batchRef, batch);
            console.log('Batch document written', batch);

            const stock = {
                ...baseFields,
                id: nanoid(10),
                batchId: batchDoc.id,
                productName: product.name,
                batchNumberId: batchNumber,
                location: defaultWarehouse.id,
                expirationDate: null,
                productId: product.id,
                quantity: product.stock,
                initialQuantity: product.stock,
            };

            await addDoc(stockRef, stock);
            console.log('Stock document written', stock);

            const movement = {
                ...baseFields,
                id: nanoid(10),
                batchId: batchDoc.id,
                productName: product.name,
                batchNumberId: batchNumber,
                destinationLocation: defaultWarehouse.id,
                sourceLocation: null,
                productId: product.id,
                quantity: product.stock,
                movementType: MovementType.Entry,
                movementReason: MovementReason.InitialStock,
            };

            await addDoc(movementRef, movement);
            console.log('Movement document written', movement);

            resolve();
        } catch (error) {
            console.log('Error adding document:', error);
            reject();
        }
    });
}