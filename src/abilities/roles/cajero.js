import { AbilityBuilder, PureAbility } from '@casl/ability';
import { useMatch } from 'react-router-dom';
import routesName from '../../routes/routesName';

function defineBaseAbilities(can, cannot) {
  const {
    SALES_TERM,
    SETTING_TERM,
    ACCOUNT_RECEIVABLE,
    CONTACT_TERM,
    BASIC_TERM,
    INVENTORY_TERM,
    CASH_RECONCILIATION_TERM
  } = routesName;

  const { CLIENTS } = CONTACT_TERM;

  const { ACCOUNT_RECEIVABLE_LIST, RECEIVABLE_PAYMENT_RECEIPTS, ACCOUNT_RECEIVABLE_INFO } = ACCOUNT_RECEIVABLE;

  const {
    CASH_RECONCILIATION_CLOSURE,
    CASH_RECONCILIATION_INVOICE_OVERVIEW,
    CASH_RECONCILIATION_LIST,
    CASH_RECONCILIATION_OPENING
  } = CASH_RECONCILIATION_TERM;

  const { SALES, BILLS } = SALES_TERM;
  const { HOME } = BASIC_TERM;
  const { INVENTORY_ITEMS } = INVENTORY_TERM;

  // Permisos que SÍ puede hacer
  can('manage', 'Bill');
  can('manage', 'Product');
  can(['read', 'create', 'update'], 'Client');
  can(['read', 'create', 'update'], 'Provider');
  can(['read', 'create', 'update'], 'Category');
  can('manage', 'CashCount');
  can('access', HOME);
  can('access', CASH_RECONCILIATION_OPENING);
  can('access', CASH_RECONCILIATION_CLOSURE);
  can('access', CASH_RECONCILIATION_LIST);
  can('access', ACCOUNT_RECEIVABLE_LIST);
  can('access', RECEIVABLE_PAYMENT_RECEIPTS);
  can('access', ACCOUNT_RECEIVABLE_INFO);
  can('access', SALES);
  can('access', BILLS);
  can('access', CLIENTS);
  can('access', INVENTORY_ITEMS);
  can('manage', 'accountReceivable');
  can('read', 'User');

  // Permisos que NO puede hacer por defecto (pueden ser habilitados dinámicamente)
  cannot('read', 'PriceList');
  cannot('modify', 'Price');
  cannot('manage', 'users');
  cannot('access', 'admin-panel');
  cannot('delete', 'Product');
  cannot('manage', 'business-settings');
}

export function defineAbilitiesForCashier(user) {
  const { can, cannot, rules } = new AbilityBuilder(PureAbility);
  defineBaseAbilities(can, cannot);

  // Permisos adicionales que pueden ser habilitados dinámicamente
  // Estos eran los permisos de specialCashier1 y specialCashier2
  // Ahora se manejarán via sistema dinámico de permisos
  
  // specialCashier1 tenía: can('read', 'PriceList')
  // specialCashier2 tenía: can('read', 'PriceList') + can('modify', 'Price')
  
  return rules
}