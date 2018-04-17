const deleteProductModule = require('../../../products/usecase/delete')

describe('deleteProduct(:id)', () => {
  describe('when id is undefined', () => {
    it('return list without deleting', () => {
      const product = {id: 1, name: "banana"}
      const fileHandlers = {
        products: {read: jest.fn(() => [product]), write: jest.fn()}
      }
      const {deleteProduct} = deleteProductModule(fileHandlers.products)
      const result = deleteProduct(null)
      expect(result).toEqual([product])
    })
  })
  describe('when id is defined but not in the list', () => {
    it('return list without deleting', () => {
      const product = {id: 1, name: "banana"}
      const fileHandlers = {
        products: {read: jest.fn(() => [product]), write: jest.fn()}
      }
      const {deleteProduct} = deleteProductModule(fileHandlers.products)
      const result = deleteProduct(3)
      expect(result).toEqual([product])
    })
  })
  describe('when id is defined and in the list', () => {
    it('return list without product', () => {
      const product = {id: 1, name: "banana"}
      const fileHandlers = {
        products: {read: jest.fn(() => [product]), write: jest.fn()}
      }
      const {deleteProduct} = deleteProductModule(fileHandlers.products)
      const result = deleteProduct(1)
      expect(result).toEqual([])
    })
  })
})