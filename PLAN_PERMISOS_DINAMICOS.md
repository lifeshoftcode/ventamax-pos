# Plan de Implementación: Sistema Híbrido de Permisos

## 🎯 Objetivo
Crear un sistema escalable que combine roles base con permisos dinámicos personalizables por usuario.

## 📋 Estructura Propuesta

### 1. **Roles Base** (Mantener)
```javascript
// Roles base con permisos esenciales
const baseRoles = {
  cashier: ['read User', 'manage Bill', 'manage Product', 'manage CashCount'],
  manager: ['manage User', 'manage Business', 'read all'],
  admin: ['manage all'],
  // etc...
}
```

### 2. **Permisos Dinámicos** (Nuevo)
```javascript
// Estructura en Firestore: /businesses/{businessID}/userPermissions/{userID}
{
  userId: "user123",
  businessId: "business456", 
  additionalPermissions: [
    "read PriceList",
    "modify Price", 
    "create Report",
    "access Analytics"
  ],
  restrictedPermissions: [
    "delete Product" // Quitar permisos del rol base
  ]
}
```

### 3. **Sistema Combinado**
```javascript
function defineAbilitiesForUser(user, dynamicPermissions = []) {
  const { can, cannot, rules } = new AbilityBuilder(PureAbility);
  
  // 1. Aplicar permisos base del rol
  const baseAbilities = getBaseRoleAbilities(user.role);
  baseAbilities.forEach(permission => {
    const [action, subject] = permission.split(' ');
    can(action, subject);
  });
  
  // 2. Aplicar permisos adicionales dinámicos
  dynamicPermissions.additionalPermissions?.forEach(permission => {
    const [action, subject] = permission.split(' ');
    can(action, subject);
  });
  
  // 3. Aplicar restricciones dinámicas
  dynamicPermissions.restrictedPermissions?.forEach(permission => {
    const [action, subject] = permission.split(' ');
    cannot(action, subject);
  });
  
  return rules;
}
```

## 🔧 Cambios Necesarios

### A. **Consolidar Cajeros** (Tu propuesta)
- ✅ Eliminar: `specialCashier1`, `specialCashier2`
- ✅ Mantener: `cashier` base
- ✅ Permisos especiales via sistema dinámico

### B. **Nueva Colección Firestore**
```
/businesses/{businessID}/userPermissions/{userID}
{
  additionalPermissions: string[],
  restrictedPermissions: string[],
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: userID
}
```

### C. **Actualizar Hook de Abilities**
```javascript
// Nuevo hook que combina rol + permisos dinámicos
export const useAbilities = () => {
  const user = useSelector(selectUser);
  const [dynamicPermissions, setDynamicPermissions] = useState([]);
  
  useEffect(() => {
    if (user) {
      // Cargar permisos dinámicos desde Firestore
      loadUserDynamicPermissions(user.id).then(setDynamicPermissions);
    }
  }, [user]);
  
  const abilities = useMemo(() => {
    return defineAbilitiesForUser(user, dynamicPermissions);
  }, [user, dynamicPermissions]);
  
  return abilities;
}
```

## 📍 Archivos a Modificar

### 1. **Roles** 
- `src/abilities/roles/cajero.js` - Consolidar en función base
- `src/abilities/roles.js` - Remover cajeros especiales
- `src/abilities/index.js` - Actualizar switch de roles

### 2. **Sistema de Permisos**
- `src/hooks/abilities/useAbilities.js` - Agregar carga dinámica
- `src/features/abilities/abilitiesSlice.js` - Manejar permisos dinámicos
- Nuevo: `src/services/dynamicPermissions.js` - CRUD permisos

### 3. **UI de Gestión** (Nuevo)
- Componente para asignar permisos adicionales a usuarios
- Interface admin para gestionar permisos disponibles

### 4. **Usos Actuales** (Verificar compatibilidad)
- ✅ `abilities.can('modify', 'Price')` - Funcionará igual
- ✅ `abilities.can('manage', 'User')` - Sin cambios
- ✅ Navegación y menús - Sin cambios

## 🚀 Plan de Migración

### Fase 1: Consolidar Cajeros
1. Crear función base `defineBaseAbilitiesForCashier`
2. Eliminar roles especiales del código
3. Migrar usuarios existentes a `cashier` base

### Fase 2: Sistema Dinámico
1. Crear colección Firestore
2. Actualizar hook de abilities  
3. Crear servicios de gestión

### Fase 3: UI de Gestión
1. Componente asignación permisos
2. Interface admin de permisos
3. Migración de permisos especiales existentes

## ✅ Beneficios

- **Escalabilidad**: Nuevos permisos sin deploy
- **Flexibilidad**: Permisos únicos por usuario
- **Mantenimiento**: Menos código hardcodeado
- **Auditoria**: Historial de cambios de permisos
- **Compatibilidad**: Funciona con CASL actual
