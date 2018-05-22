const getConnection = (
  root,
  { input: { id } },
  { models: { Connection } },
) => Connection.findById(id); // implicitly returns null when findById fails to lookup

const getConnections = (root, args, { models: { Connection } }) => Connection.find({});

const getOwner = connection => connection.getOwner();
const getPartner = connection => connection.getPartner();


// ===== MUTATIONS ===== //
const createConnection = (
    root,
    { input: { id: ownerID, title, description, lifespan } },
    { models: { Connection } },
) => {
  if (!ownerID || !title || !description || !lifespan) {
    throw new Error('Missing Required Fields');
  }
  return Connection.create({
    ownerID,
    title,
    description,
    lifespan,
  });
};


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

  Mutation: {
    createConnection,
  },
};
