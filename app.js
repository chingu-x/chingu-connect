const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

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

// -- DATABASE -- //
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DB_URI,
  (error) => { if (error) throw new Error(error); },
);

// -- CONTROLLERS -- //

