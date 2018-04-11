function getById (fileHandler) {
  return (id) => {
    const orders = fileHandler.read()
    if (!orders.find((order) => order.id === id)) {
      throw new OrderNotFoundError(`Order with ID:${id} does not exist`)
    }
    return orders.find((order) => order.id === id)
  }
}

class OrderNotFoundError extends Error {
}

module.exports = (fileHandler) => {
  return {
    getById: getById(fileHandler),
    OrderNotFoundError
  }
}
