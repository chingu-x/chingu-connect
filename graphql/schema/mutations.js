const graphql = require('graphql');
const User = require('../../db/models/user');
const UserType = require('./userType');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

/**
 * Mutations allow for CRUD functionality
 */
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { username, email }) {
        return (new User({ username, email })).save();
      },
    },
  },
});

module.exports = mutation;
