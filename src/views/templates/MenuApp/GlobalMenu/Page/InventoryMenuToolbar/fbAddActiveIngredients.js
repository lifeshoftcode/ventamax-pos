import { collection, writeBatch, doc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../../firebase/firebaseconfig";


// Función para agregar ingredientes activos desde un arreglo de productos
export const fbAddActiveIngredients = async (user, products) => {
  const activeIngredientsCollection = collection(db, 'businesses', user.businessID, 'activeIngredients');

  try {
    // Obtener ingredientes activos existentes
    const existingActiveIngredientsSnapshot = await getDocs(activeIngredientsCollection);
    const existingActiveIngredientsByName = new Map();
    existingActiveIngredientsSnapshot.docs.forEach(docSnapshot => {
      const data = docSnapshot.data();
      const nameLowerCase = data.name?.toLowerCase();
      if (nameLowerCase) {
        existingActiveIngredientsByName.set(nameLowerCase, { docSnapshot, data });
      }
    });

    const batch = writeBatch(db);
    let operationCount = 0;

    // Crear un conjunto único de ingredientes activos desde los productos
    const uniqueIngredients = new Set();
    products.forEach(product => {
      if (product.activeIngredients) {
        // Dividir ingredientes activos si son cadenas separadas por comas
        const ingredients = product.activeIngredients.split(',').map(i => i.trim());
        ingredients.forEach(ingredient => uniqueIngredients.add(ingredient));
      }
    });

    // Procesar los ingredientes activos únicos
    for (const ingredient of uniqueIngredients) {
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
        console.log(`Ingrediente activo agregado: ${ingredient}`);
      } else {
        // Actualizar el campo updatedAt del ingrediente existente
        const { docSnapshot } = existingActiveIngredientsByName.get(ingredientNameLowerCase);
        batch.update(docSnapshot.ref, { updatedAt: serverTimestamp() });
        operationCount++;
        console.log(`Ingrediente activo actualizado: ${ingredient}`);
      }
    }

    // Confirmar el batch
    if (operationCount > 0) {
      await batch.commit();
      console.log('Ingredientes activos procesados exitosamente.');
    } else {
      console.log('No se encontraron nuevos ingredientes activos para procesar.');
    }
  } catch (error) {
    console.error('Error al procesar los ingredientes activos:', error);
  }
};
