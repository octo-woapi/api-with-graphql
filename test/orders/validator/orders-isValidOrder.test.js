const isValidOrder = require('../../../orders/validator/isValidOrder')

describe('isValidOrder(:orderData)', () => {
  describe('when orderData.id or orderData.productsList is undefined', () => {
    it('returns false', () => {
      const orderData = undefined
      expect(isValidOrder(orderData)).toBe(false)
    })
  })
  describe('when orderData.productsList is not an array', () => {
    it('returns false', () => {
      const orderData = {
        id: 1,
        productsList: ['falsy productsList']
      }
      expect(isValidOrder(orderData)).toBe(false)
    })
  })
  describe('when orderData.status is different of pending, cancel or paid', () => {
    it('returns false', () => {
      const orderData = {id: 1, productsList: [], status: 'fake'}
      expect(isValidOrder(orderData)).toBe(false)
    })
  })
  describe('when everything is fine', () => {
    it('returns true', () => {
      const orderData = {id: 1, productsList: [{id: 1, name: 'orange', quantity: 100}]}
      expect(isValidOrder(orderData)).toBe(true)
    })
  })
})
