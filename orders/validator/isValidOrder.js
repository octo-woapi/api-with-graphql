function isProductListValid (productsList) {
  return productsList.every((product) => {
    if (!product.quantity) throw new InvalidOrderFormatError('Quantity of products in productList must be defined')
    if (!product.product.id && product.product.id !== 0) throw new InvalidOrderFormatError('ID of products in productList must be defined')
    return true
  })
}

function isStatusValid (status) {
  const AUTHORIZED_STATUS = ['pending', 'cancel', 'paid']
  if (!AUTHORIZED_STATUS.includes(status)) {
    throw new InvalidOrderFormatError(`"${status}" is not an allowed state for status`)
  }
  return true
}

function isValidOrder (orderData) {
  if (!orderData) throw new InvalidOrderFormatError('Order must be defined')
  if (orderData.productsList) isProductListValid(orderData.productsList)
  if (orderData.status) isStatusValid(orderData.status)
  return true
}

class InvalidOrderFormatError extends Error {}

module.exports = {
  isValidOrder,
  InvalidOrderFormatError
}
