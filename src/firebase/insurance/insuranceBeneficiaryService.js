import { collection, doc, setDoc, getDocs, onSnapshot } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { db } from "../firebaseconfig";

/**
 * Retorna la referencia a la colección "insuranceBeneficiaries" dentro del negocio.
 * La ruta es: businesses/{user.businessID}/insuranceBeneficiaries
 *
 * @param {object} user - Objeto usuario que contiene businessID y uid.
 * @returns {CollectionReference} - Referencia a la colección.
 */
const getInsuranceBeneficiariesCollection = (user) => {
  if (!user || !user.businessID) {
    console.warn("Usuario o businessID no disponible aún");
    return null;
  }
  return collection(db, "businesses", user.businessID, "insuranceBeneficiaries");
};

/**
 * Adds an insurance beneficiary to the system using setDoc.
 * Generates a custom ID using nanoid and sets audit fields using user.uid.
 *
 * @param {object} user - The user object with businessID and uid.
 * @param {object} beneficiaryData - The data of the insurance beneficiary.
 * @returns {Promise<string>} - The generated ID of the newly added beneficiary.
 */
export const addInsuranceBeneficiary = async (user, beneficiaryData) => {
  try {
    const id = nanoid();
    const createdAt = new Date().toISOString();
    const beneficiariesCollection = getInsuranceBeneficiariesCollection(user);
    if (!beneficiariesCollection) {
      console.warn("No se pudo agregar beneficiario: datos de usuario no disponibles");
      return null;
    }
    const newDocRef = doc(beneficiariesCollection, id);

    await setDoc(newDocRef, {
      id, // Se guarda el ID generado en el documento
      userId: user.uid, // Asocia el beneficiario al usuario (titular)
      ...beneficiaryData,
      createdBy: user.uid, // Usamos user.uid directamente
      createdAt,
      updatedAt: createdAt,
      deleted: false
    });
    
    return id;
  } catch (error) {
    console.error("Error adding insurance beneficiary:", error);
    throw error;
  }
};

/**
 * Updates the details of an insurance beneficiary using setDoc with merge option.
 * Adds/updates audit fields such as updatedAt and updatedBy using user.uid.
 *
 * @param {object} user - The user object with businessID and uid.
 * @param {string} beneficiaryId - The ID of the beneficiary to update.
 * @param {object} updatedData - The data fields to update.
 */
export const updateInsuranceBeneficiary = async (user, beneficiaryId, updatedData) => {
  try {
    const beneficiariesCollection = getInsuranceBeneficiariesCollection(user);
    if (!beneficiariesCollection) {
      console.warn("No se pudo actualizar beneficiario: datos de usuario no disponibles");
      return;
    }
    const beneficiaryDoc = doc(beneficiariesCollection, beneficiaryId);
    const updateTime = new Date().toISOString();
    
    await setDoc(
      beneficiaryDoc,
      {
        ...updatedData,
        updatedAt: updateTime,
        updatedBy: user.uid // Usamos user.uid directamente
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating insurance beneficiary:", error);
    throw error;
  }
};

/**
 * Soft deletes an insurance beneficiary from the system.
 * Instead of physically deleting the document, it marks it as deleted and sets audit fields.
 *
 * @param {object} user - The user object with businessID and uid.
 * @param {string} beneficiaryId - The ID of the beneficiary to soft delete.
 */
export const softDeleteInsuranceBeneficiary = async (user, beneficiaryId) => {
  try {
    const beneficiariesCollection = getInsuranceBeneficiariesCollection(user);
    if (!beneficiariesCollection) {
      console.warn("No se pudo eliminar (soft) beneficiario: datos de usuario no disponibles");
      return;
    }
    const beneficiaryDoc = doc(beneficiariesCollection, beneficiaryId);
    const deletedAt = new Date().toISOString();
    
    await setDoc(
      beneficiaryDoc,
      {
        deleted: true,
        deletedAt,
        deletedBy: user.uid // Usamos user.uid para marcar quien realiza la eliminación
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error soft deleting insurance beneficiary:", error);
    throw error;
  }
};

/**
 * Listens to real-time updates of insurance beneficiaries in the given business.
 *
 * @param {object} user - The user object with businessID and uid.
 * @param {function} callback - Function to call with the updated list of beneficiaries.
 * @param {function} errorCallback - (Optional) Function to call if an error occurs.
 * @returns {function} - The unsubscribe function to stop listening.
 */
export const listenInsuranceBeneficiaries = (user, callback, errorCallback) => {
  const beneficiariesCollection = getInsuranceBeneficiariesCollection(user);
  if (!beneficiariesCollection) {
    console.warn("No se pudo escuchar beneficiarios: datos de usuario no disponibles");
    // Retornamos una función de no-op para evitar errores en el unsubscribe
    return () => {};
  }
  return onSnapshot(
    beneficiariesCollection,
    (querySnapshot) => {
      const beneficiaries = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (!data.deleted) {
          beneficiaries.push({ id: docSnap.id, ...data });
        }
      });
      callback(beneficiaries);
    },
    errorCallback
  );
};

/**
 * Custom hook to listen for real-time updates of insurance beneficiaries.
 *
 * @param {object} user - The user object with businessID and uid.
 * @returns {Array} - The current list of active insurance beneficiaries.
 */
export const useInsuranceBeneficiaries = (user) => {
  const [beneficiaries, setBeneficiaries] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenInsuranceBeneficiaries(
      user,
      (data) => {
        setBeneficiaries(data);
      },
      (error) => {
        console.error("Error listening to insurance beneficiaries:", error);
      }
    );
    return () => unsubscribe();
  }, [user]);

  return beneficiaries;
};
