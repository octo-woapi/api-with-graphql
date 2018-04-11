function isValidId (id) {
  if (id) return typeof id === 'number'
  return false
}

module.exports = isValidId
