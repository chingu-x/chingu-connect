const graphql = require('graphql');
const RootQueryType = require('./rootQueryType');
const mutations = require('./mutations');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations,
});
