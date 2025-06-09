import { defineAbilitiesForManager } from './roles/gerente';
import { defineAbilitiesForCashier } from './roles/cajero';
import { defineAbilitiesForBuyer } from './roles/comprador';
import { defineAbilitiesForAdmin } from './roles/admin';
import { defineAbilitiesForOwner } from './roles/owner';
import { defineAbilitiesForDev } from './roles/dev';
import { getUserDynamicPermissions } from '../services/dynamicPermissions';


const ROLE_ABILITIES = {
  ownerAbilities: defineAbilitiesForOwner,  //dueño
  adminAbilities: defineAbilitiesForAdmin, //administrador
  managerAbilities: defineAbilitiesForManager, //gerente
  cashierAbilities: defineAbilitiesForCashier, //cajero
  buyerAbilities: defineAbilitiesForBuyer,//comprador
  devAbilities: defineAbilitiesForDev, //desarrollador
};

export async function defineAbilitiesFor(user) {
  // Obtener permisos base del rol
  const baseAbilities = getBaseAbilitiesForRole(user);
  
  // Si no hay user.id, solo devolver permisos base
  if (!user?.id) {
    return baseAbilities;
  }
  
  try {
    // Obtener permisos dinámicos de Firestore
    const dynamicPermissions = await getUserDynamicPermissions(user.id);
    
    // Combinar permisos base con dinámicos
    return combineAbilities(baseAbilities, dynamicPermissions, user);
  } catch (error) {
    console.warn('Error loading dynamic permissions, using base only:', error);
    return baseAbilities;
  }
}

function getBaseAbilitiesForRole(user) {
  const { adminAbilities, cashierAbilities, buyerAbilities, managerAbilities, ownerAbilities, devAbilities } = ROLE_ABILITIES
  switch (user.role) {
    case 'owner':
      return ownerAbilities(user);
    case 'admin':
      return adminAbilities(user);
    case 'cashier':
    case 'specialCashier1': // Migración: ahora usa cashier base
    case 'specialCashier2': // Migración: ahora usa cashier base
      return cashierAbilities(user);
    case 'buyer':
      return buyerAbilities(user);
    case 'dev':
      return defineAbilitiesForDev(user);
    case 'manager':
      return managerAbilities(user);
    default:
      return []; // si no se reconoce el rol, no se dan habilidades
  }
}

function combineAbilities(baseAbilities, dynamicPermissions, user) {
  // Convertir abilities base a array si no lo es
  let combinedAbilities = Array.isArray(baseAbilities) ? [...baseAbilities] : baseAbilities.rules || [];
  
  // Agregar permisos adicionales
  if (dynamicPermissions.additionalPermissions) {
    dynamicPermissions.additionalPermissions.forEach(permission => {
      // Verificar que no esté ya incluido
      const exists = combinedAbilities.some(rule => 
        rule.action === permission.action && 
        rule.subject === permission.subject
      );
      
      if (!exists) {
        combinedAbilities.push({
          action: permission.action,
          subject: permission.subject
        });
      }
    });
  }
  
  // Remover permisos restringidos
  if (dynamicPermissions.restrictedPermissions) {
    dynamicPermissions.restrictedPermissions.forEach(restriction => {
      combinedAbilities = combinedAbilities.filter(rule => 
        !(rule.action === restriction.action && rule.subject === restriction.subject)
      );
    });
  }
  
  return combinedAbilities;
}











