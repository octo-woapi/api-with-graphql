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
  describe('when id is undefined', () => {
    it('returns list', () => {
      const id = 1
      const oldList = [{id: id}]
      const fileHandlers = {orders: {read: jest.fn(() => oldList), write: jest.fn()}}
      const {deleteOrder} = deleteOrderModule(fileHandlers.orders)
      const newList = deleteOrder(null)
      expect(newList).toEqual(oldList)
    })
  })
  describe('when id is defined but not in the list', () => {
    it('returns list', () => {
      const id = 1
      const oldList = [{id: id}]
      const fileHandlers = {orders: {read: jest.fn(() => oldList), write: jest.fn()}}
      const {deleteOrder} = deleteOrderModule(fileHandlers.orders)
      const newList = deleteOrder(3)
      expect(newList).toEqual(oldList)
    })
  })
})
