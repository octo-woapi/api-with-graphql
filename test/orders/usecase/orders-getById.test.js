const getByIdModule = require('../../../orders/usecase/getById')

describe(':getById(:id, :fileHandlers)', () => {
  describe('when everything is fine', () => {
    it('returns the order wanted', () => {
      // Given
      const id = 1
      const fileHandlers = {
        orders: {
          read: jest.fn(() => [{id: id}])
        }
      }
      const {getById} = getByIdModule(fileHandlers.orders)

      // When
      const order = getById(id)

      // Then
      expect(order).toEqual({id: 1})
    })
  })
  describe('when the order is not in the list', () => {
    it('throw OrderNotFoundError', () => {
      // Given
      const fileHandlers = {
        orders: {
          read: jest.fn(() => [])
        }
      }
      const {getById, OrderNotFoundError} = getByIdModule(fileHandlers.orders)
      const id = 1
      expect(() => {
        // When
        getById(id)
        // Then
      }).toThrow(OrderNotFoundError)
    })
  })
})