const sort = require('../../../products/domain/sort')
const get = require('../../../products/usecase/getList')

describe('sort(:property)', () => {
  describe('Products is fine, sorting by price products', () => {
    test('return products sorted by price', () => {
      const fileHandlers = {products: {read: jest.fn(() =>
        [
          {'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3},
          {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2},
          {'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01}]
      )}}
      const products = get(fileHandlers.products).products
      console.log(products)
      expect(products.sort(sort('price'))).toEqual([
        {'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3},
        {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2},
        {'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01}]
      )
    })
  })
  describe('Products is fine, sorting by weight products', () => {
    test('return products sorted by weight', () => {
      const fileHandlers = {products: {read: jest.fn(() =>
        [
          {'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3},
          {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2},
          {'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01}]
      )}}
      const products = get(fileHandlers.products).products
      expect(products.sort(sort('weight'))).toEqual([
        {'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01},
        {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2},
        {'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3}]
      )
    })
  })
  describe('Products is fine, sorting by name products', () => {
    test('return products sorted by weight', () => {
      const fileHandlers = {products: {read: jest.fn(() =>
        [
          {'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3},
          {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2},
          {'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01}]
      )}}
      const products = get(fileHandlers.products).products
      expect(products.sort(sort('name'))).toEqual([
        {'id': 0, 'name': 'banana', 'price': 2, 'weight': 0.2},
        {'id': 1, 'name': 'orange', 'price': 1.5, 'weight': 0.3},
        {'id': 2, 'name': 'vanilla', 'price': 10, 'weight': 0.01}]
      )
    })
  })
})
