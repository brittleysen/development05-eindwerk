const express = require('express');
const bodyParser = require ('body-parser');
const http = require('http');

const Helpers = require('./utils/helpers.js')

const port = 3001;

const pg = require ('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING:'postgres://example:example@localhost:5432/brittleysen'
});

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

/**
 * GET plant 
 * @params 
 * @returns
 */
app.get('/plant', (req, res) => {
    res.status(200).send();
    console.log('hallo plant')
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