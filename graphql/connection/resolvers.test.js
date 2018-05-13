const mockingoose = require('mockingoose').default;
const { Connection } = require('../../db');
const { dbMock: { ConnectionMock: { connectionOne } } } = require('../../test_utils');
const { getConnection, getConnections } = require('./resolvers');

describe('Connection Query resolvers',
() => {
  describe('getConnection()',
  () => {
    beforeAll(
    () => {
      mockingoose.resetAll();

      const expectedConnection = Object.assign({}, connectionOne);
      expectedConnection._id = connectionOne.id;
      mockingoose.Connection.toReturn(expectedConnection, 'findOne');
    });

    test('returns a Connection given an ID',
    async () => {
      const args = { input: { id: connectionOne.id } };
      const output = await getConnection(null, args, { models: { Connection } });
      expect(output._id).toEqual(connectionOne.id);
    });

    test('returns null given an identifier for a non-existant Connection',
    async () => {
      mockingoose.Connection.toReturn(null, 'findOne');
      const args = { input: { id: 'made this up' } };
      const output = await getConnection(null, args, { models: { Connection } });
      expect(output).toBeNull();
    });
  });


  describe('getConnections()',
  () => {
    beforeAll(
    () => {
      mockingoose.resetAll();
    });

    test('returns an array',
    async () => {
      mockingoose.Connection.toReturn([], 'find');
      const output = await getConnections(null, null, { models: { Connection } });
      expect(output).toEqual([]);
    });

    test('contains Connection document elements',
    async () => {
      mockingoose.Connection.toReturn([new Connection()]);
      const output = await getConnections(null, null, { models: { Connection } });
      expect(output[0]).toBeInstanceOf(Connection);
    });
  });
});
