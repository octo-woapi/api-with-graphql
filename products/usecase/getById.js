function getById (fileHandler) {
  return (id) => {
    const products = fileHandler.read()
    if (!products.find((product) => product.id === id)) {
      throw new ProductNotFoundError(`Product with ID:${id} does not exist`)
    }
    return products.find((product) => product.id === id)
  }
}

class ProductNotFoundError extends Error {
}

module.exports = (fileHandler) => {
  return {
    getById: getById(fileHandler),
    ProductNotFoundError
  }
}
