const supertest = require('supertest')
const http = require('http')

const app = require('../index.js')
const request = supertest(app)

describe('test /GET plants endpoint', () => {
    test('check if all fields have content', async () => {
        const data = await request (app).get('/plants')
        try{
            expect(200)
            expect(data).notEquals('')

        }
        catch(error){
            console.log(error)
        }
    })
})