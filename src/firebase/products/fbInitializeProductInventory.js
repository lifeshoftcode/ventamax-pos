//esta funcion revisara en la coleicon de producto 
// todo esos producto que no tienen batch y productStock y le creara
// un batch y un productStock con la cantidad de stock que tiene el producto

import { fbGetProducts } from "./fbGetProducts";
import { getDefaultWarehouse } from "../warehouse/warehouseService";
import { validateUser } from "../../utils/userValidation";
import { getNextID } from "../Tools/getNextID";
import { nanoid } from "nanoid";
import { serverTimestamp } from "firebase/firestore";
import { BatchStatus } from "../../models/Warehouse/Batch";
import { collection, addDoc, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { MovementReason, MovementType } from "../../models/Warehouse/Movement";

const BATCH_SIZE = 400; // Tamaño seguro para procesamiento por lotes

async function processBatchOfProducts(products, user, defaultWarehouse, baseRefs, onProgress, startIndex) {
    const batch = writeBatch(db);
    const createdDocs = [];
    const { batchRef, stockRef, movementRef } = baseRefs;



    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const globalIndex = startIndex + i;
        const progress = 10 + (globalIndex / products.length) * 90;
        
        onProgress?.({ 
            status: `Procesando producto ${globalIndex + 1}/${products.length}: ${product.name}`,
            progress,
            currentProduct: product
        });

        const baseFields = {
            createdAt: serverTimestamp(),
            createdBy: user.uid,
            updatedAt: serverTimestamp(),
            updatedBy: user.uid,
            deletedAt: null,
            deletedBy: null,
            isDeleted: false
        };

        const batchNumber = await getNextID(user, 'batches');
        
        // Crear documentos pero aún no escribirlos
        const batchDoc = {
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

        const stockDoc = {
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

        const movementDoc = {
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

        // Añadir al batch de escritura
        createdDocs.push({ batchDoc, stockDoc, movementDoc });
    }

    // Escribir todos los documentos en el batch
    for (const docs of createdDocs) {
        batch.set(doc(batchRef, docs.batchDoc.id), docs.batchDoc);
        batch.set(doc(stockRef, docs.stockDoc.id), docs.stockDoc);
        batch.set(doc(movementRef, docs.movementDoc.id), docs.movementDoc);
    }

    // Commit el batch
    await batch.commit();
}

export async function fbInitializedProductInventory(user, onProgress) {
    try {
        validateUser(user);
        // const { businessID } = user;
        const businessID = 'RPvpimCiUO4UW4tt50qn';

        const baseRefs = {
            batchRef: collection(db, "businesses", businessID, "batches"),
            stockRef: collection(db, "businesses", businessID, "productsStock"),
            movementRef: collection(db, "businesses", businessID, "movements")
        };

        onProgress?.({ status: 'Obteniendo productos y lotes...', progress: 0 });
        
        const [products, batchesSnapshot] = await Promise.all([
            fbGetProducts(user),
            getDocs(baseRefs.batchRef)
        ]);
        
        const productsWithBatches = new Set(
            batchesSnapshot.docs.map(doc => doc.data().productId)
        );

        const productsToProcess = products.filter(product => 
            product.trackInventory && 
            !productsWithBatches.has(product.id)
        );

        onProgress?.({ 
            status: `Se encontraron ${productsToProcess.length} productos para inicializar`,
            progress: 10 
        });

        const defaultWarehouse = await getDefaultWarehouse(user);

        // Procesar en lotes de BATCH_SIZE
        for (let i = 0; i < productsToProcess.length; i += BATCH_SIZE) {
            const batch = productsToProcess.slice(i, i + BATCH_SIZE);
            await processBatchOfProducts(batch, user, defaultWarehouse, baseRefs, onProgress, i);
        }
        
        onProgress?.({ 
            status: `Proceso completado. Se inicializaron ${productsToProcess.length} productos`, 
            progress: 100 
        });
    } catch (error) {
        onProgress?.({ 
            status: 'Error: ' + error.message, 
            progress: 100, 
            error: true 
        });
        console.error('Error initializing product inventory:', error);
        throw error;
    }
}