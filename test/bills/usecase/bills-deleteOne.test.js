const deleteOne = require('../../../bills/usecase/deleteBill')

describe('deleteOne(:fileHandler, :id)', () => {
  describe('when id is defined', () => {
    it('returns the list without the selected bill', () => {
      const fileHandlers = {
        bills: {
          read: jest.fn(() => [{id: 0}, {id: 1}, {id: 2}]),
          write: jest.fn()
        }}
      const {deleteBill} = deleteOne(fileHandlers.bills)
      const after = deleteBill('1')
      expect(after).toEqual([{id: 0}, {id: 2}])
    })
  })
  describe('when id is not defined', () => {
    it('returns BillNotFoundError', () => {
      const before = [{id: 0}, {id: 1}, {id: 2}]
      const fileHandlers = {
        bills: {
          read: jest.fn(() => before),
          write: jest.fn()
        }}
      const BillNotFoundError = require('../../../bills/errors')
      const {deleteBill} = deleteOne(fileHandlers.bills, BillNotFoundError)
      expect(() => {
        deleteBill('10')
      }).toThrow(BillNotFoundError)
    })
  })
})
