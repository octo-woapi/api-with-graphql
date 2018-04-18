const addModule = require('../../../products/usecase/add')

describe('.add(:fileHandler, :alreadyExist)', () => {
  describe('When everything is fine', () => {
    it('calls write', () => {
      const name = 'pineapple'
      const fileHandlers = {
        products: {
          read: jest.fn(() => []),
          write: jest.fn()
        }
      }
      const alreadyExist = jest.fn()
      const {add} = addModule(fileHandlers.products, alreadyExist)
      add(name)
      expect(fileHandlers.products.write).toBeCalled()
    })
    it('returns new product', async () => {
      const name = 'pineapple'
      const fileHandlers = {
        products: {
          read: jest.fn(() => []),
          write: jest.fn()
        }
      }
      const alreadyExist = jest.fn()
      const {add} = addModule(fileHandlers.products, alreadyExist)
      const result = await add(name)
      expect(result[0].name).toEqual(name)
    })
  })
})
