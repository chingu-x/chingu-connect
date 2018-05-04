// Defines the Type: Query, Mutation, and reference Type resolvers

/**
 * Startup Errors:
 * Error: "Mutation/Query/*" defined in resolvers, but not in schema
 *   "*": defined in JS resolver file but not in Type schema
 *
 * Syntax Error: Expected Name, found }
 *   empty Type definition in Type schema
 *
 * Runtime Errors:
 * It is possible to write definitions in the Type schema and not have the resolvers to support it
 *   this can be exploited to establish the schema contract so dev teams can break off for work
 *
 * It is possible to write mismatched definitions between the Type schema and the resolver file
 *   the GraphiQL client will display what the Type schema defines
 */

const { User } = require('../../db');

module.exports = {
  // reference / custom Type resolvers for User Type
  User: {
    created: user => user.ownedConnections(),
    joined: user => user.joinedConnections(),
  },

  Query: {
    user: (root, id) => User.findById(id),
    users: () => User.find({}),
  },

  // Mutation: { },
};
