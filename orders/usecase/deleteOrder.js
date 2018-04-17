function deleteOrder (fileHandler) {
  return (id) => {
    const orders = fileHandler.read()
    if (!id) return orders
    const orderIndex = orders.findIndex((order) => {
      return order.id === parseInt(id)
    })
    if (orderIndex === -1) return orders
    orders.splice(orderIndex, 1)
    fileHandler.write(orders)
    return orders
  }
}

module.exports = (fileHandler) => {
  return {
    deleteOrder: deleteOrder(fileHandler)
  }
}
