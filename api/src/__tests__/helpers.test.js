const Helpers = require('../utils/helpers.js')

describe('helpers test UUID', () => {
    test('check if function generates something', () => {
        expect(Helpers.generateUUID()).not.toBeUndefined();
    }),
    test('check if generated is UUID', () => {
        expect(Helpers.generateUUID()).toMatch(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/);
    })
})

describe('helpers test checkIfExists', () => {
    const body = {
        "soort" : "string",
        "botanische_naam" : "string",
        "minimale_temperatuur" : 0,
        "maximale_temperatuur" : 0,
        "zonlicht" : "string"
    }
    test('alle velden zijn ingevuld', () => {
        expect(Helpers.checkIfExists(body)).toBe(null);
    })
})

describe('helpers test checkInputStrings', () => {
    
    test('alle velden zijn correct ingevuld', () =>{
        const body = {
            "soort" : "string",
            "botanische_naam" : "string",
            "zonlicht" : "string"
        }
        expect(Helpers.checkInputStrings(body)).toBe(null);
    }),

    test('Wanneer een veld null is krijgen we de juiste error', () =>{
        const body = {
            "soort" : null,
            "botanische_naam" : "string",
            "zonlicht" : "string"
        }
        expect(Helpers.checkInputStrings(body)).toBe('niet alle velden zijn ingevuld')
    }),

    test('Wanneer niet alle velden het juiste type hebben gooien we de juiste error', () =>{
        const body = {
            "soort" : 123,
            "botanische_naam" : "string",
            "zonlicht" : "string"
        }
        expect(Helpers.checkInputStrings(body)).toBe('1 of meerdere velden hebben het foute type')
    }),

    test('1 of meerdere velden hebben meer of gelijk aan 50 karakters', () =>{
        const body = {
            "soort" : "00000000000000000000000000000000000000000000000000",
            "botanische_naam" : "string",
            "zonlicht" : "string"
        }
        expect(Helpers.checkInputStrings(body)).toBe('Lengte mag niet langer zijn dan 50 karakters')
    })
})

describe('helpers test checkTemperature', () => {
    test('De temperatuurwaarden mogen niet null zijn', () => {
        const errorMessage = 'De minimale en/of maximale temperatuur mogen niet null zijn.'
        expect(Helpers.checkTemperature(null, null)).toBe(errorMessage)
        expect(Helpers.checkTemperature(null, 101)).toBe(errorMessage)
        expect(Helpers.checkTemperature(23, null)).toBe(errorMessage)
        expect(Helpers.checkTemperature(23, 23)).toBe(null)
    })

    test('Waarde minimale en maximale temperatuur moet een nummer zijn', () =>{
        const errorMessageMin = 'De waarde van minimale temperatuur is geen nummer'
        const errorMessageMax = 'De waarde van maximale temperatuur is geen nummer'
        expect(Helpers.checkTemperature("test", "test")).toBe(errorMessageMin)
        expect(Helpers.checkTemperature("test", 0)).toBe(errorMessageMin)
        expect(Helpers.checkTemperature(0, "test")).toBe(errorMessageMax)
        expect(Helpers.checkTemperature(0, 0)).toBe(null)
    })
    test('Minimale temperatuur moet tussen -50 en 50 liggen.', () => {
        const errorMessage ='De ingegeven temperatuur is te hoog (groter dan 50) of te laag (kleiner dan 50)'
        expect(Helpers.checkTemperature(-1000, 50)).toBe(errorMessage)
        expect(Helpers.checkTemperature(1000, 50)).toBe(errorMessage)
        expect(Helpers.checkTemperature(-51, 50)).toBe(errorMessage)
        expect(Helpers.checkTemperature(51, 50)).toBe(errorMessage)
        expect(Helpers.checkTemperature(-50, 50)).toBe(null)
        expect(Helpers.checkTemperature(50, 50)).toBe(null)
        expect(Helpers.checkTemperature(0, 50)).toBe(null)
    })
    test('Maximale temperatuur moet tussen 0 en 100 liggen.', () => {
        const errorMessage ='De ingegeven temperatuur is te hoog (groter dan 100) of te laag (kleiner dan 0)'
        expect(Helpers.checkTemperature(0, -50)).toBe(errorMessage)
        expect(Helpers.checkTemperature(0, 150)).toBe(errorMessage)
        expect(Helpers.checkTemperature(0, -1)).toBe(errorMessage)
        expect(Helpers.checkTemperature(0, 101)).toBe(errorMessage)
        expect(Helpers.checkTemperature(0, 0)).toBe(null)
        expect(Helpers.checkTemperature(0, 100)).toBe(null)
        expect(Helpers.checkTemperature(0, 50)).toBe(null)
    })
})