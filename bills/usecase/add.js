function add (fileHandler, getOrderById) {
  return async (orderId) => {
    const createdAt = new Date()
    const bills = await fileHandler.read()
    const id = bills.length
    bills.push({id: id, createdAt: createdAt, orderId: orderId, amount: getOrderById(orderId).totalAmount})
    await fileHandler.write(bills)
  }
}

module.exports = (fileHandler) => {
  return {
    add: add(fileHandler)
  }
}
