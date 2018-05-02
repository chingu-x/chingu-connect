const graphql = require('graphql');
const Connection = require('../../db/connection');
const ConnectionType = require('../connection/connectionType');

const { GraphQLString, GraphQLInt, GraphQLNonNull } = graphql;

const ConnectionMutations = {
  addConnection: {
    type: ConnectionType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      lifespan: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(parentValue, args) {
      const timestamp = String(Date.now());
      return new Connection({ ...args, timestamp }).save();
    },
  },
};

module.exports = ConnectionMutations;
