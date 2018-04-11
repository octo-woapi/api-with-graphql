const fileHandlers = {orders: {read: jest.fn(() => []),
  write: jest.fn()}}
const updateTotalsList = jest.fn((orders) => orders)

const {add} = require('../../../orders/usecase/add')(fileHandlers.orders, updateTotalsList)

describe(':add(orderId, orderData, orders)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.write', () => {
      const orderId = 1
      add(orderId, '{}')
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders added', () => {
      const orderId = 1
      const orderData = {id: 1, productsList: []}
      const orders = [{id: orderId, productsList: orderData.productsList, status: 'pending'}]
      expect(add(orderId, orderData)).toEqual(orders)
    })
  })
})
