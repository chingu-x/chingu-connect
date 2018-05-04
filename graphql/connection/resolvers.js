const { User, Connection } = require('../../db');

module.exports = {
  Connection: {
    owner: ({ owner: owner_id }) => User.findById(owner_id),
    partner: ({ partner: partner_id }) => User.findById(partner_id),
  },

  Query: {
    connection: ({ id }) => Connection.findById(id),
    connections: () => Connection.find({}),
  },

  // Mutation: {}
};
