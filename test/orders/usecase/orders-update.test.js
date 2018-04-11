const updateModule = require('../../../orders/usecase/update')

describe('update(:fileHandler, :orderId, :orderData)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.read', () => {
      const fileHandlers = {
        orders: {
          read: jest.fn(() => [{id: 1, value: orderData}]),
          write: jest.fn()
        }
      }
      const orderData = '{}'
      const orderId = 1
      const updateTotalsList = jest.fn((orders) => orders)
      const createBill = jest.fn()
      const {update} = updateModule(fileHandlers.orders, updateTotalsList, createBill)
      update(orderId, orderData)
      expect(fileHandlers.orders.read).toBeCalled()
    })
    it('calls fileHandlers.write', () => {
      const fileHandlers = {
        orders: {
          read: jest.fn(() => [{id: 1, value: orderData}]),
          write: jest.fn()
        }
      }
      const orderData = '{}'
      const orderId = 1
      const updateTotalsList = jest.fn((orders) => orders)
      const createBill = jest.fn()
      const {update} = updateModule(fileHandlers.orders, updateTotalsList, createBill)
      update(orderId, orderData)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders', () => {
      const orderId = 1
      const orderData = {id: orderId, productsList: []}
      const orders = [{id: 1, productsList: [{id: 1, name: 'banana'}], status: 'pending'}]
      const fileHandlers = {
        orders: {
          read: jest.fn(() => orders),
          write: jest.fn()
        }
      }
      const updateTotalsList = jest.fn((orders) => orders)
      const createBill = jest.fn()
      const {update} = updateModule(fileHandlers.orders, updateTotalsList, createBill)
      expect(orders).toEqual(update(orderId, orderData))
    })
  })
  describe('update correctly orders', () => {
    it('updates status when it is specified', () => {
      const orderId = 1
      const orderData = {productsList: [], status: 'paid'}
      const orders = [{id: 1, productsList: [{id: 1, name: 'banana'}], status: 'pending'}]
      const fileHandlers = {
        orders: {
          read: jest.fn(() => orders),
          write: jest.fn()
        }
      }
      const updateTotalsList = jest.fn((orders) => orders)
      const createBill = jest.fn()
      const {update} = updateModule(fileHandlers.orders, updateTotalsList, createBill)
      const updatedOrders = update(orderId, orderData)
      expect(updatedOrders[0].status).toEqual(orderData.status)
    })
    it('conserve previous status if not specified', () => {
      const orderId = 1
      const orderData = {productsList: []}
      const orders = [{id: 1, productsList: [{id: 1, name: 'banana'}], status: 'paid'}]
      const fileHandlers = {
        orders: {
          read: jest.fn(() => orders),
          write: jest.fn()
        }
      }
      const updateTotalsList = jest.fn((orders) => orders)
      const createBill = jest.fn()
      const {update} = updateModule(fileHandlers.orders, updateTotalsList, createBill)
      const updatedOrders = update(orderId, orderData)
      expect(orders[0].status).toEqual(updatedOrders[0].status)
    })
    it('overwrites productList when specified', () => {
      const orderId = 1
      const orderData = {productsList: []}
      const orders = [{id: 1, productsList: [{id: 1, name: 'banana'}], status: 'paid'}]
      const fileHandlers = {
        orders: {
          read: jest.fn(() => orders),
          write: jest.fn()
        }
      }
      const updateTotalsList = jest.fn((orders) => orders)
      const createBill = jest.fn()
      const {update} = updateModule(fileHandlers.orders, updateTotalsList, createBill)
      const updatedOrders = update(orderId, orderData)
      expect(updatedOrders[0].productsList).toEqual(orderData.productsList)
    })
  })
})
