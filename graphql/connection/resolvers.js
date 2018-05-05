const { Connection } = require('../../db');

module.exports = {
  // reference / custom Type resolvers for Connection Type
  Connection: {
    owner: connection => connection.getOwner(),
    partner: connection => connection.getPartner(),
  },

  Query: {
    connection: (root, { input: { id } }) => Connection.findById(id),
    connections: () => Connection.find({}),
  },

  // Mutation: {}
};
