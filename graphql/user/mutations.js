const graphql = require('graphql');
const User = require('../../db/user');
const UserType = require('./userType');

const { GraphQLString, GraphQLNonNull } = graphql;

module.exports = {
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
};