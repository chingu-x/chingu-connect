const graphql = require('graphql');
const UserQueries = require('./user/queries');
const ConnectionQueries = require('./connection/queries');

const { GraphQLObjectType } = graphql;

const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: {
    ...UserQueries,
    ...ConnectionQueries,
  },
});

module.exports = Queries;
