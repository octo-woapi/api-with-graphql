const request = require('request')
const {startApi, deleteAllProducts, addProduct} = require('../helpers')
const PORT = 4000

startApi(PORT)

const fileHandler = require('../../server/tools/fileHandler')
const conf = require('../../server/conf')['test']
const fileHandlers = {products: fileHandler(conf.data.products)}

beforeAll(async () => {
  await deleteAllProducts()
  await addProduct('banana', 2, 0.2)
  await addProduct('orange', 1.5, 0.3)
  await addProduct('vanilla', 10, 0.01)
})

describe('Products', () => {
  describe('Query', () => {
    it('returns 200', (done) => {
      request({
        url: `http://localhost:${PORT}/graphql`, method: 'POST',
        json: {"query": "{products{id}}"}
      }, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(200)
        done()
      })
    })
    it('returns products list', (done) => {
      request({
        url: `http://localhost:${PORT}/graphql`, method: 'POST',
        json: {"query": "{products{id name}}"}
      }, (err, res) => {
        if (err) console.log(err)
        expect(res.body.data.products.length).toBe(fileHandlers.products.read().length)
        done()
      })
    })
    describe('when first is called', () => {
      it('returns two first product of products', (done) => {
        const first = 2
        request({
          url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{products(first:${first}){id}}`}
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.products.length).toBe(first)
          done()
        })
      })
    })
    describe('when after is called', () => {
      it('returns products list from the product whose name is after', (done) => {
        const after = 1
        request({
          url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{products(after:${after}){id}}`}
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.products[0].id).toBe(after)
          done()
        })
      })
    })
    describe('when first and after is called', () => {
      it('returns the first n element after the chosen element', (done) => {
        const after = 1
        const first = 2
        request({
          url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{products(first:${first}, after:${after}){name}}`}
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.products).toEqual([{"name": "orange"}, {"name": "vanilla"}])
          done()
        })
      })
    })
  })
  describe('Mutation', () => {
    describe('createProduct', () => {
      it('adds a product', () => {
        const newProduct = {name: "kiwi", price: 2}
        request({
          url: `http://localhost:${PORT}/graphql`, method: 'POST',
          headers: {"Content-Type": "application/graphql"},
          form: `mutation {createProduct(name: "${newProduct.name}", price: 2){id}`
        }, (err, res) => {
          if (err) console.log(err)
          console.log(res.body)
          expect(res.body).toEqual(newProduct)
          done()
        })
      })
    })
  })
})
