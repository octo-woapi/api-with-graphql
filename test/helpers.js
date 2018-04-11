const fileHandler = require('../server/tools/fileHandler')
const server = require('../server/server')

const env = process.env.NODE_ENV || 'development'
const conf = require('../server/conf')[env]

const fileHandlers = {
  products: fileHandler(conf.data.products),
  orders: fileHandler(conf.data.orders),
  bills: fileHandler(conf.data.bills)
}
const getProductById = require('../products/usecase/getById')(fileHandlers.products).getById
const {updateTotals} = require('../orders/domain/updateTotals')(getProductById)
const {updateTotalsList} = require('../orders/domain/updateTotalsList')(updateTotals)
const {alreadyExist} = require('../server/validator/alreadyExist')(fileHandlers.products)
const {Product} = require('../products/productsResolver')(fileHandlers.products)

const addBill = require('../bills/usecase/add')(fileHandlers.bills).add
const deleteAllBills = require('../server/tools/deleteAll')(fileHandlers.bills).deleteAll
const addOrder = require('../orders/usecase/add')(fileHandlers.orders, updateTotalsList).add
const deleteAllOrders = require('../server/tools/deleteAll')(fileHandlers.orders).deleteAll
const addProduct = require('../products/usecase/add')(fileHandlers.products, alreadyExist, Product).add
const deleteAllProducts = require('../server/tools/deleteAll')(fileHandlers.products).deleteAll

const startApi = (PORT) => {
  beforeAll((done) => {
    server.listen(PORT, done)
  })

  afterAll(() => {
    server.close()
  })
}

module.exports = {
  startApi,
  deleteAllProducts,
  addProduct,
  deleteAllOrders,
  addOrder,
  deleteAllBills,
  addBill
}
