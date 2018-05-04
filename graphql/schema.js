const { join } = require('path');
const { importSchema } = require('graphql-import'); // imports .graphql files
const { makeExecutableSchema } = require('graphql-tools'); // combines type defs and resolvers

// Type - custom, query, and mutation resolvers
const { User, Query: userQueries } = require('./user/resolvers');
const { Connection, Query: connectionQueries } = require('./connection/resolvers');

const typeDefs = importSchema(join(__dirname, 'schema.graphql'));

const resolvers = {
  User,
  Connection,
  Query: {
    ...userQueries,
    ...connectionQueries,
  },
  // Mutation: {},
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

