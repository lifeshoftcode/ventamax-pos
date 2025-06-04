// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
//TODO ***AUTH**************************************
import { getAuth } from "firebase/auth";
//TODO ***FIRESTORE***********************************
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where, enableIndexedDbPersistence, arrayUnion, arrayRemove, increment, Timestamp, Firestore, runTransaction, initializeFirestore, persistentLocalCache, persistentSingleTabManager, connectFirestoreEmulator } from "firebase/firestore";
//TODO ***STORAGE***********************************
import { getStorage, } from "firebase/storage"
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
import { onEnv } from "../utils/env";
import { connectEmulatorsIfAvailable } from "./emulator/emulator";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() })
});
// export const db = getFirestore(app);

export const storage = getStorage(app);
export const auth = getAuth(app)
export const functions = getFunctions(app);
export const vertexAI = getVertexAI(app);

export const listFirst5UserNames = async () => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("user.name", "==", "dev#3407"));
  const snap = await getDocs(q);

  return snap.docs
    .map(doc => doc.data())      // {name, email, …}
    .map(user => user.user.name);     // solo el nombre
};

// function servicesEmulator() {
//   const host = '127.0.0.1';
//   const services = [
//     {
//       name: 'functions',
//       port: 5001,
//       connect: () => connectFunctionsEmulator(functions, host, 5001)
//     },
//     {
//       name: 'firestore',
//       port: 8081,
//       connect: () => connectFirestoreEmulator(db, host, 8081)
//     }
//   ];
//   onEnv('dev', async () => {
//     // connectFunctionsEmulator(functions, '127.0.0.1', 5001);
//     // connectFirestoreEmulator(db, '127.0.0.1', 8081);
//     // console.info('[Emulator] connected to functions & firestore');
//     const status =  await connectEmulatorsIfAvailable(services);
//     console.log('Emuladores: ', status);
//     const upList = status
//     .filter(s => s.connected)
//     .map(s => s.name);
//     console.log(`Emuladores conectados: ${upList.join(', ')}`);
//   });
// };

// servicesEmulator();

export const generativeModel = getGenerativeModel(vertexAI, {
  model: "gemini-2.5-flash-preview-04-17",
});




// export const getTaxes = async (setTaxes) => {
//   const taxesRef = collection(db, "taxes")
//   const { docs } = await getDocs(taxesRef)
//   const taxesArray = docs.map(item => item.data())
//   if (taxesArray.length === 0) return;
//   if (taxesArray.length > 0) return setTaxes(taxesArray)
// }
export const addIngredientTypePizza = async (ingredient) => {
  const IngredientRef = doc(db, "products", "6dssod");
  // Atomically add a new region to the "regions" array field.
  try {
    await updateDoc(IngredientRef, {
      ingredientList: arrayUnion(ingredient)
    });
  } catch (error) {
  }

}
export const deleteIngredientTypePizza = async (ingredient) => {
  const IngredientRef = doc(db, "products", "6dssod");
  try {
    await updateDoc(IngredientRef, {
      ingredientList: arrayRemove(ingredient)
    });
  } catch (error) {
  }
}
