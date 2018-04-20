const deleteProductModule = require('../../../orders/usecase/deleteProduct')

describe('deleteProduct(:orderId, :productId)', () => {
  describe('when orderId is not specified', () => {
    it('returns orders unchanged', async () => {
      const orders = [{id: 0, productsList: []}]
      const fileHandlers = {orders: {read: jest.fn(() => orders), write: jest.fn()}}
      const {deleteProduct} = deleteProductModule(fileHandlers.orders)
      const result = await deleteProduct(null, 1)
      expect(result).toEqual(orders)
    })
  })
  describe('when orderId does not exist', () => {
    it('returns orders unchanged', async () => {
      const orders = [{id: 0, productsList: []}]
      const fileHandlers = {orders: {read: jest.fn(() => orders), write: jest.fn()}}
      const {deleteProduct} = deleteProductModule(fileHandlers.orders)
      const result = await deleteProduct(5, 1)
      expect(result).toEqual(orders)
    })
  })
  describe('when productId is not specified', () => {
    it('returns orders unchanged', async () => {
      const orders = [{id: 0, productsList: []}]
      const fileHandlers = {orders: {read: jest.fn(() => orders), write: jest.fn()}}
      const {deleteProduct} = deleteProductModule(fileHandlers.orders)
      const result = await deleteProduct(0, null)
      expect(result).toEqual(orders)
    })
  })
  describe('when productId does not exist', () => {
    it('returns orders unchanged', async () => {
      const orders = [{id: 0, productsList: []}]
      const fileHandlers = {orders: {read: jest.fn(() => orders), write: jest.fn()}}
      const {deleteProduct} = deleteProductModule(fileHandlers.orders)
      const result = await deleteProduct(0, 5)
      expect(result).toEqual(orders)
    })
  })
  describe('when everything is fine', () => {
    it('returns orders without the specified product', async () => {
      const orders = [{id: 0, productsList: [{product: {id:1}, quantity:1000}]}]
      const fileHandlers = {orders: {read: jest.fn(() => orders), write: jest.fn()}}
      const {deleteProduct} = deleteProductModule(fileHandlers.orders)
      const result = await deleteProduct(0, 1)
      expect(result).toEqual([{id: 0, productsList: []}])
    })
  })
})

