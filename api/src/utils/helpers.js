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
    },

    checkTemperature: (minimale_temperatuur, maximale_temperatuur) => {
        if(minimale_temperatuur === null || maximale_temperatuur === null){
            return 'De minimale en/of maximale temperatuur mogen niet null zijn.'
        }
        if(typeof minimale_temperatuur !== 'number'){
            return 'De waarde van minimale temperatuur is geen nummer'
        }
        if(typeof maximale_temperatuur !== 'number'){
            return 'De waarde van maximale temperatuur is geen nummer'
        }
        if(minimale_temperatuur < -50 || minimale_temperatuur > 50){
            return 'De ingegeven temperatuur is te hoog (groter dan 50) of te laag (kleiner dan 50)'
        }
        if(maximale_temperatuur < 0 || maximale_temperatuur > 100){
            return 'De ingegeven temperatuur is te hoog (groter dan 100) of te laag (kleiner dan 0)'
        }
        return null
    }, 

    checkMeetwaardeIsNotHigherThan1023:(meetwaarde) => {
        
        if(meetwaarde === null){
            console.log(`meetwaarde is not valid: '${meetwaarde}'`);
            return false
        }
        if(typeof meetwaarde !== 'number'){
            console.log(`meetwaarde is not a valid type: '${meetwaarde}'`);
            return false
        } else if (meetwaarde < 0 || meetwaarde > 1023){
            console.log(`meetwaarde is not valid: '${meetwaarde}'`);
            return false
        } else {
            return true
        }
    }
}

module.exports = Helpers