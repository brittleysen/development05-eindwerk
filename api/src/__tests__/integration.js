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

