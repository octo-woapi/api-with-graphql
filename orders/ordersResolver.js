function orderResolver(fileHandler, getById) {
  return (id) => {
    return getById(id)
  }
}

function ordersResolver(fileHandler, pagination) {
  return (first, after) => {
    const orders = fileHandler.read()
    return pagination(orders, first, after)
  }
}

module.exports = (fileHandler, pagination, getById) => {
  return {
    orderResolver: orderResolver(fileHandler, getById),
    ordersResolver: ordersResolver(fileHandler, pagination)
  }
}