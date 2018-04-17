const addModule = require('../../../products/usecase/add')
const type = require('../../../server/types/graphqlObjectType')

describe('.add(:fileHandler, :alreadyExist, :Product)', () => {
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
      const {add} = addModule(fileHandlers.products, alreadyExist, type)
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
      const {add} = addModule(fileHandlers.products, alreadyExist, type)
      const result = await add(name)
      expect(result.name).toEqual(name)
    })
  })
})
