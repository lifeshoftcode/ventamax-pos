import { icons } from "../../../../../constants/icons/icons";
import ROUTES_NAME from "../../../../../routes/routesName";

const { INSURANCE_CONFIG } = ROUTES_NAME.INSURANCE_TERM

const insurance = [
    {
        title: 'Configuración de Seguro',
        icon: icons.insurance.insurance,
        route: INSURANCE_CONFIG,
        group: 'insurance'
    },
]

export default insurance;