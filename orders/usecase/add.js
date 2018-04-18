function add(fileHandler, alreadyExist, updateTotalsList) {
  return async (productId, quantity) => {
    let orders = fileHandler.read()
    let id = 0
    while (alreadyExist(orders, id)) {
      id++
    }
    orders.push({id: id, productsList: [{product: {id: productId}, quantity: quantity}], status: 'pending'})
    orders = updateTotalsList(orders)
    await fileHandler.write(orders)
    console.log(orders[0].productsList)
    return orders
  }
}

module.exports = (fileHandler, alreadyExist, updateTotalsList) => {
  return {
    add: add(fileHandler, alreadyExist, updateTotalsList)
  }
}
