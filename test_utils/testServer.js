require('dotenv').config();
const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const testDB = require('./testDB');
const schema = require('../graphql/schema');
const middleware = require('../config/appMiddleware');
const authController = require('../controllers/authController');

const testServer = {
  server: null,
  app: express(),
  port: process.env.PORT || 12345,
  startup(report = false) {
    if (this.server) return;

    this.server = this.app.listen(
      this.port,
      (error) => {
        if (error) console.error(error);
        if (report) console.log(`test server listening on port ${this.port}`);
      },
    );

    testDB.connect();

    this.app.use(middleware);
    this.app.use('/auth', authController);
    this.app.use('/graphql', graphqlExpress({ schema }));
    this.app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  },
  shutdown(report = false) {
    if (!this.server) return;

    if (report) console.log('waiting for connections to close');
    this.server.close((error) => {
      if (error) console.error(error);
      if (report) console.log('test server successfully shut down');
      process.exit(0);
    });
  },
};

module.exports = testServer;
