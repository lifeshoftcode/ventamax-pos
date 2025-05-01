import { format as formatDateFns } from 'date-fns'

export function money(n) {
  return Number(n).toFixed(2)
}

export function formatDate(ts) {
  const date = ts?.seconds ? new Date(ts.seconds * 1000) : new Date(ts)
  return formatDateFns(date, 'dd/MM/yyyy')
}

export function getDiscount(d) {
  const sub = d.products.reduce((sum, p) => sum + p.pricing.price * p.amountToBuy, 0)
  return sub * (d.discount.value / 100)
}
