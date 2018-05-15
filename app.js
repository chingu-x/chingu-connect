require('dotenv').config();
const { resolve } = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 8008;
const publicPath = resolve(__dirname, '..', 'client/dist');

app.use(express.static(publicPath));

// -- MIDDLEWARE -- //
const middleware = require('./config/appMiddleware');

app.use(middleware);

// -- GITHUB OAUTH -- //
const authController = require('./controllers/authController');

app.use('/auth', authController);

// -- DATABASE -- //
const mongoose = require('mongoose');
const models = require('./db');
const DB_URI = require('./config/database/database')(process.env); // returns URI based on NODE_ENV

mongoose.Promise = global.Promise;
mongoose.connect(
  DB_URI,
  (error) => { if (error) throw new Error(error); },
);

// -- GRAPHQL -- //
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');

app.use(
  '/graphql',
  graphqlExpress(({ user }) => ({ // middleware functions have params 'req', 'res', and 'next'
    schema,
    context: {
      authUser: user, // destructured from the 'req' parameter: req.user --> { user } --> remember (1 dot = 1 { } )
      models, // database models so they dont need to be imported on each resolver file
    },
  })),
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


// Temporary route for development
// Fetch user information from frontend
app.get('/user', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send('An error occurred while trying to fetch user.');
  }
});

app.listen(
  port,
  (error) => { if (error) throw new Error(error); },
);
