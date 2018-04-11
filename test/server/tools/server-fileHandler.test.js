const fileHandler = require('../../../server/tools/fileHandler')

describe(':read(:pathData)', () => {
  describe('When everything fine', () => {
    it('returns JSON from data path', () => {
      const path = '/Users/romaincalamier/api-poc/products/test.json'
      const {read} = fileHandler(path)
      expect(read).toBeDefined()
    })
  })
  describe('When the file is not existing', () => {
    it('returns file not found error', () => {
      const path = '../fakedata.json'
      const {read, FileNotFoundError} = fileHandler(path)
      expect(() => {
        read()
      }).toThrow(FileNotFoundError)
    })
  })
})