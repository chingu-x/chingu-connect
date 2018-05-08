const {
  testDB,
  mockData: { ConnectionMock, UserMock },
} = require('../../test_utils');
const { User, Connection } = require('../index');

beforeAll(async () => testDB.connect());

describe('Online User model tests',
  () => {
    describe('unique constraints',
    () => {
      let existingUser;
      beforeAll(
      async () => {
        existingUser = new User(UserMock.userOne);
        await existingUser.save();
      });

      test('rejects User with existing username',
      async () => {
        const user = new User(UserMock.userOne);
        try {
          await user.save();
        } catch (error) { expect(error.message).toMatch(/username/); }
      });

      test('rejects User with existing GitHub ID',
      async () => {
        const { githubID, avatar } = UserMock.userOne;
        const user = new User({ username: 'okname', githubID, avatar });
        try {
          await user.save();
        } catch (error) { expect(error.message).toMatch(/githubID/); }
      });

      afterAll(async () => User.deleteOne({ _id: existingUser.id }));
    });
  });

describe('Online Connection model tests',
  () => {
    describe('unique constraints',
    () => {
      const { ownerID, partnerID, ...validData } = ConnectionMock.connectionOne(true);

      test('accepts if ownerID is different than partnerID',
      async () => {
        const connection = new Connection({ ownerID, partnerID, ...validData });
        try {
          const res = await connection.save();
          expect(res).toBe(connection);
        } catch (error) { console.error(error); }
      });

      test('rejects if ownerID is same as partnerID',
      async () => {
        const connection = new Connection({ ownerID, partnerID: ownerID, ...validData });
        try {
          await connection.save();
        } catch ({ errors }) { expect(errors.ownerID).toBeDefined(); }
      });
    });
  });

afterAll(async () => testDB.disconnect());
