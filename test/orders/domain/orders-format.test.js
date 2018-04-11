const format = require('../../../orders/domain/format')

describe('format(:newOrderData)', () => {
  describe('when nothing is defined', () => {
    it('returns the default format', () => {
      const defaultFormat = {
        shipmentAmount: 0,
        totalAmount: 0,
        weight: 0}
      expect(format({})).toEqual(defaultFormat)
    })
  })
  describe('when status is defined', () => {
    it('returns the order with the defined status and then the default format', () => {
      const orderDataExpected = {status: 'paid',
        shipmentAmount: 0,
        totalAmount: 0,
        weight: 0}
      expect(format({status: 'paid'})).toEqual(orderDataExpected)
    })
  })
})
