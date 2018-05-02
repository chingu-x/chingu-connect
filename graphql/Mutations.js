const UserMutations = require('./user/mutations');
const ConnectionMutations = require('./connection/mutations');

const { GraphQLObjectType } = require('graphql');
/**
 * Mutations allow for CRUD functionality
 */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutations,
    ...ConnectionMutations,
  },
});

module.exports = Mutation;
