function billResolver (fileHandler, getById) {
  return (id) => {
    return getById(id)
  }
}

function billListResolver (fileHandler, pagination) {
  return (first, after) => {
    const bills = fileHandler.read()
    return pagination(bills, first, after)
  }
}

module.exports = (fileHandler, pagination, getById) => {
  return {
    billResolver: billResolver(fileHandler, getById),
    billListResolver: billListResolver(fileHandler, pagination)
  }
}