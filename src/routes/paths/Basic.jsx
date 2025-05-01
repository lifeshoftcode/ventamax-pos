import { Home, Welcome } from "../../views";
import ROUTES_NAME from "../routesName";

const { BASIC_TERM } = ROUTES_NAME;
const { HOME, WELCOME } = BASIC_TERM;
const Routes = [
    {
        path: WELCOME,
        element: <Welcome />,
        isPublic: true,
    },
    {
        path: HOME,
        element: <Home />,
        title: "Dashboard - Ventamax",
        metaDescription: "Resumen de estadísticas, accesos rápidos y actividades recientes en Ventamax POS.",
    }
]

export default Routes;