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

// ===== This function needs the .save() at the end ===== //
// ===== as that is how our custom Mongoose validations are checked before =====//
const joinConnection = async (
    root,
    { input: { id, partnerID } },
    { models: { Connection } },
) => {
  try {
    if (!id || !partnerID) throw new Error('Missing Required Fields');

    const connection = await Connection.findByIdAndUpdate(
      id,
      { $set: { partnerID } },
      { updated: true },
    );

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
