const { Pool } = require('pg');
const supertest = require('supertest');
const app = require('../server.js');
const request = supertest(app);

describe('DB connection test', () => {
    let pgPool;
    test('connection test', async (done) =>{
        const client = await pgPool.connect();
        try{
            await client.query('BEGIN');
            const {rows} = await client.query('SELECT * FROM plant');
            expect(rows).toBeInstanceOf(Array);
        }catch(error){
            throw error;
        }finally{
            client.release(); //close connection
        }
    })
    test('full connection test', async() =>{
        const client = await pgPool.connect();
        try{
            let uuid = null;
            await request.post('/plants')
            .send({
                "soort": "calathea",
                "botanische_naam": "calathea lancifolia",
                "minimale_temperatuur": 18,
                "maximale_temperatuur": 24,
                "zonlicht": "gefilterd licht"
            })
            .expect(200)
            .then((res) => {
                uuid = res.body[0].uuid
                done()
            }).catch((error)=> {
                console.log(error)
            })

            await client.query('BEGIN');
            const { rows } = await client.query(`SELECT * FROM plant WHERE uuid='${uuid}'`);
            expect(rows).toBeInsanceOf(Array);
            expect(rows.length).toBe(1);

        }catch(error){
            throw error
        }finally{
            client.release(); //close connection
        }
    })
})