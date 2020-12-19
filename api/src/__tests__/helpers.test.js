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