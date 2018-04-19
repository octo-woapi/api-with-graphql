function deleteProduct(fileHandler) {
  return async (orderId, productId) => {
    const orders = fileHandler.read()
    if (orderId === null || orderId === undefined) return orders
    const orderIndex = orders.findIndex((order) => {
      return order.id === orderId
    })
    if (orderIndex === -1) return orders
    const productIndex = orders[orderIndex].productsList.findIndex((orderedProduct) => {
      return orderedProduct.product.id === parseInt(productId)
    })
    if (productIndex === -1) return orders
    orders[orderIndex].productsList.splice(productIndex, 1)
    await fileHandler.write(orders)
    return orders
  }
}

module.exports = (fileHandler) => {
  return {
    deleteProduct: deleteProduct(fileHandler)
  }
}