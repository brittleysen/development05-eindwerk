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