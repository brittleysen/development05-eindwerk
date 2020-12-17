const express = require('express');
const bodyParser = require ('body-parser');
const http = require('http');

const port = 5000;

const pg = require ('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING:'postgres://example:example@store:5432/brittleysen'
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
  

  async function initialiseTables() {
    await pg.schema.hasTable('storyblock').then(async (exists) => {
      if (!exists) {
        await pg.schema
          .createTable('storyblock', (table) => {
            table.increments();
            table.string('content');
            table.string('story_id');
            table.integer('order');
            table.timestamps(true, true);
          })
          .then(async () => {
            console.log('created table storyblock');
          });
  
      }
    });
    await pg.schema.hasTable('story').then(async (exists) => {
      if (!exists) {
        await pg.schema
          .createTable('story', (table) => {
            table.increments();
            table.string('title');
            table.string('summary');
            table.timestamps(true, true);
          })
          .then(async () => {
            console.log('created table story');
            for (let i = 0; i < 10; i++) {
              await pg.table('story').insert({title: `random element number ${i}` })
            }
          });
          
      }
    });
  }
  initialiseTables()

module.exports = app;