function deleteProduct (fileHandler, {Product}) {
  return (id) => {
    const products = fileHandler.read()
    const objectList = products.map((product) => (new Product(product.id, product.name, product.weight, product.price)))
    if (!id) return objectList
    const productIndex = products.findIndex((product) => {
      return product.id === parseInt(id)
    })
    if (productIndex === -1) return objectList
    objectList.splice(productIndex, 1)
    fileHandler.write(products)
    return objectList
  }
}

module.exports = (fileHandler, type) => {
  return {
    deleteProduct: deleteProduct(fileHandler, type)
  }
}