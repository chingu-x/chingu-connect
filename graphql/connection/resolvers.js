const { Connection } = require('../../db');

const getConnection = (root, { input: { id } }) => Connection.findById(id);
const getConnections = () => Connection.find({});

const getOwner = connection => connection.getOwner();
const getPartner = connection => connection.getPartner();

module.exports = {
  getConnection,
  getConnections,
  // reference / custom Type resolvers for Connection Type
  Connection: {
    owner: getOwner,
    partner: getPartner,
  },

  Query: {
    connection: getConnection,
    connections: getConnections,
  },

  // Mutation: {}
};
