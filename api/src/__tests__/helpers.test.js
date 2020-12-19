const Helpers = require('../utils/helpers.js')

describe('helpers test UUID', () => {
    test('check if function generates something', () => {
        expect(Helpers.generateUUID()).not.toBeUndefined();
    })
    test('check if generated is UUID', () => {
        expect(Helpers.generateUUID()).toMatch(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/);
    })
})
