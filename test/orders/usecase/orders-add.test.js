const fileHandlers = {orders: {read: jest.fn(() => []),
  write: jest.fn()}}
const updateTotalsList = jest.fn((orders) => orders)
const alreadyExist = jest.fn(() => false)

const {add} = require('../../../orders/usecase/add')(fileHandlers.orders, alreadyExist, updateTotalsList)

describe(':add(orderId, orderData, orders)', () => {
  describe('When everything fine', () => {
    it('calls fileHandlers.write', () => {
      const productId = 1
      add(productId)
      expect(fileHandlers.orders.write).toBeCalled()
    })
    it('returns orders added', async () => {
      const productId = 1
      const result = await add(productId)
      await expect(result[0].productsList[0].product.id).toEqual(productId)
    })
  })
})
