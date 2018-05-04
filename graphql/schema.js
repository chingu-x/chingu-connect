const { join } = require('path');
const { importSchema } = require('graphql-import'); // imports .graphql files
const { makeExecutableSchema } = require('graphql-tools'); // combines type defs and resolvers
const userResolvers = require('./user/resolvers');

const typeDefs = importSchema(join(__dirname, 'schema.graphql'));

const resolvers = {
  ...userResolvers,
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });
