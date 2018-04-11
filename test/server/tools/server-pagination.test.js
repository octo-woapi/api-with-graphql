const pagination = require('../../../server/tools/pagination')

describe('pagination(:list, :first, :after)', () => {
    describe('when first is define', () => {
        it('returns the n first elements', () => {
            const first = 2
            const list = [1, 2, 3, 4]
            expect(pagination(list, first).length).toBe(first)
        })
    })
    describe('when after is define', () => {
        it('returns all the elements after the specific element whose name is after', () => {
            const after = 2
            const list = [{id: 1}, {id: 2}, {id: 3}]
            expect(pagination(list, null, after)[0].id).toBe(after)
        })
    })
})