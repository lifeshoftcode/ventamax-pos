import { DateTime } from 'luxon';

export function money(n) {
  return Number(n).toFixed(2);
}

export function formatDate(ts) {
  const millis =
    ts instanceof Date ? ts.getTime()
      : ts?.seconds ? ts.seconds * 1000
        : Number(ts);

  return DateTime.fromMillis(millis).toFormat('dd/MM/yyyy');
}

export function getDiscount(d) {
  const subtotal = d.products.reduce(
    (sum, p) => sum + p.pricing.price * p.amountToBuy,
    0
  );
  return subtotal * (d.discount.value / 100);
}
