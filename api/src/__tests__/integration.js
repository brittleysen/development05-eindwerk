const supertest = require('supertest')
const http = require('http')

const app = require('../server.js')
const request = supertest(app)

/**
 * Check if DB is online
 * @param path /plants
 * @returns response 200 OK
 */
describe('test /GET plants endpoint', () => {
    test('check for response 200, OK', async () => {
        try{
            await request.get('/plants').expect(200) 
        }
        catch(error){
            console.log(error)
        }
    })
})

/**
 * Check if uuid is valid
 * @params /testtest
 * @returns response 400 Bad Request
 */
describe('test /DELETE plants endpoint', () => {
    test('Check for response 400 when unexisting uuid', async () =>{
        try{
           await request.del('/plants/00000000-0000-0000-0000-000000000000').expect(400)
        }catch(error){
            console.log(error)
        }
    })
    test('check for response 200 with existing uuid', async () => {
        try{
            let uuid = await request.post('/plants')
            .send({
                "soort": "calathea",
                "botanische_naam": "calathea lancifolia",
                "minimale_temperatuur": 18,
                "maximale_temperatuur": 24,
                "zonlicht": "gefilterd licht"
            })
            .expect(200)
            .returning('*') //all data from the new row
            .then((res) => {
                return res.body[0].uuid // return only the uuid
            }).catch((error) => {
                console.log(error)
            })
            
            const deletedPlant = await request.del(`/plants/'${uuid}'`) //delete the new row
            expect(deletedPlant).status(200);
            expect(deletedPlant.lenght).toBe(0);
        }catch{

        }
    })
})


/**
 * 
 * @params
 * @returns
 */
describe('test /PUT plants endpoint', () => {
    test('check if plant row is updated', async () => {
        try{
            let plantValues = await request.post('/plants')
            .send({
                "soort": "calathea",
                "botanische_naam": "calathea lancifolia",
                "minimale_temperatuur": 18,
                "maximale_temperatuur": 24,
                "zonlicht": "gefilterd licht"
            })
            .expect(200)
            .returning('*') //all data from the new row
            .then((res) => {
                return res.body[0] // return only the body
            }).catch((error) => {
                console.log(error)
            })

            const updatedPlant = await request
                .put(`/plants/'${plantValues.uuid}'`)
                .send({
                    "soort": "Pilea peperomioides",
                    "maximale_temperatuur": 23
                })
                .expect(200)
                .returning('*')
                .then((res) =>{
                    return res.body
                }).catch((error) => {
                    console.log(error)
                })

            expect(plantValues.soort).not.toBe(updatedPlant.soort)
            expect(plantValues.maximale_temperatuur).not.toBe(updatedPlant.maximale_temperatuur)
            expect(updatedPlant.soort).toBe('Pilea peperomioides')
            expect(updatedPlant.maximale_temperatuur).toBe(23)
            expect(plantValues.botanische_naam).toBe('calathea lancifolia')
            expect(plantValues.minimale_temperatuur).toBe(18)
            expect(plantValues.zonlicht).toBe('gefilterd licht')
        }catch (error){
            console.log(error)
        }
    })
})

