function alreadyExist (fileHandler) {
    return (id) => {
        const list = fileHandler.read()
        return list.some((obj) => obj.id === id)
    }
}

module.exports = (fileHandler) => {
    return {
        alreadyExist: alreadyExist(fileHandler)
    }
}
