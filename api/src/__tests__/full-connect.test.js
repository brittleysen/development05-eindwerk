const supertest = require('supertest');
const app = require('../server.js');
const request = supertest(app);

describe('DB connection test', () => {
    test('full connection test', async () => {
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
            .then((response) => {
                const parsed =  JSON.parse(response.text)
                return parsed.res[0].uuid// return only the uuid
            }).catch((error) => {
                console.log(error)
            })
            const getRequest =  await request.get(`/plants/${uuid}`).expect(200)
            const getRequestParse = JSON.parse(getRequest.text)
            expect(getRequestParse.res).toHaveLength(1)
        }catch(error){
            throw error
        }
    })
})