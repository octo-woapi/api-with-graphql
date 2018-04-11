function updateTotals (getProductById) {
  return (order) => {
    if (order.productsList.length < 1) {
      return order
    }
    order.weight = 0
    order.price = 0
    let productsInfo = order.productsList.map(product => Object.assign(product, getProductById(product.id)))
    order.weight = (productsInfo.length < 2) ? productsInfo[0].weight * productsInfo[0].quantity : productsInfo.reduce((a, b) => ({weight: a.weight * a.quantity + b.weight * b.quantity}))
    order.price = (productsInfo.length < 2) ? productsInfo[0].price * productsInfo[0].quantity : productsInfo.reduce((a, b) => ({price: a.price * a.quantity + b.price * b.quantity}))
    order.shipmentAmount = calculateShippingAmount(order.weight)
    order.totalAmount = applyDiscount(order.price + order.shipmentAmount)
    return order
  }
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
