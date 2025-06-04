
import { getDiscount, money } from "../utils/formatters.js";

export function buildFooter(d) {
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
            d.discount?.value && ['Descuento:', { text: `-${money(getDiscount(d))}`, style: 'totalsValue' }],
            d.delivery?.status && ['Delivery:', { text: money(d.delivery.value), style: 'totalsValue' }],
            [{ text: 'Total:', style: 'totalsLabel' }, { text: money(d.totalPurchase.value), style: 'totalsValue' }]
          ].filter(Boolean)
        },
        layout: 'noBorders'
      }
    ]
  })
}
