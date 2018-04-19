function updateTotals (getProductById) {
  return (order) => {
    order.weight = 0
    order.price = 0
    order.productsList.map(product => Object.assign(product.product, getProductById(product.product.id)))
    order.weight = computeWeight(order.productsList)
    order.price = computePrice(order.productsList)
    order.shipmentAmount = calculateShippingAmount(order.weight)
    order.totalAmount = applyDiscount(order.price + order.shipmentAmount)
    return order
  }
}

function computeWeight (productsInfo) {
  const result = productsInfo.reduce(
    (a, b) => a + b.product.weight * b.quantity,
    0
  )
  return result
}

function computePrice (productsInfo) {
  return productsInfo.reduce(
    (a, b) => a + b.product.price * b.quantity,
    0
  )
}

function calculateShippingAmount (weight) {
  const WEIGHT_STEP = 10
  const STEP_PRICE = 25
  return (Math.floor(weight / WEIGHT_STEP) + 1) * STEP_PRICE
}

function applyDiscount (price) {
  const DISCOUNT_PRICE = 1000
  const DISCOUNT = 0.05
  if (price < DISCOUNT_PRICE) return price
  return price - price * DISCOUNT
}

module.exports = (getProductById) => {
  return {
    updateTotals: updateTotals(getProductById)
  }
}
