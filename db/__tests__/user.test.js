require('dotenv').config();
const mongoose = require('mongoose');
const { User } = require('../user');
const { UserMock } = require('../__mocks__/User');

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
      () => {
        user = new User(UserMock.userOne);
        return user.save((error, userDoc) => {
          expect(error).toBeNull();
          expect(userDoc).toHaveProperty('_id');
        });
      });
// THIS ONE DOESNT WORK
      test('deletes a User',
      () => User.deleteOne(
          { id: user.id },
          error => expect(error).toBeNull(),
        ));

      test('inserts many Users',
      () => {
        const { userOne, userTwo } = UserMock;
        return User.insertMany(
          [userOne, userTwo],
          (error, docs) => {
            expect(error).toBeNull();
            expect(docs).toBeDefined();
          },
        );
      });
// THIS ONE WORKS
      test('deletes all Users',
      () => User.deleteMany(
        {},
        (error) => {
          expect(error).toBeNull();
          User.find({}).then(allQuery => expect(allQuery).toEqual([]));
        },
      ));
    }); // end Good Path

    afterAll(() => connection.close());
  });
});
