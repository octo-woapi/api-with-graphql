class Order {
    constructor(id, productsList, shipmentAmount, totalAmount, weight) {
        this.id = id
        this.productsList = productsList
        this.shipmentAmount = shipmentAmount
        this.totalAmount = totalAmount
        this.weight = weight
    }
}

function orderResolver (fileHandler, getById, Product) {
    return (id) => {
        const order = getById(id)
        const productsList = order.productsList.map((product) => {return new Product(product.id, product.name, product.weight,
            product.price, product.quantity)})
        console.log(productsList)
        return new Order(id, productsList, order.shipmentAmount, order.totalAmount,
            order.weight)
    }
}

function ordersResolver (fileHandler, pagination, Product) {
    return (first, after) => {
        const orders = fileHandler.read().map((order) => {
            const productsList = order.productsList.map((product) => {new Product(product.id,
                product.name, product.weight, product.price, product.quantity)})
            return new Order(order.id, productsList, order.shipmentAmount,
                order.totalAmount, order.weight)})
        return pagination(orders, first, after)
    }
}

module.exports = (fileHandler, pagination, getById, Product) => {
    return {
        orderResolver: orderResolver(fileHandler,getById, Product),
        ordersResolver: ordersResolver(fileHandler, pagination, Product),
        Order
    }
}