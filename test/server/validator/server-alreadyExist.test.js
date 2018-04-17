const alreadyExist = require('../../../server/validator/alreadyExist')

describe(':alreadyExist(:fileHandler, :id)', () => {
  describe('When an order with id already exist', () => {
    it('returns true', () => {
      const id = 1
      const orders = [{id: id, productsList: []}]
      expect(alreadyExist(orders, id)).toBe(true)
    })
  })
  describe('When an order with id doesn\'t exist', () => {
    it('returns false', () => {
      const id = 2
      const orders = [{id: 1}]
      expect(alreadyExist(orders, id)).toBe(false)
    })
  })
})