const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
require('dotenv').config();

const schema = require('./graphql/schema/schema');

const app = express();
const port = process.env.PORT || 8008;
app.listen(
  port,
  (error) => { if (error) throw new Error(error); },
);

// -- MIDDLEWARE -- //
app.use(bp.json());
app.use(
  cors({
    origin: ['https://chingu.io'],
    methods: ['GET', 'POST'],
    exposedHeaders: ['Access-Control-Allow-Origin'],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// -- GRAPHQL -- //
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: process.env.GRAPHIQL === 'true', // dev tool to make requests against server (only intended for dev environment)
}));

// -- DATABASE -- //
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DB_URI,
  (error) => { if (error) throw new Error(error); },
);

// -- CONTROLLERS -- //

