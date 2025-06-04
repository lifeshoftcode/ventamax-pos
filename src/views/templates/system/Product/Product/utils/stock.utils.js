// stock.utils.js
export const LOW_STOCK_THRESHOLD = 20;

export const isStockRestricted = (p) => p?.restrictSaleWithoutStock;
export const isStockExceeded = (inCart, p) => {
    if (!inCart || !p) return false;
    const total = p?.amountToBuy ?? 0;
    return total >= (p?.stock ?? 0);
};

export const isStockZero = (p) => p?.stock <= 0;
export const isStockLow = (p) => {
    if (!p) return false;
    const remaining = (p.stock ?? 0) - (p.amountToBuy ?? 0);
    return remaining < LOW_STOCK_THRESHOLD && remaining > 0;
};
