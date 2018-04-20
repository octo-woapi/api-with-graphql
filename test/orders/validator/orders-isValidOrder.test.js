const {isValidOrder, InvalidOrderFormatError} = require('../../../orders/validator/isValidOrder')

describe('isValidOrder(:orderData)', () => {
  describe('when orderData.id or orderData.productsList is undefined', () => {
    it('throws invalidOrderFormatError', () => {
      const orderData = undefined
      expect(() => {
        isValidOrder(orderData)
      }).toThrow(new InvalidOrderFormatError('Order must be defined'))
    })
  })
  describe('when orderData.productsList.id is not defined', () => {
    it('throws invalidOrderFormatError', () => {
      const orderData = {
        id: 1,
        productsList: ['falsy productsList']
      }
      expect(() => {
        isValidOrder(orderData)
      }).toThrow(new InvalidOrderFormatError('Quantity of products in productList must be defined'))
    })
  })
  describe('when orderData.status is different of pending, cancel or paid', () => {
    it('throws invalidOrderFormatError', () => {
      const orderData = {id: 1, status: 'fake'}
      expect(() => {
        isValidOrder(orderData)
      }).toThrow(new InvalidOrderFormatError(`"${orderData.status}" is not an allowed state for status`))
    })
  })
  describe('when everything is fine', () => {
    it('throws invalidOrderFormatError', () => {
      const orderData = {id: 1, productsList: [{product: {id: 1, name: 'orange'}, quantity: 100}]}
      expect(isValidOrder(orderData)).toBe(true)
    })
  })
})
