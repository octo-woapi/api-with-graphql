class InvalidProductFormat extends Error {}

function isValidProduct (inputs) {
  if (!inputs.name) {
    throw new InvalidProductFormat('Name of the product is undefined')
  }
  return true
}

module.exports = {
  isValidProduct,
  InvalidProductFormat
}
