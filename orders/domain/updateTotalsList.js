function updateTotalsList (updateTotals) {
  return (orders) => {
    if (orders.length < 1) {
      return orders
    }
    for (let orderKey in orders) {
      orders[orderKey] = updateTotals(orders[orderKey])
    }
    return orders
  }
}

module.exports = (updateTotals) => {
  return {
    updateTotalsList: updateTotalsList(updateTotals)
  }
}
