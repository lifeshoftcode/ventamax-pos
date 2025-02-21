import { AllUsersControl } from "../../views/controlPanel/AllUsersControl/AllUsersControl";
import ChangeLogCreate from "../../views/controlPanel/ChangeLogControl/ChangeLogCreate/ChangeLogCreate";
import { BusinessControl } from "../../views/controlPanel/CreateBusinessControl/BusinessControl";
import { CreateBusiness } from "../../views/controlPanel/CreateBusinessControl/CreateBusiness";
import { Dev } from "../../views/controlPanel/Dev/Dev";
import BusinessCreator from "../../views/pages/setting/subPage/BusinessEditor/BusinessCreator";
import { Doc } from "../../views/templates/system/AdvancedTable/Doc";

import Menu from "../../views/templates/system/Menu/Menu";
import { Prueba } from "../../views/templates/system/Menu/Prueba";

import RoutesName from "../routesName"
const { CREATE_BUSINESS, BUSINESSES, CHANGELOG_CREATE, CHANGELOG_MANAGE, ALL_USERS } = RoutesName.DEV_VIEW_TERM;

const routes = [
    {
        path: BUSINESSES,
        element: <BusinessControl />,
    },
    {
        path: CREATE_BUSINESS,
        element: <BusinessCreator />,
    },
    {
        path: '/doc',
        element: <Doc/>
    },
    {
        path: '/menu',
        element: <Menu />,
    },
    {
        path: '/prueba',
        element: <Prueba />,
    },
    {
        path: ALL_USERS,
        element: <AllUsersControl />,
    },
    {
        path: CHANGELOG_CREATE,
        element: <ChangeLogCreate />,
    }
]
export default routes;