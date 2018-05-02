const graphql = require('graphql');
const rootQueries = require('./rootQueries');
const rootMutations = require('./rootMutations');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: rootQueries,
  mutation: rootMutations,
});
