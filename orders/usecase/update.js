function update (fileHandler, updateTotalsList, createBill) {
  return (orderId, orderData) => {
    let orders = fileHandler.read()
    const orderIndex = orders.findIndex((order) => {
      return order.id === parseInt(orderId)
    })
    const statusBefore = orders[orderIndex]
    Object.assign(orders[orderIndex], orderData)
    fileHandler.write(orders)
    orders = updateTotalsList(orders)
    if (statusBefore === 'pending' && orderData.status === 'paid') {
      createBill(orderId)
      console.log(2)
    }
    return orders
  }
}

module.exports = (fileHandler, updateTotalsList, createBill) => {
  return {
    update: update(fileHandler, updateTotalsList, createBill)
  }
}
