function getById (fileHandler, BillNotFoundError) {
  return (id) => {
    const bills = fileHandler.read()
    if (!bills.find((bill) => bill.id === id)) {
      throw new BillNotFoundError(`Bill with ID:${id} does not exist`)
    }
    return bills.find((bill) => bill.id === id)
  }
}

module.exports = (fileHandler, BillNotFoundError) => {
  return {
    getById: getById(fileHandler, BillNotFoundError)
  }
}
