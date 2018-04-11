const path = require('path')

module.exports = {
  test: {
    data: {
      products: path.resolve(__dirname, `../products/data/test.json`),
      orders: path.resolve(__dirname, `../orders/data/test.json`)
    }
  },
  development: {
    data: {
      products: path.resolve(__dirname, `../products/data/development.json`),
      orders: path.resolve(__dirname, `../orders/data/development.json`)
    }
  }
}
