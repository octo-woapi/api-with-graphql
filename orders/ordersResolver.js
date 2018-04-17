function orderResolver(fileHandler, {Order, OrderedProduct, Product}, getById) {
  return (id) => {
    const order = getById(id)
    const productsList = order.productsList.map((product) => {
      return new OrderedProduct (new Product(product.id, product.name, product.weight,
        product.price), product.quantity)
    })
    return new Order(id, productsList, order.shipmentAmount, order.totalAmount,
      order.weight)
  }
}

function ordersResolver(fileHandler, {Order, OrderedProduct, Product}, pagination) {
  return (first, after) => {
    const orders = fileHandler.read().map((order) => {
      const productsList = order.productsList.map((product) => {
        return new OrderedProduct(new Product(product.id,
          product.name, product.weight, product.price), product.quantity)
      })
      return new Order(order.id, productsList, order.shipmentAmount,
        order.totalAmount, order.weight)
    })
    return pagination(orders, first, after)
  }
}

module.exports = (fileHandler, type, pagination, getById) => {
  return {
    orderResolver: orderResolver(fileHandler, type, getById),
    ordersResolver: ordersResolver(fileHandler, type, pagination)
  }
}