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
      it('adds a product', (done) => {
        const newProduct = {name: "kiwi", price: 2}
        const data = { "query": `mutation { createProduct(name: "${newProduct.name}", 
                          price: ${newProduct.price}) {id name}}`}
        request({
          url: `http://localhost:${PORT}/graphql`,
          method: "POST",
          json: true,
          headers: {
            "content-type": "application/json",
          },
          body: data
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.createProduct.name).toEqual(newProduct.name)
          done()
        })
      })
    })
    describe('updateProduct', () => {
      describe('when products does not exist', () => {
        it('do something', (done) => {
          const newProduct = {name: "banana", price: 2}
          const data = { "query": `mutation { updateProduct(id: 5, name: "${newProduct.name}", 
                          price: ${newProduct.price}) {id name}}`}
          request({
            url: `http://localhost:${PORT}/graphql`,
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/json",
            },
            body: data
          }, (err, res) => {
            if (err) console.log(err)
            console.log(res.body)
            expect(res.body.errors[0].message).toEqual('The product does not exist')
            done()
          })
        })
      })
      describe('when everything fine', () => {
        it('update the product with specified infos', (done) => {
          const newProduct = {id: 0, name: "pineapple", price: 2}
          const data = { "query": `mutation { updateProduct(id: 0, name: "${newProduct.name}", 
                          price: ${newProduct.price}) {id name price}}`}
          request({
            url: `http://localhost:${PORT}/graphql`,
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/json",
            },
            body: data
          }, (err, res) => {
            if (err) console.log(err)
            console.log(res.body)
            expect(res.body.data.updateProduct).toEqual(newProduct)
            done()
          })
        })
      })
    })
    describe('deleteProduct', () => {
      describe('when product exists', () => {
        it('returns list without it', (done) => {
          const data = { "query": `mutation { deleteProduct(id: 0){id name}}`}
          request({
            url: `http://localhost:${PORT}/graphql`,
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/json",
            },
            body: data
          }, (err, res) => {
            if (err) console.log(err)
            console.log(res.body)
            expect(res.body.data.deleteProduct[0].id).toEqual(1)
            done()
          })
        })
      })
      describe('when product does not exist', () => {
        it('returns list unchanged', (done) => {
          const data = { "query": `mutation { deleteProduct(id: 5){id name}}`}
          request({
            url: `http://localhost:${PORT}/graphql`,
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/json",
            },
            body: data
          }, (err, res) => {
            if (err) console.log(err)
            expect(res.body.data.deleteProduct[0].id).toEqual(0)
            done()
          })
        })
      })
    })
  })
})
