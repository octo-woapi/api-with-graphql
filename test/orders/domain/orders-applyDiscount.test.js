const applyDiscount = require('../../../orders/domain/applyDiscount')

describe('applyDiscount(:price)', () => {
  it('returns the price if under DISCOUNT_PRICE', () => {
    expect(applyDiscount(0)).toBe(0)
  })
  it('returns the price less the discount if above DISCOUNT_PRICE', () => {
    expect(applyDiscount(10000)).toBe(9500)
  })
})
