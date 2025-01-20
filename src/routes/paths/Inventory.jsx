import { Inventory, CategoryAdmin, MultimediaManager } from "../../views";
import validateRouteAccess from "../requiereAuthProvider";
import ROUTES_NAME from "../routesName";
import { ProductOutflow } from "../../views/pages/Inventario/pages/ProductOutflow/ProductOutflow";
import { ProductForm } from "../../views/pages/Inventario/pages/ProductForm/ProductForm";
import { Warehouse } from "../../views/pages/Inventory/components/Warehouse/Warehouse";
import WarehouseContent from "../../views/pages/Inventory/components/Warehouse/components/WarehouseContent";
import ShelfContent from "../../views/pages/Inventory/components/Warehouse/components/ShelfContent";
import RowShelfContent from "../../views/pages/Inventory/components/Warehouse/components/RowShelfContent";
import SegmentContent from "../../views/pages/Inventory/components/Warehouse/components/SegmentContent";
import WarehouseLayout from "../../views/pages/Inventory/components/Warehouse/components/WarehouseLayout";
import ProductView from "../../views/component/modals/Product/ProductView";
import DetailView from "../../views/pages/Inventory/components/Warehouse/components/DetailView/DetailView";
import ProductStockOverview from "../../views/pages/Inventory/components/Warehouse/components/ProductStockOverview";

const {
    INVENTORY_ITEMS,
    CATEGORIES,
    WAREHOUSE,
    SHELF,
    ROW,
    SEGMENT,
    PRODUCTS_STOCK,
    PRODUCT_STOCK,  
    INVENTORY_SERVICES,
    PRODUCT_IMAGES_MANAGER,
    PRODUCT_OUTFLOW,
    CREATE_PRODUCT,
    PRODUCT,
    WAREHOUSES
} = ROUTES_NAME.INVENTORY_TERM;

const Routes = [
    {
        path: INVENTORY_ITEMS,
        element: validateRouteAccess(<Inventory />),
    },
    {
        path: PRODUCT,
        element: validateRouteAccess(<ProductView />),
    },
    {
        path: CATEGORIES,
        element: validateRouteAccess(<CategoryAdmin />),
    },
    {
        path: PRODUCT_IMAGES_MANAGER,
        element: validateRouteAccess(<MultimediaManager />),
    },
    {
        path: WAREHOUSES,
        element: validateRouteAccess(<Warehouse />),
        children: [
            { path: WAREHOUSE, element: <DetailView /> },
            
            // { path: ':warehouseId', element: <DetailView /> },
            { path: SHELF, element: <DetailView /> },
            { path: ROW, element: <DetailView /> },
            { path: SEGMENT, element: <DetailView /> },
            { path: PRODUCTS_STOCK, element: validateRouteAccess(<ProductStockOverview />) },
            { path: PRODUCT_STOCK, element: validateRouteAccess(<ProductStockOverview />) },
        ]
    },
    {
        path: INVENTORY_SERVICES,
        element: validateRouteAccess(<Inventory />),
    },
    {
        path: PRODUCT_OUTFLOW,
        element: validateRouteAccess(<ProductOutflow />),
    },
    {
        path: CREATE_PRODUCT,
        element: validateRouteAccess(<ProductForm />),
    }
]

export default Routes;

