import { icons } from "../../../../../constants/icons/icons";
import ROUTES_NAME from "../../../../../routes/routesName";

const { SETTING } = ROUTES_NAME.SETTING_TERM

const admin = [
    {
        title: 'Configuración',
        icon: icons.menu.unSelected.settings,
        route: SETTING,
        group: 'admin'
    },
  
    
]

export default admin;