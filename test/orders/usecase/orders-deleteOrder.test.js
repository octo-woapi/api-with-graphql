const deleteOrderModule = require('../../../orders/usecase/deleteOrder')

describe('deleteOrder(:fileHandler, :id)', () => {
  describe('When everything is fine', () => {
    it('deletes the order', () => {
      const id = 1
      const oldList = [{id: id}]
      const fileHandlers = {orders: {read: jest.fn(() => oldList), write: jest.fn()}}
      const {deleteOrder} = deleteOrderModule(fileHandlers.orders)
      const newList = deleteOrder(id)
      expect(newList).toEqual(oldList.splice(0, 1))
    })
  })
})
