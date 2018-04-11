module.exports = (fileHandler, BillNotFoundError) => {
  return {
    deleteBill: deleteBill(fileHandler, BillNotFoundError)
  }
}

function deleteBill (fileHandler, BillNotFoundError) {
  return (id) => {
    let bills = fileHandler.read()
    const index = bills.findIndex((bill) => {
      return bill.id === parseInt(id)
    })
    if (index === -1) {
      throw new BillNotFoundError(`Bill with id ${id} does not exist`)
    }
    bills.splice(index, 1)
    fileHandler.write(bills)
    return bills
  }
}
