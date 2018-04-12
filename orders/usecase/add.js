function add (fileHandler, Order, alreadyExist, updateTotalsList) {
  return (productsList) => {
    return new Promise(async (resolve) => {
      let orders = fileHandler.read()
      let id = 0
      while (alreadyExist(orders, id)) { id ++ }
      orders.push({id: id, productsList: productsList, status: 'pending'})
      orders = updateTotalsList(orders)
      await fileHandler.write(orders)
      resolve(new Order(id, productsList, 'pending'))
    })
  }
}

module.exports = (fileHandler, Order, alreadyExist, updateTotalsList) => {
  return {
    add: add(fileHandler, Order, alreadyExist, updateTotalsList)
  }
}
