const { User } = require('../user');
const { dbMock: { UserMock, TestDB } } = require('../../../test_utils');

const db = new TestDB();

describe('User model database constraints',
() => {
  beforeAll(
  async () => {
    await db.connect();
    await User.create(UserMock.userOne);
  });

  test('rejects User with existing username',
  async () => {
    try {
      await User.create(UserMock.userOne);
    } catch (error) { expect(error.message).toMatch(/username/); }
  });

  test('rejects User with existing GitHub ID',
  async () => {
    const { githubID, avatar } = UserMock.userOne;
    try {
      await User.create({ username: 'okname', githubID, avatar });
    } catch (error) { expect(error.message).toMatch(/githubID/); }
  });

  afterAll(
  async () => {
    await User.deleteMany({});
    await db.disconnect();
  });
});
