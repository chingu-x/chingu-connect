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
    { input: { title, description, lifespan } },
    { models: { Connection }, authUser },
) => {
  if (!title || !description || !lifespan) {
    throw new Error('Missing Required Fields');
  }
  return Connection.create({
    ownerId: authUser.id,
    title,
    description,
    lifespan,
  });
};


const joinConnection = async (
    root,
    { input: { id } },
    { models: { Connection }, authUser },
) => {
  try {
    if (!id || !authUser) throw new Error('Missing Required Fields');

    const connection = await Connection.findById(id);

    if (connection.partnerID) throw new Error('Connection has an existing partner');

    // connection.ownerID is a Mongoose Object Type, so have to change to string
    // to check against partnerID that's a string type coming from GraphQL
    if (connection.ownerID.toString() === authUser.id.toString()) throw new Error('Owner can not be same as partner');

    connection.partnerID = authUser.id;
    return connection.save();
  } catch (e) { throw new Error(e); }
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
    joinConnection,
  },
};
