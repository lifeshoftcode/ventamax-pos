import { collection, writeBatch, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { nanoid } from "nanoid";
import { getDefaultWarehouse } from "../warehouse/warehouseService";
import { getNextID } from "../Tools/getNextID";
import { BatchStatus } from "../../models/Warehouse/Batch";
import { MovementReason, MovementType } from "../../models/Warehouse/Movement";

class ImportProgress {
  constructor() {
    this.stats = {
      totalProducts: 0,
      processedProducts: 0,
      updatedProducts: 0,
      newProducts: 0,
      newCategories: 0,
      newIngredients: 0,
      updatedIngredients: 0,
      batchOperations: 0
    };
  }

  updateProgress(field, value = 1) {
    this.stats[field] += value;
    this.logProgress();
  }

  logProgress() {
    const { processedProducts, totalProducts } = this.stats;
    if (totalProducts > 0) {
      const percentage = Math.round((processedProducts / totalProducts) * 100);
      console.log(`Progreso: ${percentage}% (${processedProducts}/${totalProducts})`);
    }
  }

  getSummary() {
    const { 
      totalProducts, processedProducts, updatedProducts, 
      newProducts, newCategories, newIngredients, 
      updatedIngredients, batchOperations 
    } = this.stats;

    return `
Resumen de importación:
----------------------
Total productos procesados: ${processedProducts}/${totalProducts}
Productos actualizados: ${updatedProducts}
Productos nuevos: ${newProducts}
Categorías nuevas: ${newCategories}
Ingredientes activos nuevos: ${newIngredients}
Ingredientes activos actualizados: ${updatedIngredients}
Total operaciones en batch: ${batchOperations}
    `;
  }
}

/**
 * Valida y ajusta el precio del producto.
 */
export function validateProductPricing(product) {
  if (!product.pricing?.price || product.pricing.price <= 0) {
    if (product.pricing) {
      product.pricing.price = product.pricing.listPrice || 0;
    } else {
      product.pricing = { price: 0, listPrice: 0 };
    }
  }
  return product;
}

/**
 * Obtiene un Map de documentos existentes en una colección, indexado por el nombre en minúsculas.
 */
async function fetchExistingDocs(collectionRef) {
  const snapshot = await getDocs(collectionRef);
  const map = new Map();
  snapshot.docs.forEach(docSnapshot => {
    const data = docSnapshot.data();
    const lowerName = data.name?.toLowerCase();
    if (lowerName) {
      map.set(lowerName, { docSnapshot, data });
    }
  });
  return map;
}

/**
 * Pre-carga documentos de productos que tienen un id y que no se encontraron por nombre.
 */
async function preloadProductDocs(limitedProducts, productsCollection, existingProductsByName) {
  const preloadedDocs = new Map();
  const productsToPreload = limitedProducts.filter(
    prod => prod.id && prod.name && !existingProductsByName.has(prod.name.toLowerCase())
  );
  await Promise.all(
    productsToPreload.map(async prod => {
      const prodDocRef = doc(productsCollection, prod.id);
      const docSnap = await getDoc(prodDocRef);
      preloadedDocs.set(prod.id, docSnap);
    })
  );
  return preloadedDocs;
}

/**
 * Procesa un solo producto: actualiza o crea el producto y agrega operaciones para
 * batch, stock, movimiento, categorías e ingredientes activos.
 * 
 * @param {WriteBatch} batch - Objeto batch de Firestore.
 * @param {Object} product - Producto a procesar.
 * @param {number} batchNumber - Número de lote asignado al producto.
 * @param {Object} context - Objeto con referencias y mapas necesarios.
 * @returns {number} La cantidad de operaciones agregadas al batch.
 */
function processProduct(batch, product, batchNumber, context) {
  let opCount = 0;
  
  // Validar precio
  validateProductPricing(product);
  const productNameLowerCase = product.name?.toLowerCase();

  if (productNameLowerCase) {
    // Si el producto ya existe (por nombre), se actualiza conservando 'image'
    if (context.existingProductsByName.has(productNameLowerCase)) {
      const { docSnapshot, data: existingData } = context.existingProductsByName.get(productNameLowerCase);
      const docRef = docSnapshot.ref;
      const updatedProduct = { ...product, image: existingData.image };
      batch.update(docRef, updatedProduct);
      opCount++;
      console.log(`Producto actualizado (update) y se mantuvo 'image': ${product.name}`);
      context.progress.updateProgress('updatedProducts');
    } else {
      let docRef;
      if (product.id) {
        docRef = doc(context.productsCollection, product.id);
        // Usar el documento precargado
        const docSnapshot = context.preloadedDocs.get(product.id);
        if (!docSnapshot || !docSnapshot.exists()) {
          batch.set(docRef, product);
          opCount++;
        } else {
          const existingData = docSnapshot.data();
          const updatedProduct = { ...product, image: existingData.image };
          batch.update(docRef, updatedProduct);
          opCount++;
          console.log(`Producto actualizado con id: ${product.id}`);
        }
      } else {
        // Si no hay id, se crea un nuevo documento
        docRef = doc(context.productsCollection);
        product.id = docRef.id;
        batch.set(docRef, product);
        opCount++;
      }
      context.progress.updateProgress('newProducts');
    }

    // Campos base para registros relacionados
    const baseFields = {
      createdAt: serverTimestamp(),
      createdBy: context.user.uid,
      updatedAt: serverTimestamp(),
      updatedBy: context.user.uid,
      deletedAt: null,
      deletedBy: null,
      isDeleted: false
    };

    // Crear objeto de batch
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
    const batchDocRef = doc(db, "businesses", context.user.businessID, "batches", batchObj.id);
    batch.set(batchDocRef, batchObj);
    opCount++;

    // Crear objeto de stock
    const stockObj = {
      ...baseFields,
      id: nanoid(10),
      batchId: batchObj.id,
      productName: product.name,
      batchNumberId: batchNumber,
      location: context.defaultWarehouse?.id || null,
      expirationDate: null,
      productId: product.id,
      status: BatchStatus.Active,
      quantity: product.stock || 0,
      initialQuantity: product.stock || 0,
    };
    const stockRef = doc(db, "businesses", context.user.businessID, "productsStock", stockObj.id);
    batch.set(stockRef, stockObj);
    opCount++;

    // Crear objeto de movimiento
    const movementObj = {
      ...baseFields,
      id: nanoid(10),
      batchId: batchObj.id,
      productName: product.name,
      batchNumberId: batchNumber,
      destinationLocation: context.defaultWarehouse?.id || null,
      sourceLocation: null,
      productId: product.id,
      quantity: product.stock || 0,
      movementType: MovementType.Entry,
      movementReason: MovementReason.InitialStock,
    };
    const movementRef = doc(db, "businesses", context.user.businessID, "movements", movementObj.id);
    batch.set(movementRef, movementObj);
    opCount++;

    // Manejo de categorías
    if (product.category) {
      const categoryNameLowerCase = product.category.toLowerCase();
      if (!context.existingCategoriesByName.has(categoryNameLowerCase)) {
        const categoryDocRef = doc(context.categoriesCollection);
        const category = {
          id: categoryDocRef.id,
          name: product.category,
          createdAt: serverTimestamp(),
        };
        batch.set(categoryDocRef, category);
        opCount++;
        context.existingCategoriesByName.set(categoryNameLowerCase, { docSnapshot: categoryDocRef, data: category });
        console.log(`Categoría agregada: ${product.category}`);
        context.progress.updateProgress('newCategories');
      }
    }

    // Manejo de ingredientes activos
    if (product.activeIngredients && Array.isArray(product.activeIngredients)) {
      for (const ingredient of product.activeIngredients) {
        const ingredientNameLowerCase = ingredient.toLowerCase();
        if (!context.existingActiveIngredientsByName.has(ingredientNameLowerCase)) {
          const ingredientDocRef = doc(context.activeIngredientsCollection);
          const activeIngredient = {
            id: ingredientDocRef.id,
            name: ingredient,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          batch.set(ingredientDocRef, activeIngredient);
          opCount++;
          context.existingActiveIngredientsByName.set(ingredientNameLowerCase, { docSnapshot: ingredientDocRef, data: activeIngredient });
          console.log(`Ingrediente activo agregado: ${ingredient}`);
          context.progress.updateProgress('newIngredients');
        } else {
          const { docSnapshot } = context.existingActiveIngredientsByName.get(ingredientNameLowerCase);
          batch.update(docSnapshot.ref, { updatedAt: serverTimestamp() });
          opCount++;
          console.log(`Ingrediente activo actualizado: ${ingredient}`);
          context.progress.updateProgress('updatedIngredients');
        }
      }
    }
  } else {
    console.log(`Producto omitido: no se proporcionó nombre.`);
  }
  context.progress.updateProgress('batchOperations', opCount);
  context.progress.updateProgress('processedProducts');
  return opCount;
}

/**
 * Función principal para subir productos, categorías e ingredientes activos a Firestore en lotes.
 */
export const fbAddProducts = async (user, products, maxProducts = 10000, onProgress) => {
  const progress = new ImportProgress();
  const maxBatchSize = 500;
  const maxAllowedProducts = 10000;
  const limitedProducts = products.slice(0, Math.min(maxProducts, maxAllowedProducts));
  progress.stats.totalProducts = limitedProducts.length;
  console.log(`Iniciando procesamiento de ${progress.stats.totalProducts} productos`);

  // Referencias a colecciones
  const productsCollection = collection(db, 'businesses', user.businessID, 'products');
  const categoriesCollection = collection(db, 'businesses', user.businessID, 'categories');
  const activeIngredientsCollection = collection(db, 'businesses', user.businessID, 'activeIngredients');

  // Obtener el almacén por defecto
  const defaultWarehouse = await getDefaultWarehouse(user);

  try {
    // Obtener documentos existentes de productos, categorías e ingredientes
    console.log('Cargando productos existentes...');
    const existingProductsByName = await fetchExistingDocs(productsCollection);
    console.log(`${existingProductsByName.size} productos existentes encontrados`);

    console.log('Cargando categorías existentes...');
    const existingCategoriesByName = await fetchExistingDocs(categoriesCollection);
    console.log(`${existingCategoriesByName.size} categorías existentes encontradas`);

    console.log('Cargando ingredientes activos existentes...');
    const existingActiveIngredientsByName = await fetchExistingDocs(activeIngredientsCollection);
    console.log(`${existingActiveIngredientsByName.size} ingredientes activos encontrados`);

    // Pre-cargar documentos de productos (para evitar múltiples getDoc)
    const preloadedDocs = await preloadProductDocs(limitedProducts, productsCollection, existingProductsByName);

    // Reservar un bloque de números de lote (IDs) en una sola transacción
    const startBatchNumber = await getNextID(user, "batches", limitedProducts.length);
    const batchNumbers = Array.from({ length: limitedProducts.length }, (_, i) => startBatchNumber + i);

    // Configuración inicial para la escritura en batch
    const batchCommits = [];
    let batch = writeBatch(db);
    let operationCount = 0;

    // Contexto con datos y referencias compartidas
    const context = {
      productsCollection,
      categoriesCollection,
      activeIngredientsCollection,
      defaultWarehouse,
      user,
      existingProductsByName,
      existingCategoriesByName,
      existingActiveIngredientsByName,
      preloadedDocs,
      progress,
    };

    // Añadir callback después de cada actualización de progreso
    if (onProgress) {
      const originalUpdateProgress = progress.updateProgress.bind(progress);
      progress.updateProgress = (field, value = 1) => {
        originalUpdateProgress(field, value);
        onProgress(progress);
      };
    }

    // Procesar cada producto y agregar operaciones al batch
    for (let i = 0; i < limitedProducts.length; i++) {
      const product = limitedProducts[i];
      const batchNumber = batchNumbers[i];

      operationCount += processProduct(batch, product, batchNumber, context);

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
    console.log(progress.getSummary());
    console.log('Todos los productos, categorías e ingredientes activos fueron subidos exitosamente.');
  } catch (error) {
    console.error('Error al subir los productos, categorías e ingredientes activos:', error);
    console.log('Estado al momento del error:', progress.getSummary());
  }
};
