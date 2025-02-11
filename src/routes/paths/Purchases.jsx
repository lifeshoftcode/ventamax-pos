import { Purchases, Orders } from "../../views";
import OrderManagement from "../../views/pages/OrderAndPurchase/OrderManagement/OrderManagement";
import PurchaseManagement from "../../views/pages/OrderAndPurchase/PurchaseManagement/PurchaseManagement";
import BackOrders from "../../views/pages/OrderAndPurchase/BackOrders/BackOrders";
import validateRouteAccess from "../requiereAuthProvider";
import ROUTES_NAME from "../routesName";

const { PURCHASES, PURCHASES_CREATE, PURCHASES_UPDATE, PURCHASES_COMPLETE, BACKORDERS } = ROUTES_NAME.PURCHASE_TERM;
const { ORDERS, ORDERS_CREATE, ORDERS_CONVERT, ORDERS_UPDATE } = ROUTES_NAME.ORDER_TERM;

const PurchaseRoutes = [
    //purchase routes
    { path: PURCHASES, element: validateRouteAccess(<Purchases />) },
    { path: PURCHASES_CREATE, element: validateRouteAccess(<PurchaseManagement />) },
    { path: PURCHASES_UPDATE, element: validateRouteAccess(<PurchaseManagement />) },
    { path: PURCHASES_COMPLETE, element: validateRouteAccess(<PurchaseManagement />) },

    //order routes
    { path: ORDERS, element: validateRouteAccess(<Orders />) },
    { path: ORDERS_CREATE, element: validateRouteAccess(<OrderManagement />) },
    { path: ORDERS_UPDATE, element: validateRouteAccess(<OrderManagement />) },
    { path: ORDERS_CONVERT, element: validateRouteAccess(<PurchaseManagement />) },
    
    //backorders route
    { path: BACKORDERS, element: validateRouteAccess(<BackOrders />) },
]

export default PurchaseRoutes;