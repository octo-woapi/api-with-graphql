const updateTotalsModule = require('../../../orders/domain/updateTotals')

describe('updateTotals(:order, :getProductById)', () => {
  describe('When productsList is empty', () => {
    it('returns order', () => {
      const order = {productsList: []}
      const getProductById = jest.fn()
      const {updateTotals} = updateTotalsModule(getProductById)
      expect(updateTotals(order)).toBe(order)
    })
  })
  describe('When productsList is not empty', () => {
    it('calculates total weight', () => {
      const quantity = 1000
      const productWeight = 0.2
      const order = {productsList: [{product: {id: 1, name: 'banana'}, quantity: quantity}, {product: {id: 0, name: 'orange'}, quantity: quantity}]}
      const getProductById = jest.fn(() => {
        return {id: 0, name: 'banana', price: 2, weight: productWeight}
      })
      const {updateTotals} = updateTotalsModule(getProductById)
      const updatedWeight = updateTotals(order, getProductById).weight
      expect(updatedWeight).toEqual(quantity * productWeight * 2)
    })
    it('calculates total price', () => {
      const quantity = 1000
      const productPrice = 0.2
      const order = {productsList: [{product: {id: 1, name: 'banana'}, quantity: quantity}]}
      const getProductById = jest.fn(() => {
        return {id: 0, name: 'banana', price: productPrice, weight: 2}
      })
      const {updateTotals} = updateTotalsModule(getProductById)
      const updatedWeight = updateTotals(order, getProductById).price
      expect(updatedWeight).toEqual(quantity * productPrice)
    })
  })
})
