function applyDiscount (price) {
  const DISCOUNT_PRICE = 1000
  const DISCOUNT = 0.05
  if (price < DISCOUNT_PRICE) return price
  return price - price * DISCOUNT
}

module.exports = applyDiscount
