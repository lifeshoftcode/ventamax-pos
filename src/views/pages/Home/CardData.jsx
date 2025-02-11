import ROUTES_NAME from '../../../routes/routesName';
import { icons } from '../../../constants/icons/icons';
import { userAccess } from '../../../hooks/abilities/useAbilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faWarehouse } from '@fortawesome/free-solid-svg-icons';

const createMenuItems = (items) => items.map((item, index) => ({ ...item, id: index + 1 }));

const menuItems = createMenuItems([
  { title: 'Venta', icon: icons.menu.unSelected.sale, route: ROUTES_NAME.SALES_TERM.SALES, category: 'Ventas' },
  { title: 'Facturas', icon: icons.menu.unSelected.register, route: ROUTES_NAME.SALES_TERM.BILLS, category: 'Ventas' },
  { title: 'Preventas', icon: <FontAwesomeIcon icon={faTicket} />, route: ROUTES_NAME.SALES_TERM.PREORDERS, category: 'Ventas' },
  { title: 'Compras', icon: icons.menu.unSelected.purchase, route: ROUTES_NAME.PURCHASE_TERM.PURCHASES, category: 'Operaciones' },
  { title: 'Ordenes', icon: icons.menu.unSelected.order, route: ROUTES_NAME.ORDER_TERM.ORDERS, category: 'Operaciones' },
  { title: 'Cuentas por Cobrar', icon: icons.menu.unSelected.accountsReceivable, route: ROUTES_NAME.ACCOUNT_RECEIVABLE.RECEIVABLE_PAYMENT_RECEIPTS, category: 'Finanzas' },
  { title: 'Productos', icon: icons.menu.unSelected.inventory, route: ROUTES_NAME.INVENTORY_TERM.INVENTORY_ITEMS, category: 'Inventario' },
  { title: 'Almacenes', icon: <FontAwesomeIcon icon={faWarehouse} />, route: ROUTES_NAME.INVENTORY_TERM.WAREHOUSES, category: 'Inventario' },
  { title: 'Clientes', icon: icons.users.client, route: ROUTES_NAME.CONTACT_TERM.CLIENTS, category: 'Contactos' },
  { title: 'Proveedores', icon: icons.users.provider, route: ROUTES_NAME.CONTACT_TERM.SUPPLIERS, category: 'Contactos' },
  { title: 'Cuadre de Caja', icon: icons.menu.unSelected.cashReconciliation, route: ROUTES_NAME.CASH_RECONCILIATION_TERM.CASH_RECONCILIATION_LIST, category: 'Finanzas' },
]);

const developerItems = createMenuItems([
  { title: 'Gestionar Negocios', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.MANAGE_BUSINESS, category: 'Desarrollador' },
  { title: 'Gestionar Actualización', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.CHANGELOG_MANAGE, category: 'Desarrollador' },
  { title: 'Documentar Actualización', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.CHANGELOG_CREATE, category: 'Desarrollador' },
  { title: 'Todos los usuarios', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.ALL_USERS, category: 'Desarrollador' },
]);

export const getMenuCardData = () => {
  const { abilities } = userAccess();
  return menuItems.filter(item => abilities.can('access', item.route));
};

export const getDeveloperFeaturesData = () => {
  const { abilities } = userAccess();
  return abilities?.can('developerAccess', 'all') ? developerItems : [];
};