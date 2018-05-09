const {
  testDB,
  mockData: { UserMock },
} = require('../../../test_utils');
const { User } = require('../user');

beforeAll(async () => testDB.connect());

describe('User model database constraints',
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

afterAll(async () => testDB.disconnect());
