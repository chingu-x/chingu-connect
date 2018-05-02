const UserMutations = require('./user/mutations');
const ConnectionMutations = require('./connection/mutations');

const { GraphQLObjectType } = require('graphql');

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    ...UserMutations,
    ...ConnectionMutations,
  },
});

module.exports = Mutations;
