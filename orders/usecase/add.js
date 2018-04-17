function add(fileHandler, {Order, OrderedProduct, Product}, alreadyExist, updateTotalsList) {
  return async (productId, quantity) => {
    let orders = fileHandler.read()
    let id = 0
    while (alreadyExist(orders, id)) {
      id++
    }
    orders.push({id: id, productsList: [{id: productId, quantity: quantity}], status: 'pending'})
    orders = updateTotalsList(orders)
    const objectList = orders.map((order) => {
      const productsList = order.productsList.map((product) => {
        return new OrderedProduct(new Product(product.id,
          product.name, product.weight, product.price), product.quantity)
      })
      return new Order(order.id, productsList, order.shipmentAmount,
        order.totalAmount, order.weight)
    })
    await fileHandler.write(orders)
    return objectList
  }
}

module.exports = (fileHandler, {Order, OrderedProduct, Product}, alreadyExist, updateTotalsList) => {
  return {
    add: add(fileHandler, {Order, OrderedProduct, Product}, alreadyExist, updateTotalsList)
  }
}
