function isProductListValid (productsList) {
  return productsList.every((product) => {
    if (product.name && product.quantity) {
      if (product.id) return typeof product.id === 'number'
    }
    return false
  })
}

function isValidOrder (newOrder) {
  const AUTHORIZED_STATUS = ['pending', 'cancel', 'paid']
  if (newOrder && newOrder.productsList && isProductListValid(newOrder.productsList)) {
    if (newOrder.status) {
      if (AUTHORIZED_STATUS.indexOf(newOrder.status.toLowerCase()) > -1) return true
      return false
    }
    return true
  }
  return false
}

module.exports = isValidOrder
