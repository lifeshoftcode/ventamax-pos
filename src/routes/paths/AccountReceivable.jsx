import AccountReceivableInfo from "../../views/pages/AccountReceivable/pages/AccountReceivableInfo/AccountReceivableInfo";
import { AccountReceivableList } from "../../views/pages/AccountReceivable/pages/AccountReceivableList/AccountReceivableList";
import { ReceivablePaymentReceipt } from "../../views/pages/Registro/ReceivablePaymentReceipt";
import ROUTES_NAME from "../routesName";

const { ACCOUNT_RECEIVABLE_LIST, ACCOUNT_RECEIVABLE_INFO, RECEIVABLE_PAYMENT_RECEIPTS } = ROUTES_NAME.ACCOUNT_RECEIVABLE;

const Routes = [
    { path: ACCOUNT_RECEIVABLE_LIST, element: <AccountReceivableList /> },
    { path: ACCOUNT_RECEIVABLE_INFO, element: <AccountReceivableInfo /> },
    { path: RECEIVABLE_PAYMENT_RECEIPTS, element: <ReceivablePaymentReceipt /> },
]

export default Routes;