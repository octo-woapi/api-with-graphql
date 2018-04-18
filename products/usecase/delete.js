function deleteProduct (fileHandler) {
  return (id) => {
    const products = fileHandler.read()
    if (!id) return products
    const productIndex = products.findIndex((product) => {
      return product.id === parseInt(id)
    })
    if (productIndex === -1) return products
    products.splice(productIndex, 1)
    fileHandler.write(products)
    return products
  }
}

module.exports = (fileHandler) => {
  return {
    deleteProduct: deleteProduct(fileHandler)
  }
}