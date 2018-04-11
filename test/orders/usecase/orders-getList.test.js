const getList = require('../../../orders/usecase/getList')

describe('usecase(:fileHandlers, :getById, :orderId)', () => {
  describe('when everything is fine', () => {
    it('calls fileHandlers.orders.read', () => {
      const fileHandlers = {orders: {read: jest.fn(() => { return [] })}}
      getList(fileHandlers.orders)
      expect(fileHandlers.orders.read).toBeCalled()
    })
    it('returns orders', () => {
      const fileHandlers = {orders: {read: jest.fn(() => { return [] })}}
      const returnOrders = getList(fileHandlers.orders).getList
      expect(returnOrders).toEqual([])
    })
  })
})
