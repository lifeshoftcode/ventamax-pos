import ROUTES_NAME from '../../../routes/routesName';
import { icons } from '../../../constants/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { filterMenuItemsByAccess, hasDeveloperAccess } from '../../../utils/menuAccess';
import { BugOutlined } from '@ant-design/icons';

const createMenuItems = (items) => items.map((item, index) => ({ ...item, id: index + 1 }));

const menuItems = createMenuItems([
  { title: 'Venta', icon: icons.menu.unSelected.sale, route: ROUTES_NAME.SALES_TERM.SALES, category: 'Ventas' },
  { title: 'Facturas', icon: icons.menu.unSelected.register, route: ROUTES_NAME.SALES_TERM.BILLS, category: 'Ventas' },
  { title: 'Preventas', icon: <FontAwesomeIcon icon={faTicket} />, route: ROUTES_NAME.SALES_TERM.PREORDERS, category: 'Ventas' },
  { title: 'Compras', icon: icons.menu.unSelected.purchase, route: ROUTES_NAME.PURCHASE_TERM.PURCHASES, category: 'Operaciones' },
  { title: 'Ordenes', icon: icons.menu.unSelected.order, route: ROUTES_NAME.ORDER_TERM.ORDERS, category: 'Operaciones' },
  { title: 'Cuentas por Cobrar', icon: icons.menu.unSelected.accountsReceivable, route: ROUTES_NAME.ACCOUNT_RECEIVABLE.ACCOUNT_RECEIVABLE_LIST, category: 'Finanzas' },
  { title: 'Notas de Crédito', icon: icons.finances.fileInvoiceDollar, route: ROUTES_NAME.CREDIT_NOTE_TERM.CREDIT_NOTE_LIST, category: 'Finanzas' },
  { title: 'Productos', icon: icons.menu.unSelected.inventory, route: ROUTES_NAME.INVENTORY_TERM.INVENTORY_ITEMS, category: 'Inventario' },
  { title: 'Almacenes', icon: <FontAwesomeIcon icon={faWarehouse} />, route: ROUTES_NAME.INVENTORY_TERM.WAREHOUSES, category: 'Inventario' },
  { title: 'Clientes', icon: icons.users.client, route: ROUTES_NAME.CONTACT_TERM.CLIENTS, category: 'Contactos' },
  { title: 'Proveedores', icon: icons.users.provider, route: ROUTES_NAME.CONTACT_TERM.SUPPLIERS, category: 'Contactos' },
  { title: 'Cuadre de Caja', icon: icons.menu.unSelected.cashReconciliation, route: ROUTES_NAME.CASH_RECONCILIATION_TERM.CASH_RECONCILIATION_LIST, category: 'Finanzas' },
]);

const developerItems = createMenuItems([
  { title: 'Panel Desarrollador', icon: <BugOutlined />, action: 'openDeveloperModal', category: 'Desarrollador' },
  { title: 'Cambiar Negocio', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.SWITCH_BUSINESS, category: 'Desarrollador' },
  { title: 'Gestionar Negocios', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.BUSINESSES, category: 'Desarrollador' },
  { title: 'Gestionar Actualización', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.CHANGELOG_MANAGE, category: 'Desarrollador' },
  { title: 'Documentar Actualización', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.CHANGELOG_CREATE, category: 'Desarrollador' },
  { title: 'Todos los usuarios', icon: icons.operationModes.add, route: ROUTES_NAME.DEV_VIEW_TERM.ALL_USERS, category: 'Desarrollador' },
  { title: 'Configuración de App', icon: icons.menu.selected.settings, route: ROUTES_NAME.DEV_VIEW_TERM.APP_CONFIG.ROOT, category: 'Desarrollador' },
]);

export const getMenuCardData = () => {
  return filterMenuItemsByAccess(menuItems);
};

export const getDeveloperFeaturesData = () => {
  return hasDeveloperAccess() ? developerItems : [];
};