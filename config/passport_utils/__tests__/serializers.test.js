const mockingoose = require('mockingoose').default;
const { User } = require('../../../db/index');
const { serializeUser, deserializeUser } = require('../serializers');

const doneMock = jest.fn();

describe('serializer functions',
() => {
  const userData = { username: 'Dildo Baggins', githubID: '13' };
  const user = new User(userData);

  describe('serializeUser()',
  () => {
    beforeAll(
    () => {
      doneMock.mockClear();
      serializeUser(user, doneMock);
    });

    test('uses the done() callback',
    () => expect(doneMock.mock.calls.length).toBe(1));

    test('passes the ID of the user to the done() callback',
    () => expect(doneMock.mock.calls[0][1]).toEqual(user.id));
  });

  describe('deserializeUser()',
  () => {
    beforeAll(
    async () => {
      doneMock.mockClear();
      mockingoose.resetAll();
      mockingoose.User.toReturn(user, 'findOne');
      await deserializeUser(user.id, doneMock);
    });

    test('uses the done() callback',
    () => expect(doneMock.mock.calls.length).toBe(1));

    test('passes the found User to the done() callback',
    () => expect(doneMock.mock.calls[0][1]._id).toEqual(user._id));
  });
});
