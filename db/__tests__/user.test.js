require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../user');
const { UserMock } = require('../__mocks__/user');

mongoose.Promise = global.Promise;

describe('User Model',
() => {
// -- OFFLINE -- //
  describe('Offline',
  () => {
    describe('GitHub username validator',
    () => {
      test('accepts a valid username',
      () => {
        const user = new User(UserMock.userOne);
        user.validate(error => expect(error).toBeNull());
      });
      test('rejects an invalid username',
      () => {
        const {
          invalid: { username },
          userOne: { githubID, avatar },
        } = UserMock;

        const user = new User({ username, githubID, avatar });
        user.validate(
          ({ errors }) => expect(errors).toHaveProperty('username'),
        );
      });
    });
  });

// -- ONLINE -- //
  describe('Online',
  () => {
    let connection;
    beforeAll(
    () => {
      mongoose.connect(process.env.TEST_DB_URI);
      connection = mongoose.connection;
    });

    describe('insert validations',
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

      afterAll(async () => User.deleteMany({}));
    });

    afterAll(
    async () => {
      await User.deleteMany({});
      connection.close();
    });
  });
});
