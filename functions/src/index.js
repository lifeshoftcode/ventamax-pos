import { reconcileBatch } from "./modules/Inventory/functions/reconcileBatch.js";
import { handleInvoiceRequest } from "./modules/invoice/controllers/invoice.controller.js";
import { invoiceLetterPdf } from "./modules/invoice/templates/template2/invoiceLetterPdf.js";
import { quotationPdf } from "./modules/quotation/quotationGenerate/quotationGenerate.js";
import { keepSupabaseAlive } from "./modules/supabase/controllers/keepSupabaseAlive.controller.js";
import { handleCreateUser } from "./versions/v1/modules/auth/handle/handleCreateUser.js";
import { handleUpdateUser, handleUpdateUserWithPermissions, handleChangePassword } from "./versions/v1/modules/auth/handle/handleUpdateUser.js";

export { authLogin, authCheck, authLogout, expireSessions } from "./versions/v1/modules/auth/handle/handleLogin.js";
//mas tarde
// import { updateStockOnInvoiceCreate } from "./versions/v1/modules/inventory/triggers/updateStockOnInvoiceCreate.js";

export { 
  keepSupabaseAlive, 
  handleInvoiceRequest, 
  reconcileBatch, 
  quotationPdf, 
  invoiceLetterPdf, 
  handleCreateUser,
  handleUpdateUser,
  handleUpdateUserWithPermissions,
  handleChangePassword
};