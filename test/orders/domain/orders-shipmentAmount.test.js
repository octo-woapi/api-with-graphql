const shipmentAmount = require('../../../orders/domain/shipmentAmount')

describe('shipmentAmount(:weight', () => {
  describe('When everything is fine', () => {
    it('returns the shipment amount', () => {
      const STEP_PRICE = 25
      const RANDOM_WEIGHT = 727
      const shipmentPrice = shipmentAmount(RANDOM_WEIGHT)
      expect(shipmentPrice).toBe(STEP_PRICE * 73)
    })
  })
})
