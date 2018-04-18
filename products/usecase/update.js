function update(fileHandler) {
  return async (id, name, price, weight) => {
    if (!id) {
      throw new InvalidIdError('ID undefined')
    }
    const products = fileHandler.read()
    const productIndex = products.findIndex((product) => {
      return product.id === parseInt(id)
    })
    if (productIndex === -1) {
     throw new InvalidIdError('The product does not exist')
    }
    products[productIndex].name = name ? name : products[productIndex].name
    products[productIndex].price = price ? price : products[productIndex].price
    products[productIndex].weight = weight ? weight : products[productIndex].weight
    await fileHandler.write(products)
    return products
  }
}

class InvalidIdError extends Error {
}

module.exports = (fileHandler) => {
  return {
    update: update(fileHandler),
    InvalidIdError
  }
}