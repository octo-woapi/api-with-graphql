class Product {
    constructor(id, name, weight, price, quantity) {
        this.id = id
        this.name = name
        this.weight = weight
        this.price = price
        this.quantity = quantity
    }
}

function productResolver (fileHandler, getById) {
    return (id) => {
        const product = getById(id)
        return new Product(id, product.name, product.weight, product.price)
    }
}

function productsResolver (fileHandler, pagination) {
    return (first, after) => {
        const products = []
        fileHandler.read().forEach((product) => {
            products.push(new Product(product.id, product.name, product.weight, product.price))
        })
        return pagination(products, first, after)
    }
}

module.exports = (fileHandler, pagination, getById) => {
    return {
        productResolver: productResolver(fileHandler,getById),
        productsResolver: productsResolver(fileHandler, pagination),
        Product
    }
}