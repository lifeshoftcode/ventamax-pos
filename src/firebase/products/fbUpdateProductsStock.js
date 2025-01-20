import { doc, increment, writeBatch, collection, addDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { validateUser } from "../../utils/userValidation";
import { MovementReason, MovementType } from "../../models/Warehouse/Movement";
import { nanoid } from "nanoid";
import { getProductStockByBatch, getProductStockById } from '../warehouse/productStockService';
import { getBatchById } from "../warehouse/batchService";

// Función para dividir el array en subarrays de tamaño máximo size
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

// Función para ejecutar batches con límite de concurrencia
async function executeBatchesWithConcurrency(batches, concurrencyLimit) {
    const executing = [];
    const results = [];

    for (const batch of batches) {
        const p = batch.commit();
        results.push(p);

        if (concurrencyLimit <= batches.length) {
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            executing.push(e);
            if (executing.length >= concurrencyLimit) {
                await Promise.race(executing);
            }
        }
    }

    return Promise.all(results);
}

export async function fbUpdateProductsStock(products, user) {
    try {
        validateUser(user);
        const { businessID } = user;

        // Validación de todos los productStockId antes de comenzar
        for (const product of products) {
            if (product.productStockId) {
                const productStockExists = await getProductStockById(user, product.productStockId);
                if (!productStockExists) {
                    throw new Error(`ProductStockId inválido para el producto ${product.id}`);
                }
            } else {
                throw new Error(`ProductStockId no proporcionado para el producto ${product.id}`);
            }
        }

        // Crear batches de operaciones
        const BATCH_LIMIT = 500;
        const CONCURRENCY_LIMIT = 5; // Puedes ajustar este valor según tus necesidades
        const productChunks = chunkArray(products, Math.floor(BATCH_LIMIT / 3)); // Estimación conservadora
        const batches = [];

        for (const chunk of productChunks) {
            const batch = writeBatch(db);
            for (const product of chunk) {
                if (!product?.trackInventory) continue;

                const productRef = doc(db, "businesses", businessID, "products", product.id);
                const batchId = product?.batchId;
                const movementId = nanoid();
                const productStockId = product?.productStockId;
                const productStock = await getProductStockById(user, productStockId);
                const productBatch = await getBatchById(user, batchId);
                const amountToBuy = Number(product?.amountToBuy);

                if (isNaN(amountToBuy) || amountToBuy <= 0) {
                    console.warn(`Cantidad inválida para el producto ${product.id}`);
                    continue;
                }

                const stockUpdateValue = increment(-amountToBuy);

                batch.update(productRef, { "stock": stockUpdateValue });

                if (batchId && productStockId) {
                    const productBatchRef = doc(db, "businesses", businessID, "batches", batchId);
                    const productStockRef = doc(db, "businesses", businessID, "productsStock", productStockId);

                    batch.update(productBatchRef, { "quantity": stockUpdateValue });
                    batch.update(productStockRef, { "quantity": stockUpdateValue });
                }

                // Registrar movimiento (ejemplo con MovementType.Exit)
                const movementRef = doc(db, "businesses", businessID, "movements", movementId);
                const movementDoc = {
                    id: movementId,
                    createdAt: serverTimestamp(),
                    createdBy: user.uid,
                    updatedAt: serverTimestamp(),
                    updatedBy: user.uid,
                    batchId: batchId,
                    batchNumberId: productBatch ? productBatch.numberId : null,
                    productId: product.id,
                    productName: product.name,
                    sourceLocation: productStock ? productStock.location : null,
                    destinationLocation: null,
                    quantity: amountToBuy,
                    movementType: MovementType.Exit,
                    movementReason: MovementReason.Sale,
                    isDeleted: false
                };
                await setDoc(movementRef, movementDoc);
            }
            batches.push(batch);
        }

        // Ejecutar los batches con límite de concurrencia
        await executeBatchesWithConcurrency(batches, CONCURRENCY_LIMIT);
    } catch (error) {
        console.error('Error al actualizar el stock de los productos:', error);
        throw new Error('No se pudo actualizar el stock de los productos');
    }
}