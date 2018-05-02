const graphql = require('graphql');
const User = require('../models/user');
const UserType = require('./userType');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }, // NonNull helper requires a value
        email: { type: new GraphQLNonNull(GraphQLString) }, // NonNull helper requires a value
      },
      resolve(parentValue, { username, email }) {
        return (new User({ username, email })).save();
      },
    },
  },
});

module.exports = mutation;
