function add (fileHandler, updateTotalsList) {
  return (orderId, orderData) => {
    const orders = fileHandler.read()
    orders.push({id: orderId, productsList: orderData.productsList, status: 'pending'})
    fileHandler.write(updateTotalsList(orders))
    return updateTotalsList(orders)
  }
}

module.exports = (fileHandler, updateTotalsList) => {
  return {
    add: add(fileHandler, updateTotalsList)
  }
}
