const request = require('request')

const {startApi, deleteAllOrders, deleteAllBills, addOrder, updateOrder} = require('../helpers')
const PORT = 4000

startApi(PORT)

beforeAll(async () => {
  await deleteAllOrders()
  await deleteAllBills()
  await addOrder(1, 100)
  await updateOrder(0, {status: 'paid'})
})

describe('Bills', () => {
  describe('Query', () => {
    it('returns 200', (done) => {
      request({url: `http://localhost:${PORT}/graphql`, method: 'POST',
        json: {"query": "{bills{id}}"}}, (err, res) => {
        if (err) console.error(err)
        expect(res.statusCode).toBe(200)
        done()
      })
    })
    it('returns bills list', (done) => {
      request({url: `http://localhost:${PORT}/graphql`, method: 'POST',
        json: {"query": "{bills{id orderId amount}}"}}, (err, res) => {
        if (err) console.error(err)
        expect(res.body.data.bills[0].orderId).toBe(0)
        done()
      })
    })
    describe('when first is called', () => {
      it('returns two first product of bills', (done) => {
        const first = 1
        request({url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{bills(first:${first}){id}}`}}, (err, res) => {
          if (err) console.error(err)
          expect(res.body.data.bills.length).toBe(first)
          done()
        })
      })
    })
    describe('when after is called', () => {
      it('returns bills list from the product whose name is after', (done) => {
        const after = 0
        request({url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{bills(after:${after}){id}}`}}, (err, res) => {
          if (err) console.error(err)
          expect(res.body.data.bills[0].id).toBe(after)
          done()
        })
      })
    })
    describe('when id is define', () => {
      it('returns the specific bill', (done) => {
        const id = 0
        request({url: `http://localhost:${PORT}/graphql`, method: 'POST',
          json: {"query": `{bill(id:${id}){id orderId}}`}}, (err, res) => {
          if (err) console.error(err)
          expect(res.body.data.bill.id).toBe(id)
          done()
        })
      })
    })
  })
})
