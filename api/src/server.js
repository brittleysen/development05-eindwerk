const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const Helpers = require('./utils/helpers.js')

const port = 5000;

const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/brittleysen'
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
    .select(['uuid', 'botanische_naam', 'created_at'])
    .from('plant') //tabelnaam
  res.json({
    res: result
  })
})

app.post('/plants', async (req, res) => {
  let checkIfExists = Helpers.checkIfExists(req.body)
  let checkInputStrings = Helpers.checkInputStrings(req.body)
  let checkTemperature = Helpers.checkTemperature(req.body.minimale_temperatuur, req.body.maximale_temperatuur)

  if (checkIfExists === null && checkInputStrings === null && checkTemperature === null) {
    const uuid = Helpers.generateUUID();
    await pg.table('plant').insert({
      uuid,
      soort: req.body.soort,
      botanische_naam: req.body.botanische_naam,
      minimale_temperatuur: req.body.minimale_temperatuur,
      maximale_temperatuur: req.body.maximale_temperatuur,
      zonlicht: req.body.zonlicht
    })
    res.json({
      res: req.body
    })
    res.status(200).send();
  }
})

async function initialiseTables() {
  await pg.schema.hasTable('plant').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('plant', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('soort');
          table.string('botanische_naam');
          table.integer('minimale_temperatuur');
          table.integer('maximale_temperatuur');
          table.string('zonlicht');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table plant');
          for (let i = 0; i < 2; i++) {
            const uuid = Helpers.generateUUID();
            await pg.table('plant').insert({
              uuid,
              soort: `calathea`,
              botanische_naam: `calathea lancifolia`,
              minimale_temperatuur: 18,
              maximale_temperatuur: 24,
              zonlicht: `gefilterd licht`
            })
          }
        });
    }
  });
  await pg.schema.hasTable('meetresultaten').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('meetresultaten', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('datum');
          table.integer('meetwaarde');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table meetresultaten');
        });
    }
  });
}

initialiseTables()

module.exports = app;