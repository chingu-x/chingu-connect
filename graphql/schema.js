const { join } = require('path');
const { importSchema } = require('graphql-import'); // imports .graphql files
const { makeExecutableSchema } = require('graphql-tools'); // combines type defs and resolvers

// Type - custom, query, and mutation resolvers
const { User, Query: userQueries } = require('./user/resolvers');
const { Connection, Query: connectionQueries } = require('./connection/resolvers');

const typeDefs = importSchema(join(__dirname, 'schema.graphql'));

const resolvers = {
  User, // custom (non-scalar) User field resolvers [owned, joined]
  Connection, // custom (non-scalar) Connection field resolvers [owner, partner]
  Query: { // RootQuery
    ...userQueries,
    ...connectionQueries,
  },
  // Mutation: { // RootMutation
    // ...userMutations,
    // ...connectionMutations,
  // },
};

/**
 * typedefs server as a document / contract for what the API exposes
 *   does NOT have any code behind it. purely documentation of the API schema
 *   language AGNOSTIC because it is a GraphQL schema - not an implementation
 *
 * resolvers are the actual code
 *   fulfills the contract of types and actions exposed by the API
 *   the schema does not care WHERE the data comes from (implementation)
 *   just that it fulfills the contract
 *     resolver examples:
 *       ORM database methods
 *       API fetches
 *       RESTful endpoint fetching
 *         GraphQL can be a "hat" for a RESTful API allowing for gradual live refactoring
 *       hard-coded data
 *   language SPECIFIC. this is the implementation of the API
 *     in whatever chosen back-end language / framework / ORM / resource
 *
 * makeExecutableSchema is the way in which the contract and the data resolvers
 * supporting that contract is combined to become executable (usable)
 *   this "executable" API schema is then consumed by graphqlExpress in app.js
 *   and exposed on single /graphql endpoint
 */
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

