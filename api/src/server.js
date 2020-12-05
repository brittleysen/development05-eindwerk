const express = require('express');
const bodyParser = require ('body-parser');
const http = require('http');

const port = 5000;

const pg = require ('knex')({
    client: 'pg',
    version: '9.6',
    searchPath: ['knex', 'puclic'],
    connenction: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING:'postgres://example:example@localhost:5432/test'
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



module.exports = app;