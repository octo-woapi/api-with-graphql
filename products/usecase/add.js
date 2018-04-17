function add(fileHandler, alreadyExist, {Product}) {
  return async (name, price, weight) => {
    const productsList = fileHandler.read()
    let id = 0
    while (alreadyExist(productsList, id)) {
      id++
    }
    productsList.push({
      'id': id,
      'name': name,
      'price': price,
      'weight': weight
    })
    await fileHandler.write(productsList)
    return new Product(id, name, weight, price)
  }
}

module.exports = (fileHandler, alreadyExist, Product) => {
  return {
    add: add(fileHandler, alreadyExist, Product)
  }
}
