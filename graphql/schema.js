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
  Query: { // RootQuery
    ...userQueries,
    ...connectionQueries,
  },
  // Mutation: { // RootMutation
    // ...userMutations,
    // ...connectionMutations,
  // },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

/**
 * Pattern:
 * ------------------
 * Root Query and Mutation must exist in BOTh the schema.graphql AND schema.js
 * each Type must also use the Query and Mutation object for their own resolvers
 *   these are renamed in schema.js so they can be spread
 *   into the RootQuery and RootMutation that share the same name
 * TODO: look for a way to perform the same rename + spread in schema.graphql
 */

