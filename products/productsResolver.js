function productResolver (fileHandler, Product, getById) {
    return (id) => {
        const product = getById(id)
        return new Product(id, product.name, product.weight, product.price)
    }
}

function productsResolver (fileHandler, Product, pagination) {
    return (first, after) => {
        const products = []
        fileHandler.read().forEach((product) => {
            products.push(new Product(product.id, product.name, product.weight, product.price))
        })
        return pagination(products, first, after)
    }
}

module.exports = (fileHandler, Product, pagination, getById) => {
    return {
        productResolver: productResolver(fileHandler, Product, getById),
        productsResolver: productsResolver(fileHandler, Product, pagination),
    }
}