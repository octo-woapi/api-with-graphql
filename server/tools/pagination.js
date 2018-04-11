function pagination (list, first, after) {
    if (after) {
        const indexAfter = list.map(function(e) { return e.id }).indexOf(after)
        if (!first) return list.slice(indexAfter)
        return list.slice(indexAfter, indexAfter + first)
    }
    if (first) return list.slice(0, first)
    return list
}

module.exports = pagination
