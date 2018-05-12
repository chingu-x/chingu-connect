require('dotenv').config();
const { resolve } = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8008;
const publicPath = resolve(__dirname, '..', 'client/dist');

app.use(express.static(publicPath));
app.listen(
  port,
  (error) => { if (error) throw new Error(error); },
);

// -- MIDDLEWARE -- //
const middleware = require('./config/appMiddleware');

app.use(middleware);

// -- GITHUB OAUTH -- //
const authController = require('./controllers/authController');

app.use('/auth', authController);

// -- DATABASE -- //
const mongoose = require('mongoose');
const DB_URI = require('./config/database/database')(process.env); // returns URI based on NODE_ENV

mongoose.Promise = global.Promise;
mongoose.connect(
  DB_URI,
  (error) => { if (error) throw new Error(error); },
);

// -- GRAPHQL -- //
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');

app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
