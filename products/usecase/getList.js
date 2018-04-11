function getList (fileHandler) {
  return fileHandler.read()
}

module.exports = (fileHandler) => {
  return {
    products: getList(fileHandler)
  }
}
