const isValidId = require('../../../server/validator/isValidId')

describe('isValidId(:id)', () => {
  describe('When id is not valid return false', () => {
    it('returns false', () => {
      expect(isValidId(undefined)).toBe(false)
    })
  })
  describe('When id is a number return true', () => {
    it('returns false', () => {
      expect(isValidId(2)).toBe(true)
    })
  })
})
