function update(fileHandler, updateTotalsList, createBill) {
  return async (orderId, orderData) => {
    let orders = fileHandler.read()
    const orderIndex = orders.findIndex((order) => {
      return order.id === parseInt(orderId)
    })
    const statusBefore = orders[orderIndex].status
    Object.assign(orders[orderIndex], orderData)
    await fileHandler.write(orders)
    orders = updateTotalsList(orders)
    if (statusBefore === 'pending' && orderData.status === 'paid') {
      await createBill(orderId)
    }
    return orders
  }
}

module.exports = (fileHandler, updateTotalsList, createBill) => {
  return {
    update: update(fileHandler, updateTotalsList, createBill)
  }
}
