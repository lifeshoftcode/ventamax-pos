import { Purchases, Orders } from "../../views";
import OrderManagement from "../../views/pages/OrderAndPurchase/OrderManagement/OrderManagement";
import PurchaseManagement from "../../views/pages/OrderAndPurchase/PurchaseManagement/PurchaseManagement";
import validateRouteAccess from "../requiereAuthProvider";
import ROUTES_NAME from "../routesName";

const { PURCHASES, PURCHASES_CREATE, PURCHASES_UPDATE, PURCHASES_COMPLETE } = ROUTES_NAME.PURCHASE_TERM;
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
]

export default PurchaseRoutes;