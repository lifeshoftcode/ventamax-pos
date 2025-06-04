import { ClientAdmin, ProviderAdmin } from "../../views";
import ROUTES_NAME from "../routesName";
const {CONTACT_TERM} = ROUTES_NAME;
const {CLIENTS, SUPPLIERS} = CONTACT_TERM;
const Routes = [
    { path: CLIENTS, element: <ClientAdmin /> },
    { path: SUPPLIERS, element: <ProviderAdmin /> }
]

export default Routes;