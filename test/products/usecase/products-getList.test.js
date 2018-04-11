const get = require('../../../products/usecase/getList.js')

describe('.usecase(:fileHandler)', () => {
  describe('When everything is fine', () => {
    test('return products', () => {
      const products = ['something']
      const fileHandlers = {products: {read: jest.fn(() => products)}}
      expect(get(fileHandlers.products).products).toEqual(products)
    })
  })
})
