const { Connection } = require('../../db');

module.exports = {
  // reference / custom Type resolvers for Connection Type
  Connection: {
    owner: connection => connection.getOwner(),
    partner: connection => connection.getPartner(),
  },

  Query: {
    // TODO: refactor Query resolvers to support new ConnectionInput
    connection: (root, id) => Connection.findById(id),
    connections: () => Connection.find({}),
  },

  // Mutation: {}
};
