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

const app = express();
http.Server(app);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


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

/**
 * endpoint /plants
 * @params soort, botanische_naam, minimale_temperatuur, maximale_temperatuur, zonlicht
 * @returns req.body or error
 */
app.post('/plants', async (req, res) => {
  let checkIfExists = Helpers.checkIfExists(req.body)
  let checkInputStrings = Helpers.checkInputStrings(req.body)
  let checkTemperature = Helpers.checkTemperature(req.body.minimale_temperatuur, req.body.maximale_temperatuur)

  if (checkIfExists === null && checkInputStrings === null && checkTemperature === null) {
    const uuid = Helpers.generateUUID();
    const result = await pg
      .insert({
        uuid,
        soort: req.body.soort,
        botanische_naam: req.body.botanische_naam,
        minimale_temperatuur: req.body.minimale_temperatuur,
        maximale_temperatuur: req.body.maximale_temperatuur,
        zonlicht: req.body.zonlicht
      })
      .table('plant')
      .returning('*')
      .then((res) => {
        return res
      })

    res.json({
      res: result
    })
    res.status(200).send();
  } else if (checkIfExists !== null) {
    res.status(418)
    res.json({
        error: checkIfExists
      })
      .send()
  } else if (checkInputStrings !== null) {
    res.status(418)
    res.json({
        error: checkInputStrings
      })
      .send()
  } else if (checkTemperature !== null) {
    res.status(418)
    res.json({
        error: checkTemperature
      })
      .send()
  } else {
    res.status(400).send()
  }
})


/**
 * /plants endpoint
 * @param none
 * @returns list all plants
 */
app.get('/plants', async (req, res) => {
  const result = await pg
    .select('*')
    .from('plant') //tabelnaam
  res.json({
    res: result
  })
  res.status(200).send()
})


/**
 * GET plant by uuid
 * @params uuid
 * @returns 1 plant with uuid = req.params.uuid
 */
app.get('/plants/:uuid', async (req, res) => {
  const result = await pg
    .select('*')
    .from('plant')
    .where('uuid', req.params.uuid)
  res.json({
    res: result
  })
  res.status(200).send()
})


/** DELETE plant by uuid
 * @params req.params.uuid
 * @returns status 200 OK or status 400 Bad Request
 */
app.delete('/plants/:uuid', async (req, res) => {
  const result = await pg
    .del()
    .from('plant')
    .where('uuid', req.params.uuid)

  if (result !== 0) {
    res.status(200).send()
  } else {
    res.status(400).send()
  }
})

/**  update DB data
 * @params uuid & req.body  
 * @returns values of updated row
 */
app.put('/plants/:uuid', async (req, res, done) => {
  let request = req.body
  request.updated_at = new Date()

  const result = await pg
    .update(req.body)
    .from('plant')
    .where('uuid', req.params.uuid)
    .returning('*')
    .then((res) => {
      return res
    })
  done()
  res.json({
    res: result
  })
})

/**
 * GET meetresultaten by plant UUID
 * @param plantUuid
 * @returns meetresultaten of specified plant
 */
app.get('/meetresultaten/:plantUuid', async (req, res) => {
  try {
    const result = await pg
      .select('*')
      .from('meetresultaten ')
      .where('plantUuid', req.params.plantUuid)
    res.json({
      res: result
    })
  }catch(error){
    //throw new Error ('error', error)
    throw error
  }

})

app.post('/meetresultaten', async (req, res) => {
  const uuid = Helpers.generateUUID();
  const val = Helpers.checkMeetwaardeIsNotHigherThan1023(req.body.meetwaarde);
  if (val == true) {
    const result = await pg
      .insert({
        uuid,
        plantUuid: req.body.plantUuid,
        meetwaarde: req.body.meetwaarde
      })
      .table('meetresultaten')
      .returning('*')
      .then((res) => {
        return res
      })
    res.json({
      res: result
    })
  } else {
    res.json({
      error: 'body does not contain valid values'
    })
  }

})

async function initialiseTables() {
  await pg.schema.hasTable('plant').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('plant', (table) => {
          table.uuid('uuid').primary();
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
          table.uuid('uuid');
          table.uuid('plantUuid').references('uuid').inTable('plant'); //foreign key
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