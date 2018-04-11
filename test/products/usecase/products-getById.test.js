const getByIdModule = require('../../../products/usecase/getById')

describe(':getById(:id, :fileHandlers)', () => {
  describe('when everything is fine', () => {
    it('returns the product wanted', () => {
      // Given
      const id = 1
      const fileHandlers = {products: {read: jest.fn(() => { return [{id: id}] })}}
      const {getById} = getByIdModule(fileHandlers.products)
      // When
      const product = getById(id)
      // Then
      expect(product).toEqual({id: 1})
    })
  })
  describe('when the id is not valid', () => {
    it('throw InvalidArgumentError', () => {
      // Given
      const fileHandlers = {
        products: {
          read: jest.fn(() => {
            return []
          })
        }
      }
      const {getById, ProductNotFoundError} = getByIdModule(fileHandlers.products)
      const id = 'fake'
      expect(() => {
        // When
        getById(id)
        // Then
      }).toThrow(ProductNotFoundError)
    })
  })
})
