const request = require('request')
const {startApi, deleteAllOrders, deleteAllBills, addOrder} = require('../helpers')
const PORT = 4000

startApi(PORT)

beforeAll(async () => {
  await deleteAllOrders()
  await deleteAllBills()
  await addOrder(1, 100)
})

afterAll(() => {
  server.close()
})

const fileHandler = require('../../server/tools/fileHandler')
const conf = require('../../server/conf')['test']

const fileHandlers = {orders: fileHandler(conf.data.orders), bills: fileHandler((conf.data.bills))}

describe('Query', () => {
  describe('orders', () => {
    it('returns 200', (done) => {
      request({
        url: `http://localhost:${PORT}/graphql`, method: 'POST',
        json: {"query": "{orders{id}}"}
      }, (err, res) => {
        if (err) console.log(err)
        expect(res.statusCode).toBe(200)
        done()
      })
    })
    it('returns orders list', (done) => {
      request({
        url: `http://localhost:${PORT}/graphql`, method: 'POST',
        json: {"query": "{orders{id }}"}
      }, (err, res) => {
        if (err) console.log(err)
        expect(res.body.data.orders.length).toBe(fileHandlers.orders.read().length)
        done()
      })
    })
    describe('when first is called', () => {
      it('returns two first order of orders', (done) => {
        const first = 1
        request({
          url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{orders(first:${first}){id}}`}
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.orders.length).toBe(first)
          done()
        })
      })
    })
    describe('when after is called', () => {
      it('returns orders list from the order whose name is after', (done) => {
        const after = 0
        request({
          url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{orders(after:${after}){id}}`}
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.orders[0].id).toBe(after)
          done()
        })
      })
    })
    describe('when first and after is called', () => {
      it('returns the first n element after the chosen element', (done) => {
        const after = 0
        const first = 1
        request({
          url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{orders(first:${first}, after:${after}){id}}`}
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.orders).toEqual([{"id": 0}])
          done()
        })
      })
    })
  })
})
describe('Mutation', () => {
  describe('createOrder', () => {
    describe('when creating an order', () => {
      it('adds the order in the list', (done) => {
        const data = {"query": `mutation {createOrder(productId: 1, quantity: 100) {id productsList {
              product {id name}
              quantity}}}`}
        request({
          url: `http://localhost:${PORT}/graphql`,
          method: "POST",
          json: data
        }, (err, res) => {
          if (err) console.log(err)
          console.log(res.body.data.createOrder[0])
          expect(res.body.data.createOrder[0].productsList[0].product.id).toEqual(1)
          done()
        })
      })
    })
  })
  describe('updateStatus', () => {
    describe('when order does not exist', () => {
      it('throws an error', (done) => {
        const invalidId = 5
        const data = {"query": `mutation {updateStatus(orderId: ${invalidId}, status: "paid") {id}}`}
        request({
          url: `http://localhost:${PORT}/graphql`,
          method: "POST",
          json: data
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.errors[0].message).toEqual(`Order with the id: ${invalidId} is undefined`)
          done()
        })
      })
    })
    describe('when everything is fine', () => {
      it('returns orders updated', (done) => {
        const newStatus = 'paid'
        const data = {"query": `mutation {updateStatus(orderId: 0, status: "${newStatus}") {status}}`}
        request({
          url: `http://localhost:${PORT}/graphql`,
          method: "POST",
          json: data
        }, (err, res) => {
          if (err) console.log(err)
          expect(res.body.data.updateStatus[0].status).toEqual(newStatus)
          done()
        })
      })
      describe('when status is set from pending to paid', () => {
        it('creates a new bill', (done) => {
          const newStatus = 'paid'
          const data = {"query": `mutation {updateStatus(orderId: 0, status: "${newStatus}") {status}}`}
          request({
            url: `http://localhost:${PORT}/graphql`,
            method: "POST",
            json: data
          }, (err, res) => {
            if (err) console.log(err)
            console.log(fileHandlers.bills.read())
            expect(fileHandlers.bills.read().length).toEqual(1)
            done()
          })
        })
      })
    })
  })
})
