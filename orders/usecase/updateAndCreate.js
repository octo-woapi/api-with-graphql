function updateOrCreate (isValidOrder, alreadyExist, update, add, format) {
  return (orderId, orderData) => {
    if (!isValidOrder(orderData)) {
      throw new InvalidOrderFormatError('Missing id and/or productsList in the order')
    }
    orderData = format(orderData)
    if (alreadyExist(orderId)) {
      return update(orderId, orderData)
    }
    return add(orderId, orderData)
  }
}

class InvalidOrderFormatError extends Error {
}

module.exports = (isValidOrder, alreadyExist, update, add, format) => {
  return {
    updateOrCreate: updateOrCreate(isValidOrder,
      alreadyExist, update, add, format),
    InvalidOrderFormatError
  }
}
