const {
    v1: uuidv1
} = require('uuid');

const Helpers = {
    generateUUID: () => {
        const uuid = uuidv1();
        return uuid;
    },

    checkIfExists: (body) => {
        if (!body.hasOwnProperty('soort')) {
            console.log('error')
            return 'No soort detected';
        } else if (!body.hasOwnProperty('botanische_naam')) {
            console.log('error')
            return 'No botanische naam detected';
        } else if (!body.hasOwnProperty('minimale_temperatuur')) {
            console.log('error')
            return 'No minimale temperatuur detected';
        } else if (!body.hasOwnProperty('maximale_temperatuur')) {
            console.log('error')
            return 'No maximale temperatuur detected';
        } else if (!body.hasOwnProperty('zonlicht')) {
            console.log('error')
            return 'No zonlicht detected';
        } else {
            return null
        }
    },

    checkInputStrings: (body) => {
        const botanische_naam = body.botanische_naam;
        const soort = body.soort;
        const zonlicht = body.zonlicht;

        if(soort == null || soort == "" || botanische_naam == null || botanische_naam == "" || zonlicht == "" || zonlicht == null){
            return 'niet alle velden zijn ingevuld'
        }
        if (typeof soort === 'number' || typeof botanische_naam === 'number' || zonlicht === 'number'){
            return '1 of meerdere velden hebben het foute type'
        }
        if(soort.length >= 50 || botanische_naam.length >= 50 || zonlicht.length >= 50){
            return 'Lengte mag niet langer zijn dan 50 karakters'
        }
        return null
    }
}

module.exports = Helpers