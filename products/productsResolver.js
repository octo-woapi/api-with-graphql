function productResolver (fileHandler, getById) {
    return (id) => {
        return getById(id)
    }
}

function productsResolver (fileHandler, pagination) {
    return (first, after) => {
        const products = fileHandler.read()
        return pagination(products, first, after)
    }
}

module.exports = (fileHandler, pagination, getById) => {
    return {
        productResolver: productResolver(fileHandler, getById),
        productsResolver: productsResolver(fileHandler, pagination)
    }
}