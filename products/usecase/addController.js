class InvalidProductFormatError extends Error {
}

function addController (id, data, getList, isValidProduct, format, add) {
  if (!isValidProduct(data)) {
    throw new InvalidProductFormatError('Name must be defined')
  }
  data = format(data)
  return add(id, data)
}

module.exports = {
  addController,
  InvalidProductFormatError
}
