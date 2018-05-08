const { testDB } = require('../../test_utils');
const { User } = require('../user');
const {
  compareArrs,
  mockData: { UserMock },
} = require('../../test_utils');

describe('User Model',
() => {
// -- OFFLINE -- //
  describe('Offline',
  () => {
    describe('has expected fields, updated 5/7/18',
    () => {
      test('username, githubID, avatar',
      () => {
        // expected fields should be updated when the Schema changes
        const expected = [
          'username',
          'githubID',
          'avatar',
        ];
        const actual = Object.keys(User.schema.obj);
        expect(compareArrs(expected, actual)).toBe(true);
      });
    });

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
    beforeAll(() => testDB.connect());

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
      testDB.disconnect();
    });
  });
});
