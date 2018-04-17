const {importSchema} = require('graphql-import')
const {makeExecutableSchema} = require('graphql-tools')
const fileHandler = require('./tools/fileHandler')
const pagination = require('./tools/pagination')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const conf = require('./conf')[env]

const fileHandlers = {
  orders: fileHandler(conf.data.orders),
  products: fileHandler(conf.data.products),
  bills: fileHandler(conf.data.bills)
}

const {Product, Order, Bill, OrderedProduct} = require('./types/graphqlObjectType')

const getProductById = require('../products/usecase/getById')(fileHandlers.products).getById
const getOrderById = require('../orders/usecase/getById')(fileHandlers.orders).getById
const getBillById = require('../orders/usecase/getById')(fileHandlers.bills).getById

const {productResolver, productsResolver} = require('../products/' +
  'productsResolver')(fileHandlers.products, Product, pagination, getProductById)
const {orderResolver, ordersResolver} = require('../orders/' +
  'ordersResolver')(fileHandlers.orders, Order, OrderedProduct, pagination, getOrderById, Product)
const {billResolver, billListResolver} = require('../bills/billsResolver')(fileHandlers.bills, Bill, pagination,
  getBillById)
const alreadyExist = require('../server/validator/alreadyExist')
const addProduct = require('../products/usecase/add')(fileHandlers.products, alreadyExist, Product).add
const updateProduct = require('../products/usecase/update')(fileHandlers.products, Product).update
const {deleteProduct} = require('../products/usecase/delete')(fileHandlers.products, Product)
const {Date} = require('./types/customScalarType')

const resolvers = {
  Query: {
    hello: () => 'Welcome to api-poc-graphQL ',
    product: (_, {id}) => productResolver(id),
    products: (_, {first, after}) => productsResolver(first, after),
    order: (_, {id}) => orderResolver(id),
    orders: (_, {first, after}) => ordersResolver(first, after),
    bill: (_, {id}) => billResolver(id),
    bills: (_, {first, after}) => billListResolver(first, after)
  },
  Mutation: {
    createProduct: async (_, {name, price, weight}) => {
      const product = await addProduct(name, price, weight)
      return product
    },
    updateProduct: (_, {id, name, price, weight}) => {
      try {
        return updateProduct(id, name, price, weight)
      } catch (e) {
        return e
      }
    },
    deleteProduct: (_, {id}) => {
      return deleteProduct(id)
    }
  },
  Date: Date
}

const typeDefs = importSchema(path.resolve(__dirname, `../schema.graphql`))

const schema = makeExecutableSchema({typeDefs, resolvers})

const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express();

app.use('/graphql', graphqlHTTP((request) => ({
  schema: schema,
  graphiql: true
})))

module.exports = app