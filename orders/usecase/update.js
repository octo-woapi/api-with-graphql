function update(fileHandler, updateTotalsList, createBill) {
  return async (orderId, orderData) => {
    let orders = fileHandler.read()
    const orderIndex = orders.findIndex((order) => {
      return order.id === parseInt(orderId)
    })
    const statusBefore = orders[orderIndex].status
    Object.assign(orders[orderIndex], orderData)
    orders = updateTotalsList(orders)
    await fileHandler.write(orders)
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
