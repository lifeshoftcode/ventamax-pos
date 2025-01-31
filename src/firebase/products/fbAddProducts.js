import { collection, writeBatch, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { nanoid } from "nanoid";
import { getDefaultWarehouse } from "../warehouse/warehouseService";
import { getNextID } from "../Tools/getNextID";
import { BatchStatus } from "../../models/Warehouse/Batch";
import { MovementReason, MovementType } from "../../models/Warehouse/Movement";

// Función para subir productos, categorías e ingredientes activos a Firestore en lotes
export const fbAddProducts = async (user, products, maxProducts = 10000) => {
  const maxBatchSize = 500;
  const maxAllowedProducts = 10000;

  const limitedProducts = products.slice(0, Math.min(maxProducts, maxAllowedProducts));

  const productsCollection = collection(db, 'businesses', user.businessID, 'products');
  const categoriesCollection = collection(db, 'businesses', user.businessID, 'categories');
  const activeIngredientsCollection = collection(db, 'businesses', user.businessID, 'activeIngredients');

  try {
    const existingProductsSnapshot = await getDocs(productsCollection);
    const existingProductsByName = new Map();
    existingProductsSnapshot.docs.forEach(docSnapshot => {
      const data = docSnapshot.data();
      const nameLowerCase = data.name?.toLowerCase();
      if (nameLowerCase) {
        existingProductsByName.set(nameLowerCase, { docSnapshot, data });
      }
    });

    const existingCategoriesSnapshot = await getDocs(categoriesCollection);
    const existingCategoriesByName = new Map();
    existingCategoriesSnapshot.docs.forEach(docSnapshot => {
      const data = docSnapshot.data();
      const nameLowerCase = data.name?.toLowerCase();
      if (nameLowerCase) {
        existingCategoriesByName.set(nameLowerCase, { docSnapshot, data });
      }
    });

    const existingActiveIngredientsSnapshot = await getDocs(activeIngredientsCollection);
    const existingActiveIngredientsByName = new Map();
    existingActiveIngredientsSnapshot.docs.forEach(docSnapshot => {
      const data = docSnapshot.data();
      const nameLowerCase = data.name?.toLowerCase();
      if (nameLowerCase) {
        existingActiveIngredientsByName.set(nameLowerCase, { docSnapshot, data });
      }
    });

    const batchCommits = [];
    let batch = writeBatch(db);
    let operationCount = 0;

    for (const product of limitedProducts) {
      const productNameLowerCase = product.name?.toLowerCase();

      if (productNameLowerCase) {
        if (existingProductsByName.has(productNameLowerCase)) {
          const { docSnapshot, data: existingData } = existingProductsByName.get(productNameLowerCase);

          let docRef = docSnapshot.ref;
          const existingImage = existingData.image;

          // Eliminar producto existente en el batch, excepto el campo 'image'
          batch.delete(docRef);
          operationCount++;

          // Crear un nuevo documento y restaurar la imagen
          const updatedProduct = { ...product, image: existingImage };
          batch.set(docRef, updatedProduct);
          operationCount++;
          console.log(`Producto actualizado y se mantuvo 'image': ${product.name}`);
        } else {
          let docRef;
          if (product.id) {
            docRef = doc(productsCollection, product.id);
            const docSnapshot = await getDoc(docRef);

            if (!docSnapshot.exists()) {
              // Documento no existe, se procede
              batch.set(docRef, product);
              operationCount++;
            } else {
              console.log(`Actualizando producto existente con id: ${product.id}`);
            }
          } else {
            docRef = doc(productsCollection);
            product.id = docRef.id;
            batch.set(docRef, product);
            operationCount++;
          }
        }

        // Nuevo: creación de batch, stock y movimiento
        const baseFields = {
          createdAt: serverTimestamp(),
          createdBy: user.uid,
          updatedAt: serverTimestamp(),
          updatedBy: user.uid,
          deletedAt: null,
          deletedBy: null,
          isDeleted: false
        };
        
        const defaultWarehouse = await getDefaultWarehouse(user);
        const batchNumber = await getNextID(user, "batches", 1);
        const batchObj = {
          ...baseFields,
          id: nanoid(10),
          productId: product.id,
          productName: product.name,
          numberId: batchNumber,
          status: BatchStatus.Active,
          receivedDate: serverTimestamp(),
          providerId: null,
          quantity: product.stock || 0,
          initialQuantity: product.stock || 0,
        };
        const batchDocRef = doc(db, "businesses", user.businessID, "batches", batchObj.id);
        batch.set(batchDocRef, batchObj);
        operationCount++;

        const stockObj = {
          ...baseFields,
          id: nanoid(10),
          batchId: batchObj.id,
          productName: product.name,
          batchNumberId: batchNumber,
          location: defaultWarehouse?.id || null,
          expirationDate: null,
          productId: product.id,
          quantity: product.stock || 0,
          initialQuantity: product.stock || 0,
        };
        const stockRef = doc(db, "businesses", user.businessID, "productsStock", stockObj.id);
        batch.set(stockRef, stockObj);
        operationCount++;

        const movementObj = {
          ...baseFields,
          id: nanoid(10),
          batchId: batchObj.id,
          productName: product.name,
          batchNumberId: batchNumber,
          destinationLocation: defaultWarehouse?.id || null,
          sourceLocation: null,
          productId: product.id,
          quantity: product.stock || 0,
          movementType: MovementType.Entry,
          movementReason: MovementReason.InitialStock,
        };
        const movementRef = doc(db, "businesses", user.businessID, "movements", movementObj.id);
        batch.set(movementRef, movementObj);
        operationCount++;
        // Fin creación de batch, stock y movimiento

        // Manejo de categorías
        if (product.category) {
          const categoryNameLowerCase = product.category.toLowerCase();
          if (!existingCategoriesByName.has(categoryNameLowerCase)) {
            const categoryDocRef = doc(categoriesCollection);
            const category = {
              id: categoryDocRef.id,
              name: product.category,
              createdAt: serverTimestamp(),
            };
            batch.set(categoryDocRef, category);
            operationCount++;
            existingCategoriesByName.set(categoryNameLowerCase, { docSnapshot: categoryDocRef, data: category });
            console.log(`Categoría agregada: ${product.category}`);
          }
        }

        // Manejo de ingredientes activos
        if (product.activeIngredients && Array.isArray(product.activeIngredients)) {
          for (const ingredient of product.activeIngredients) {
            const ingredientNameLowerCase = ingredient.toLowerCase();
            if (!existingActiveIngredientsByName.has(ingredientNameLowerCase)) {
              const ingredientDocRef = doc(activeIngredientsCollection);
              const activeIngredient = {
                id: ingredientDocRef.id,
                name: ingredient,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              };
              batch.set(ingredientDocRef, activeIngredient);
              operationCount++;
              existingActiveIngredientsByName.set(ingredientNameLowerCase, { docSnapshot: ingredientDocRef, data: activeIngredient });
              console.log(`Ingrediente activo agregado: ${ingredient}`);
            } else {
              // Actualizar el campo updatedAt del ingrediente existente
              const { docSnapshot } = existingActiveIngredientsByName.get(ingredientNameLowerCase);
              batch.update(docSnapshot.ref, { updatedAt: serverTimestamp() });
              operationCount++;
              console.log(`Ingrediente activo actualizado: ${ingredient}`);
            }
          }
        }
      } else {
        console.log(`Producto omitido: no se proporcionó nombre.`);
      }

      if (operationCount >= maxBatchSize) {
        batchCommits.push(batch.commit());
        batch = writeBatch(db);
        operationCount = 0;
      }
    }

    if (operationCount > 0) {
      batchCommits.push(batch.commit());
    }

    await Promise.all(batchCommits);
    console.log('Todos los productos, categorías e ingredientes activos fueron subidos exitosamente.');
  } catch (error) {
    console.error('Error al subir los productos, categorías e ingredientes activos:', error);
  }
};
