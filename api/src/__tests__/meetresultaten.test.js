const Helpers = require('../utils/helpers.js')

describe('Check valid input value meetresultaten', () => {
    test('Check value meetresultaten', () => {
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023(356)).toBe(true);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023(0)).toBe(true);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023(1023)).toBe(true);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023(1024)).toBe(false);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023(-1)).toBe(false);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023(null)).toBe(false);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023('meetwaarde')).toBe(false);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023('')).toBe(false);
        expect(Helpers.checkMeetwaardeIsNotHigherThan1023()).toBe(false);
    })
})