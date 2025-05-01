import { SignUp } from "../../views";
import { LoginV2 } from "../../views/pages/Login/Loginv2/Loginv2";
import ROUTES_NAME from "../routesName";

const { LOGIN, SIGNUP } = ROUTES_NAME.AUTH_TERM;
const Routes = [
    { path: LOGIN, element: <LoginV2 />, isPublic: true },
    { path: SIGNUP, element: <SignUp />, isPublic: true },
]

export default Routes;