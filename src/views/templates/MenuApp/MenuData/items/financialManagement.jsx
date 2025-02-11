import { faClipboard, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { icons } from "../../../../../constants/icons/icons";
import ROUTES_NAME from "../../../../../routes/routesName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { PURCHASES, PURCHASES_CREATE } = ROUTES_NAME.PURCHASE_TERM
const { ORDERS, ORDERS_CREATE } = ROUTES_NAME.ORDER_TERM

const { EXPENSES_CREATE, EXPENSES_LIST, EXPENSES_CATEGORY } = ROUTES_NAME.EXPENSES_TERM
const { CASH_RECONCILIATION_LIST } = ROUTES_NAME.CASH_RECONCILIATION_TERM

const ChevronRight = icons.arrows.chevronRight
const ChevronLeft = icons.arrows.chevronLeft

const financialManagement = [
    {
        title: 'Compras y Pedidos',
        icon: icons.menu.unSelected.purchase,
        submenuIconOpen: ChevronLeft, 
        submenuIconClose: ChevronRight,
        group: 'inventory',
        submenu: [
            {
                title: 'Pedidos',
                icon: <FontAwesomeIcon icon={faClipboard} />,
                route: ORDERS,
                group: 'purchases'
            },
            {
                title: 'Compras',
                route: PURCHASES,
                icon: <FontAwesomeIcon icon={faClipboardCheck} />,
                group: 'purchases'
            },
        ]
    },
    {
        title: 'Gastos del Negocio',
        icon: icons.menu.unSelected.expenses.expenses,
        submenuIconOpen: ChevronLeft,
        submenuIconClose: ChevronRight,
        group: 'financialManagement',
        submenu: [
            {
                title: 'Lista de Gastos',
                route: EXPENSES_LIST,
                icon: icons.menu.unSelected.expenses.list
            },
            {
                title: 'Registro de Gasto',
                route: EXPENSES_CREATE,
                icon: icons.menu.unSelected.expenses.register
            },
            {
                title: 'Categoría de Gastos',
                route: EXPENSES_CATEGORY,
                icon: icons.menu.unSelected.expenses.category
            }
        ]
    },
    {
        title: 'Cuadre de caja',
        icon: icons.menu.unSelected.cashReconciliation,
        route: CASH_RECONCILIATION_LIST,
        group: 'financialManagement'
    },
]

export default financialManagement;