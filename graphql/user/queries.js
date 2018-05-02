const graphql = require('graphql');
const User = require('../../db/user');
const UserType = require('./userType');

const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

module.exports = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find({});
    },
  },
  user: {
    type: UserType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parentValue, { id }) {
      return User.findById(id);
    },
  },
};
