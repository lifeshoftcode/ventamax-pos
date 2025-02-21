import validateRouteAccess from "../requiereAuthProvider";
import InsuranceConfig from "../../views/pages/Insurance/InsuranceConfig/InsuraceConfig";
import { ROUTES } from '../routesName';
import InsuranceConfigForm from "../../views/pages/Insurance/InsuranceConfigForm/InsuranceConfigForm";

const { INSURANCE_CONFIG, INSURANCE_CREATE } = ROUTES.INSURANCE_TERM;

const routes = [
    {
        path: INSURANCE_CONFIG,
        element: validateRouteAccess(<InsuranceConfig />),
    },
    // {
    //     path: INSURANCE_TERM.INSURANCE_LIST,
    //     element: validateRouteAccess(/*element*/),
    // },
    { 
        path: INSURANCE_CREATE,
        element: validateRouteAccess(<InsuranceConfigForm  />),
    },
    // {
    //     path: INSURANCE_TERM.INSURANCE_EDIT,
    //     element: validateRouteAccess(/*element*/),
    // },
    // {
    //     path: INSURANCE_TERM.INSURANCE_DETAILS,
    //     element: validateRouteAccess(/*element*/),
    // },
]

export default routes;