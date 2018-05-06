require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 8008;
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

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DB_URI,
  (error) => { if (error) throw new Error(error); },
);

// -- GRAPHQL -- //
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');

app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
