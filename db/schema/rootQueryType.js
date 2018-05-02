const graphql = require('graphql');
const User = require('../models/user');
const UserType = require('./userType');

/**
 * Include graphQL types
 * NonNull helper requires a value
 */
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
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
  }),
});

module.exports = RootQuery;
