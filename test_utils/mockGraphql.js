const { addMockFunctionsToSchema, MockList } = require('graphql-tools');
const { graphql } = require('graphql');
const schema = require('../graphql/schema');
const {
  UserMock: { userOne, userTwo },
  ConnectionMock: { connectionOne, connectionTwo },
} = require('./db');

const Query = () => ({
  user: () => userOne,
  users: () => new MockList(2, () => userOne),
});

// mock User Type
const User = () => ({
  id: () => userOne.id,
  username: () => userOne.username,
  githubID: () => userOne.githubID,
  avatar: () => userOne.avatar,
  created: () => new MockList(1, () => connectionOne()),
  joined: () => new MockList(1, () => connectionTwo()),
});

// mock Connection Type
const Connection = () => ({
  id: () => connectionOne.id,
  title: () => connectionOne.title,
  description: () => connectionOne.description,
  lifespan: () => connectionOne.lifespan,
  timestamp: () => String(Date.now()),
  owner: () => userOne,
  partner: () => userTwo,
});

addMockFunctionsToSchema({
  schema,
  mocks: { Query, User, Connection },
});

const mockGraphql = async (query) => {
  try {
    const { data } = await graphql(schema, query);
    return data;
  } catch (e) { console.log(e); }
  return null;
};

module.exports = mockGraphql;
