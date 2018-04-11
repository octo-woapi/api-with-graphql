const format = require('../../../products/domain/format')

describe('format(:inputs', () => {
  describe('when nothing is defined', () => {
    it('fills price and weight to default values', () => {
      const product = {}
      const expectedProduct = {price: 0, weight: 0}
      const formattedProduct = format(product)
      expect(formattedProduct).toEqual(expectedProduct)
    })
  })
  describe('when price and weight are defined', () => {
    it('return inputs unchanged', () => {
      const product = {price: 100, weight: 5}
      const expectedProduct = {price: 100, weight: 5}
      const formattedProduct = format(product)
      expect(formattedProduct).toEqual(expectedProduct)
    })
  })
})
