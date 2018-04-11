function alreadyExist(list, id) {
    return list.some((obj) => { return obj.id === id})
}

module.exports = alreadyExist
