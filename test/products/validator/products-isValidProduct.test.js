const {isValidProduct, InvalidNameError} = require('../../../products/validator/isValidProduct')

describe('.isNameDefined(:inputs)', () => {
  describe('When inputs.name is undefined', () => {
    test('throws an exception', () => {
      // Given
      const data = {}

      // When
      expect(() => {
        isValidProduct(data)
      }).toThrow(InvalidNameError)
    })
  })
  describe('when inputs.name is defined', () => {
    it('returns true', () => {
      const data = {name: 'kiwi'}
      expect(isValidProduct(data)).toBe(true)
    })
  })
})
