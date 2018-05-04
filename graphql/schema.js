const { join } = require('path');
const { importSchema } = require('graphql-import'); // imports .graphql files
const { makeExecutableSchema } = require('graphql-tools'); // combines type defs and resolvers

// Type schema resolvers
const userResolvers = require('./user/resolvers');
const connectionResolvers = require('./connection/resolvers');

const typeDefs = importSchema(join(__dirname, 'schema.graphql'));

const resolvers = {
  ...userResolvers,
  ...connectionResolvers,
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
