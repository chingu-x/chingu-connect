const { User, Connection } = require('../../db');

module.exports = {
  // reference / custom Type resolvers for Connection Type
  Connection: {
    owner: (root, { owner: owner_id }) => User.findById(owner_id),
    partner: (root, { partner: partner_id }) => User.findById(partner_id),
  },

  Query: {
    connection: id => Connection.findById(id),
    connections: () => Connection.find({}),
  },

  // Mutation: {}
};
