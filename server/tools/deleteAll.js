function deleteAll (fileHandler) {
  return () => {
    return new Promise((resolve) => {
      resolve(fileHandler.write([]))
    })
  }
}

module.exports = (fileHandler) => {
  return {
    deleteAll: deleteAll(fileHandler)
  }
}
