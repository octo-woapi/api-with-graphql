function billResolver (fileHandler, Bill, getById) {
  return (id) => {
    const bill = getById(id)
    return new Bill(id, bill.createdAt, bill.orderId, bill.amount)
  }
}

function billListResolver (fileHandler, Bill, pagination) {
  return (first, after) => {
    const bills = []
    fileHandler.read().forEach((bill) => {
      bills.push(new Bill(bill.id, bill.createdAt, bill.orderId, bill.amount))
    })
    return pagination(bills, first, after)
  }
}

module.exports = (fileHandler, Bill, pagination, getById) => {
  return {
    billResolver: billResolver(fileHandler, Bill, getById),
    billListResolver: billListResolver(fileHandler, Bill, pagination)
  }
}