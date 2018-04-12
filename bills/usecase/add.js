function add (fileHandler, getOrderById) {
  return (orderId) => {
    return new Promise(async (resolve) => {
      const createdAt = new Date()
      const bills = await fileHandler.read()
      const id = bills.length
      bills.push({id: id, createdAt: createdAt, orderId: orderId, amount: getOrderById(orderId).totalAmount})
      await fileHandler.write(bills)
      resolve(bills)
    })
  }
}

module.exports = (fileHandler, getOrderById) => {
  return {
    add: add(fileHandler, getOrderById)
  }
}
