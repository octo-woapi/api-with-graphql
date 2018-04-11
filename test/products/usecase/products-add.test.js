const addModule = require('../../../products/usecase/add')

describe('.add(:fileHandler, :id, :inputs)', () => {
  describe('When everything is fine', () => {
    it('calls write', () => {
      const id = 0
      const inputs = {}
      const fileHandlers = {
        products: {
          read: jest.fn(() => []),
          write: jest.fn()
        }
      }
      const {add} = addModule(fileHandlers.products)
      add(id, inputs)
      expect(fileHandlers.products.write).toBeCalled()
    })
  })
})
