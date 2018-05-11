const { User } = require('../user');
const {
  compareArrs,
  dbMock: { UserMock },
} = require('../../../test_utils');

describe('User model validators',
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
