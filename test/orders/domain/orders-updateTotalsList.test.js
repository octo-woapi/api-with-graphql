const updateTotalsListModule = require('../../../orders/domain/updateTotalsList')

describe('updateTotalsList(:orders, :getProductById)', () => {
  describe('when orders is empty', () => {
    it('returns orders', () => {
      const orders = []
      const updateTotals = jest.fn()
      const {updateTotalsList} = updateTotalsListModule(updateTotals)
      expect(updateTotalsList(orders)).toBe(orders)
    })
  })
  describe('when orders is not empty', () => {
    it('calls updateTotals', () => {
      const orders = [{id: 1}]
      const updateTotals = jest.fn()
      const {updateTotalsList} = updateTotalsListModule(updateTotals)
      updateTotalsList(orders)
      expect(updateTotals).toBeCalled()
    })
  })
})
