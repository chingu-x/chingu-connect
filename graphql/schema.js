const { join } = require('path');
const { importSchema } = require('graphql-import'); // imports .graphql files
const { makeExecutableSchema } = require('graphql-tools'); // combines type defs and resolvers
const userQueries = require('./user/queries');

const typeDefs = importSchema(join(__dirname, 'schema.graphql'));

const resolvers = {
  ...userQueries,
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
