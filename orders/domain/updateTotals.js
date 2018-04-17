function updateTotals (getProductById) {
  return (order) => {
    order.weight = 0
    order.price = 0
    const productsInfo = order.productsList.map(product => Object.assign(product, getProductById(product.id)))
    order.weight = computeWeight(productsInfo)
    order.price = computePrice(productsInfo)
    order.shipmentAmount = calculateShippingAmount(order.weight)
    order.totalAmount = applyDiscount(order.price + order.shipmentAmount)
    return order
  }
}

function computeWeight (productsInfo) {
  return productsInfo.reduce(
    (a, b) => a.weight * a.quantity + b.weight * b.quantity,
    {weight: 0, quantity: 0}
  )
}

function computePrice (productsInfo) {
  return productsInfo.reduce(
    (a, b) => a.price * a.quantity + b.price * b.quantity,
    {price: 0, quantity: 0}
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
