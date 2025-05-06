import { Setting, TaxReceiptSetting, UserAdmin } from "../../views";
import SwitchBusiness from "../../views/pages/dev/SwitchBusiness";
import GeneralConfig from "../../views/component/GeneralConfig/GeneralConfig";
import BillingConfig from "../../views/component/GeneralConfig/configs/BillingConfig";
import AppInfo from "../../views/pages/setting/subPage/AppInfo/AppInfo";
import BusinessInfo from "../../views/pages/setting/subPage/BusinessEditor/BusinessEditorProfile";
import BusinessCreator from "../../views/pages/setting/subPage/BusinessEditor/BusinessCreator";
import EditUser from "../../views/pages/setting/subPage/Users/components/EditUser/EditUser";
import { UserList } from "../../views/pages/setting/subPage/Users/components/UsersList/UserList";
import ROUTES_NAME from "../routesName";
import { getRelativePath } from "../getConfigRoute";

const {
    SETTINGS,
    USERS,
    USERS_LIST,
    TAX_RECEIPT,
    SETTING,
    APP_INFO,
    BUSINESS_INFO,
    CREATE_BUSINESS,
    GENERAL_CONFIG_APP_INFO,
    GENERAL_CONFIG_BILLING,
    GENERAL_CONFIG_BUSINESS,
    GENERAL_CONFIG_TAX_RECEIPT,
    GENERAL_CONFIG_USERS,
} = ROUTES_NAME.SETTING_TERM;

const basePath = SETTINGS;
const Routes = [
    { path: SETTINGS, element: <Setting /> },
    {
        path: USERS,
        element: <UserAdmin />,
        name: USERS,
        children: [
            {
                path: USERS_LIST,
                element: <UserList />,
            },
        ]
    },    {        path: `${SETTING}`,
        element: <GeneralConfig />,
        children: [
            {
                path: '',
                element: <BillingConfig />,
            },
            {
                path: getRelativePath(GENERAL_CONFIG_BILLING, SETTING),
                element: <BillingConfig />,
            },
            {
                path: getRelativePath(GENERAL_CONFIG_BUSINESS, SETTING),
                element: <BusinessInfo />,
            },
            {
                path: getRelativePath(GENERAL_CONFIG_TAX_RECEIPT, SETTING),
                element: <TaxReceiptSetting />,
            },
            {
                path: getRelativePath(GENERAL_CONFIG_USERS, SETTING),
                element: <UserList />,
            },
            {
                path: getRelativePath(GENERAL_CONFIG_APP_INFO, SETTING),
                element: <AppInfo />,
            },
        ],
    },
    { path: `${basePath}${TAX_RECEIPT}`, element: <TaxReceiptSetting /> },
    { path: `${basePath}${BUSINESS_INFO}`, element: <BusinessInfo /> },
    { path: `${CREATE_BUSINESS}`, element: <BusinessCreator /> },
    { path: `${basePath}${APP_INFO}`, element: <AppInfo /> },
    { path: ROUTES_NAME.DEV_VIEW_TERM.SWITCH_BUSINESS, element: <SwitchBusiness /> }
]

export default Routes;