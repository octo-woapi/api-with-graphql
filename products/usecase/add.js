function add(fileHandler, alreadyExist) {
  return async (name, price, weight) => {
    const products = fileHandler.read()
    let id = 0
    while (alreadyExist(products, id)) {
      id++
    }
    products.push({
      'id': id,
      'name': name,
      'price': price,
      'weight': weight
    })
    await fileHandler.write(products)
    return products
  }
}

module.exports = (fileHandler, alreadyExist) => {
  return {
    add: add(fileHandler, alreadyExist)
  }
}
