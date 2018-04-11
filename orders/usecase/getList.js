function getList (fileHandler) {
  return fileHandler.read()
}

module.exports = (fileHandler) => {
  return {
    getList: getList(fileHandler)
  }
}
