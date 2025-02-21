import { Setting, TaxReceiptSetting, UserAdmin } from "../../views";
import GeneralConfig from "../../views/component/GeneralConfig/GeneralConfig";
import AppInfo from "../../views/pages/setting/subPage/AppInfo/AppInfo";
import BusinessInfo from "../../views/pages/setting/subPage/BusinessEditor/BusinessEditorProfile";
import BusinessCreator from "../../views/pages/setting/subPage/BusinessEditor/BusinessCreator";
import EditUser from "../../views/pages/setting/subPage/Users/components/EditUser/EditUser";
import { UserList } from "../../views/pages/setting/subPage/Users/components/UsersList/UserList";
import validateRouteAccess from "../requiereAuthProvider";
import ROUTES_NAME from "../routesName";

const {
    SETTINGS,
    USERS,
    UPDATE_USER,
    USERS_LIST,
    TAX_RECEIPT,
    SETTING,
    APP_INFO,
    BUSINESS_INFO,
    CREATE_BUSINESS,
    CREATE_USER
} = ROUTES_NAME.SETTING_TERM;

const basePath = SETTINGS;
const Routes = [
    { path: SETTINGS, element: validateRouteAccess(<Setting />), },
    {
        path: USERS,
        element: validateRouteAccess(<UserAdmin />),
        name: USERS,
        children: [
            {
                path: USERS_LIST,
                element: validateRouteAccess(<UserList />),
            },
        ]
    },
    {
        path: `${SETTING}`,
        element: validateRouteAccess(<GeneralConfig />),
    },
    { path: `${basePath}${TAX_RECEIPT}`, element: validateRouteAccess(<TaxReceiptSetting />) },
    { path: `${basePath}${BUSINESS_INFO}`, element: validateRouteAccess(<BusinessInfo />) },
    { path: `${CREATE_BUSINESS}`, element: validateRouteAccess(<BusinessCreator />) },
    { path: `${basePath}${APP_INFO}`, element: validateRouteAccess(<AppInfo />) }
]

export default Routes;