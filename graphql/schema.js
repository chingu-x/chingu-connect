const graphql = require('graphql');
const Queries = require('./Queries');
const Mutations = require('./Mutations');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});
