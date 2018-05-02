const graphql = require('graphql');
const User = require('../db/user');
const Connection = require('../db/connection');
const UserType = require('./user/userType');
const ConnectionType = require('./connection/connectionType');

/**
 * Include graphQL types
 * NonNull helper requires a value
 */
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const Queries = new GraphQLObjectType({
  name: 'Queries',
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
    connections: {
      type: new GraphQLList(ConnectionType),
      resolve() {
        return Connection.find({});
      },
    },
    connection: {
      type: ConnectionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Connection.findById(id);
      },
    },
  }),
});

module.exports = Queries;
