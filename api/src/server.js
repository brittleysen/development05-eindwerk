const express = require('express');
const bodyParser = require ('body-parser');
const http = require('http');

const port = 5000;

const pg = require ('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connenction: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING:'postgres://example:example@store:5432/brittleysen'
});
//postgres://example:example@localhost:5432/test
const app = express();
http.Server(app);

app.use(bodyParser.json());
app.use( 
    bodyParser.urlencoded({
        extended: true
    })
);

//
app.get('/test', (req, res) => {
    res.status(200).send();
})
app.get('/', async (req, res) => {
  const result = await pg
    .select(['uuid', 'title', 'created_at'])
    .from('story') //tabelnaam
  res.json({
      res: result
  })
}) 

app.get('/plants', (req, res) => {
  res.sendStatus(200)
})

let initialiseTables = async () => {
    await pg.schema.createTable('analogeData', (table) => {
        table.string('testTab');
    })
  }

  initialiseTables()

module.exports = app;