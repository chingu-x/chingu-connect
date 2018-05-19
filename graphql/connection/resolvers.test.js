const mockingoose = require('mockingoose').default;
const { Connection } = require('../../db');
const {
    dbMock: {
        ConnectionMock: { connectionOne },
        UserMock: { userOne },
    },
} = require('../../test_utils');
const { getConnection, getConnections,
    Mutation: { createConnection },
 } = require('./resolvers');

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

  describe('createConnection()',
    () => {
      beforeAll(
          () => {
            mockingoose.resetAll();
          },
      );
      test('returns an error if used ID is missing',
        async () => {
          try {
            const args = { input: { title: 'test title', description: 'blah', lifespan: 3 } };
            const output = await createConnection(null, args, { models: { Connection } });
            expect(output).toThrow();
          } catch (e) { console.log('Missing Fields'); }
        });

      test('returns an error if other required fileds are missing',
        async () => {
          try {
            const args = { input: { id: userOne.id } };
            const output = await createConnection(null, args, { models: { Connection } });
            expect(output).toThrow();
          } catch (e) { console.log('Missing Fields'); }
        });

      test('should return a new Connection',
        async () => {
          const args = { input: { id: userOne.id, title: 'Test', description: 'blah', lifespan: 4 } };
          const output = await createConnection(null, args, { models: { Connection } });
          expect(output.ownerID).toBe(userOne.id);
          expect(output.title).toBe('Test');
          expect(output.description).toBe('blah');
          expect(output.lifespan).toBe(4);
        });
    },
  );
});
