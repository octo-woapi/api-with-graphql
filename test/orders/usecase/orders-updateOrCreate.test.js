describe('updateOrCreate(:orderId, :orderData, :alreadyExist, :update, :add, ' +
  ':filHandlers, :format, :updateTotalsList)', () => {
  describe('when everything is fine', () => {
    it('calls format with orderData', () => {
      const orderId = 1
      const orderData = '{}'
      const isValidOrder = jest.fn(() => { return true })
      const alreadyExist = jest.fn()
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn()
      const updateTotalsList = jest.fn()
      const {updateOrCreate} = require('../../../orders/usecase/updateAndCreate')(isValidOrder,
        alreadyExist, update, add, format, updateTotalsList)
      updateOrCreate(orderId, orderData)
      expect(format).toBeCalledWith(orderData)
    })
  })
  describe('When id already exists', () => {
    it('calls alreadyExists with orderId and orders', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn()
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn()
      const updateTotalsList = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      const {updateOrCreate} = require('../../../orders/usecase/updateAndCreate')(isValidOrder,
        alreadyExist, update, add, format, updateTotalsList)
      updateOrCreate(orderId, orderData)
      expect(alreadyExist).toBeCalledWith(orderId)
    })
    it('calls update with orderId, orderData and fileHandlers', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn(() => orderData)
      const updateTotalsList = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      const {updateOrCreate} = require('../../../orders/usecase/updateAndCreate')(isValidOrder,
        alreadyExist, update, add, format, updateTotalsList)
      updateOrCreate(orderId, orderData)
      // Then
      expect(update).toBeCalledWith(orderId, orderData)
    })
    it('returns what update returns', () => {
      const orderId = 1
      const orderData = '{}'
      const orderDataUpdated = 'fake updated order'
      const alreadyExist = jest.fn(() => true)
      const update = jest.fn(() => [orderDataUpdated])
      const add = jest.fn()
      const format = jest.fn(() => orderData)
      const updateTotalsList = jest.fn(() => [orderDataUpdated])
      const isValidOrder = jest.fn(() => true)
      // When
      const {updateOrCreate} = require('../../../orders/usecase/updateAndCreate')(isValidOrder,
        alreadyExist, update, add, format, updateTotalsList)
      const orders = updateOrCreate(orderId, orderData)
      // Then
      expect(orders).toEqual([orderDataUpdated])
    })
  })
  describe('when id does not exist', () => {
    it('calls add with orderId, orderData and fileHandlers', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => false)
      const add = jest.fn()
      const update = jest.fn()
      const format = jest.fn(() => orderData)
      const updateTotalsList = jest.fn()
      const isValidOrder = jest.fn(() => true)
      // When
      const {updateOrCreate} = require('../../../orders/usecase/updateAndCreate')(isValidOrder,
        alreadyExist, update, add, format, updateTotalsList)
      updateOrCreate(orderId, orderData)
      // Then
      expect(add).toBeCalledWith(orderId, orderData)
    })
    it('returns what add returns', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => false)
      const update = jest.fn()
      const add = jest.fn(() => 'fake updated order')
      const format = jest.fn(() => orderData)
      const updateTotalsList = jest.fn(() => 'fake updated order')
      const isValidOrder = jest.fn(() => true)
      // When
      const {updateOrCreate} = require('../../../orders/usecase/updateAndCreate')(isValidOrder,
        alreadyExist, update, add, format, updateTotalsList)
      const order = updateOrCreate(orderId, orderData)
      // Then
      expect(order).toEqual('fake updated order')
    })
  })
  describe('when orderData is not valid', () => {
    it('throws InvalidOrderFormatError', () => {
      const orderId = 1
      const orderData = '{}'
      const alreadyExist = jest.fn(() => false)
      const update = jest.fn()
      const add = jest.fn()
      const format = jest.fn()
      const updateTotalsList = jest.fn()
      const isValidOrder = jest.fn(() => false)
      const {updateOrCreate, InvalidOrderFormatError} = require('../../../orders/usecase/updateAndCreate')(isValidOrder,
        alreadyExist, update, add, format, updateTotalsList)
      expect(() => {
        updateOrCreate(orderId, orderData)
      }).toThrow(InvalidOrderFormatError)
    })
  })
})
