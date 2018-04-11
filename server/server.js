const {importSchema} = require('graphql-import')
const {makeExecutableSchema} = require('graphql-tools')
const fileHandler = require('./tools/fileHandler')
const pagination = require('./tools/pagination')

const env = process.env.NODE_ENV || 'development'
const conf = require('./conf')[env]

const fileHandlers = {
  orders: fileHandler(conf.data.orders),
  products: fileHandler(conf.data.products)
}

const getProductsById = require('../products/usecase/getById')(fileHandlers.products).getById
const getOrdersById = require('../orders/usecase/getById')(fileHandlers.orders).getById
const {productResolver, productsResolver, Product} = require('../products/' +
  'productsResolver')(fileHandlers.products, pagination, getProductsById)
const {orderResolver, ordersResolver} = require('../orders/' +
  'ordersResolver')(fileHandlers.orders, pagination, getOrdersById, Product)
const {alreadyExist} = require('../server/validator/alreadyExist')(fileHandlers.products)
const addProduct = require('../products/usecase/add')(fileHandlers.products, alreadyExist, Product).add
const updateProduct = require('../products/usecase/update')(fileHandlers.products).update

const resolvers = {
  Query: {
    hello: () => 'Welcome to api-poc-graphQL ',
    product: (_, {id}) => productResolver(id),
    products: (_, {first, after}) => productsResolver(first, after),
    order: (_, {id}) => orderResolver(id),
    orders: (_, {first, after}) => ordersResolver(first, after)
  },
  Mutation: {
    createProduct: async (_, {name, price, weight}) => {
      console.log('here')
      const product = await addProduct(name, price, weight)
      console.log(product)
      return product
    },
    updateProduct: (_, {id, name, price, weight}) => {
      return updateProduct(id, name, price, weight)
    }
  }
}

const typeDefs = importSchema('/Users/romaincalamier/api-poc-graphql/schema.graphql')

const schema = makeExecutableSchema({typeDefs, resolvers})

var express = require('express')
var graphqlHTTP = require('express-graphql')

var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}))

module.exports = app