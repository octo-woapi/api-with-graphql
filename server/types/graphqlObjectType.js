class Product {
  constructor(id, name, weight, price) {
    this.id = id
    this.name = name
    this.weight = weight
    this.price = price
  }
}

class Order {
  constructor(id, productsList, status, shipmentAmount, totalAmount, weight) {
    this.id = id
    this.productsList = productsList
    this.status = status
    this.shipmentAmount = shipmentAmount
    this.totalAmount = totalAmount
    this.weight = weight
  }
}

class OrderedProduct {
  constructor(product, quantity) {
    this.product = product
    this.quantity = quantity
  }
}

class Bill {
  constructor(id, createdAt, orderId, amount) {
    this.id = id
    this.createdAt  = createdAt
    this.orderId = orderId
    this.amount = amount
  }
}

module.exports = {
  Product,
  Order,
  OrderedProduct,
  Bill
}