# 🔧 Custom Instructions - VentamaxOficial

## ⚡ Protocolo Rápido: Librerías

**ANTES de usar cualquier librería:**
1. 📦 Verificar version en `package.json` (raíz + `functions/`)
2. 🌐 Buscar docs oficiales de la versión específica
3. ✅ Confirmar API/métodos disponibles

## 📊 Stack Principal

| Tecnología | Versión | Notas Críticas |
|------------|---------|----------------|
| **React** | ^18.2.0 | Hooks modernos, Concurrent features |
| **Firebase** | ^11.0.1 | SDK modular v11, no compat |
| **Antd** | ^5.25.3 | v5 API, theme config diferente |
| **Redux Toolkit** | ^1.9.1 | createSlice, RTK Query |
| **React Router** | ^6.4.5 | useNavigate, no history API |
| **Vite** | ^6.3.5 | ESM, HMR |
| **Node** (functions) | 20 | Engine constraint |

## 🚨 Verificaciones Específicas

**Firebase**: Modular SDK v11 syntax obligatorio
**Antd**: v5 breaking changes desde v4
**React Router**: v6 hooks (useNavigate, useParams)
**Redux**: RTK patterns, no vanilla Redux

## � Workflow

```bash
npm list [librería]  # Verificar versión
```
→ Buscar: `[librería] v[versión] docs`  
→ Confirmar APIs  
→ Implementar

## 🔗 Quick Links

- [React 18.2](https://react.dev/)
- [Firebase v11](https://firebase.google.com/docs/web)
- [Antd v5.25](https://ant.design/components/overview/)
- [Redux Toolkit v1.9](https://redux-toolkit.js.org/)

---
*VentamaxOficial - Mayo 2025*
