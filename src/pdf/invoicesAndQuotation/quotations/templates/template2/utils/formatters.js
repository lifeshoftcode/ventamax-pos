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

export function getProductIndividualDiscount(product) {
  if (!product.discount || product.discount.value <= 0) return 0;
  
  const price = +product.pricing?.price || 0;
  const quantity = +product.amountToBuy || 1;
  const subtotalBeforeDiscount = price * quantity;
  
  if (product.discount.type === 'percentage') {
    return subtotalBeforeDiscount * (product.discount.value / 100);
  } else {
    // Para monto fijo
    return Math.min(product.discount.value, subtotalBeforeDiscount);
  }
}

export function getProductsIndividualDiscounts(products) {
  return products.reduce((total, product) => {
    return total + getProductIndividualDiscount(product);
  }, 0);
}

export function hasIndividualDiscounts(products) {
  return products.some(product => 
    product.discount && product.discount.value > 0
  );
}
