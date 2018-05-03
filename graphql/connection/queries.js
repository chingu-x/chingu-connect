const graphql = require('graphql');
const Connection = require('../../db/connection');
const ConnectionType = require('./connectionType');

const { GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

module.exports = {
  connection: {
    type: ConnectionType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve(parentValue, { id }) {
      return Connection.findById(id);
    },
  },
  connections: {
    type: new GraphQLList(ConnectionType),
    resolve() {
      return Connection.find({});
    },
  },
};
