function update(fileHandler, Product) {
  return (id, name, price, weight) => {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(new InvalidIdError('ID undefined'))
      }
      const products = fileHandler.read()
      const productIndex = products.findIndex((product) => {
        return product.id === parseInt(id)
      })
      if (productIndex === -1) {
        reject(new InvalidIdError('The product does not exist'))
      }
      console.log(name, price, weight)
      products[productIndex].name = name ? name : products[productIndex].name
      products[productIndex].price = price ? price : products[productIndex].price
      products[productIndex].weight = weight ? weight : products[productIndex].weight
      console.log(products[productIndex])
      console.log(products)
      await fileHandler.write(products)
      resolve(new Product(id, products[productIndex].name, products[productIndex].price, products[productIndex].weight))
    })
  }
}

class InvalidIdError extends Error {
}

module.exports = (fileHandler, Product) => {
  return {
    update: update(fileHandler, Product),
    InvalidIdError
  }
}