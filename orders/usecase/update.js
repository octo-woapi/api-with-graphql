function update(fileHandler, isValidOrder, updateTotalsList, createBill) {
  return async (orderId, orderData) => {
    isValidOrder(orderData)
    let orders = fileHandler.read()
    const orderIndex = orders.findIndex((order) => {
      return order.id === parseInt(orderId)
    })
    if (orderIndex === -1) throw new InvalidOrderError(`Order with the id: ${orderId} is undefined`)
    const statusBefore = orders[orderIndex].status
    orders[orderIndex].status = orderData.status
    orders[orderIndex].productsList = orders[orderIndex].productsList.concat(orderData.productsList)
    orders = updateTotalsList(orders)
    await fileHandler.write(orders)
    if (statusBefore === 'pending' && orderData.status === 'paid') {
      await createBill(orderId)
    }
    return orders
  }
}

class InvalidOrderError extends Error {}

module.exports = (fileHandler, isValidOrder, updateTotalsList, createBill) => {
  return {
    update: update(fileHandler, isValidOrder, updateTotalsList, createBill),
    InvalidOrderError
  }
}
