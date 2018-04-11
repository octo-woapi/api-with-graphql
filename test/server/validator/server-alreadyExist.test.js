const alreadyExistModule = require('../../../server/validator/alreadyExist')

describe(':alreadyExist(:fileHandler, :id)', () => {
  describe('When an order with id already exist', () => {
    it('returns true', () => {
      const id = 1
      const orders = [{id: 1, productsList: []}]
      const fileHandlers = {orders: {read: jest.fn(() => orders)}}
      const {alreadyExist} = alreadyExistModule(fileHandlers.orders)
      expect(alreadyExist(id)).toBe(true)
    })
  })
  describe('When an order with id doesn\'t exist', () => {
    it('returns false', () => {
      const id = 2
      const orders = [{id: 1}]
      const fileHandlers = {orders: {read: jest.fn(() => orders)}}
      const {alreadyExist} = alreadyExistModule(fileHandlers.orders)
      expect(alreadyExist(id)).toBe(false)
    })
  })
})