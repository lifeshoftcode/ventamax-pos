
import { getDiscount, money, getProductsIndividualDiscounts, hasIndividualDiscounts } from "../utils/formatters.js";

export function buildFooter(d) {
  /* Calcular descuentos */
  const individualDiscounts = getProductsIndividualDiscounts(d.products || []);
  const hasIndividualDisc = hasIndividualDiscounts(d.products || []);
  const generalDiscount = hasIndividualDisc ? 0 : getDiscount(d);

  return (current, total) => ({
    margin: [40, 0, 40, 0],
    columns: [
      { width: '*', text: '' },
      {
        width: 'auto',
        table: {
          body: [
            ['Sub-Total:', { text: money(d.totalPurchaseWithoutTaxes.value), style: 'totalsValue' }],
            ['ITBIS:', { text: money(d.totalTaxes.value), style: 'totalsValue' }],
            !hasIndividualDisc && d.discount?.value && ['Descuento General:', { text: `-${money(generalDiscount)}`, style: 'totalsValue' }],
            hasIndividualDisc && ['Descuentos Productos:', { text: `-${money(individualDiscounts)}`, style: 'totalsValue' }],
            d.delivery?.status && ['Delivery:', { text: money(d.delivery.value), style: 'totalsValue' }],
            [{ text: 'Total:', style: 'totalsLabel' }, { text: money(d.totalPurchase.value), style: 'totalsValue' }]
          ].filter(Boolean)
        },
        layout: 'noBorders'
      }
    ]
  })
}
