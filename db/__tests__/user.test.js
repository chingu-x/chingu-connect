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
    describe('Good Path',
    () => {
      test('accepts a valid User construction',
      () => {
        const user = new User(UserMock.userOne);
        user.validate(error => expect(error).toBeNull());
      });
    }); // end Good path

    describe('Bad Path',
    () => {
      test('rejects an empty User construction',
      () => {
        const user = new User();
        user.validate(
          ({ errors }) => {
            expect(errors).toHaveProperty('githubID');
            expect(errors).toHaveProperty('username');
          });
      });

      test('rejects an invalid GitHub username',
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

      test('rejects a missing GitHub ID',
      () => {
        const { userOne: { username, avatar } } = UserMock;
        const user = new User({ username, avatar });
        user.validate(
          ({ errors }) => expect(errors).toHaveProperty('githubID'),
        );
      });

      test('ignores fields not defined in the schema',
      () => {
        const user = new User({ tit: 'tat', ...UserMock.userOne });
        user.validate(error => expect(error).toBeNull());
        expect(user.tit).toBeUndefined();
      });
    }); // end Bad Path
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

    describe('Good Path',
    () => {
      let user;
      test('creates and saves a new User',
      async () => {
        user = new User(UserMock.userOne);
        const res = await user.save();
        expect(res).toHaveProperty('_id');
      });
// THIS ONE DOESNT WORK
      test('deletes a User',
      async () => {
        const res = await User.deleteOne({ _id: user.id });
        // n is the number of documents removed in the response object
        expect(res.n).toEqual(1);
      });

      test('inserts many Users',
      async () => {
        const { userOne, userTwo } = UserMock;
        const res = await User.insertMany([userOne, userTwo]);
        // responds with array of created User documents
        expect(res.length).toEqual(2);
      });
// THIS ONE WORKS
      test('deletes all Users',
      async () => {
        await User.deleteMany({});
        const res = await User.find({});
        expect(res).toEqual([]);
      });
    }); // end Good Path

    describe('Bad Path',
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
