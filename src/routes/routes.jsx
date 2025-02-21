import { NotFound } from "../views";
import basic from "./paths/Basic";
import auth from "./paths/Auth";
import inventory from "./paths/Inventory";
import contacts from "./paths/Contact";
import settings from "./paths/Setting";
import sales from "./paths/Sales";
import purchases from "./paths/Purchases";
import lab from "./paths/Lab";
import cashReconciliation from "./paths/CashReconciliztion";
import dev from "./paths/Dev";
import expenses from "./paths/Expenses";
import changelogs from "./paths/Changelogs"
import utility from "./paths/Utility";
import accountReceivable from './paths/AccountReceivable'
import insurance from './paths/Insurance'

export const routes = [
    ...basic,
    ...auth,
    ...inventory,
    ...contacts,
    ...settings,
    ...sales,
    ...purchases,
    ...lab,
    ...cashReconciliation,
    ...expenses,
    ...dev,
    ...changelogs,
    ...utility,
    ...accountReceivable,
    ...insurance,
    {
        path: "*",
        element: <NotFound />,
        title: "Página no encontrada",
        metaDescription: "Lo sentimos, la página que estás buscando no existe.",
    }
]