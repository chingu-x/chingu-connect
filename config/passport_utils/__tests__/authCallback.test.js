const mockingoose = require('mockingoose').default;
const { Types: { ObjectId } } = require('mongoose');
const authCallback = require('../authCallback');

// mocks the done() callback used in the utility functions
  // done accepts 2 arguments: (error, data)
// jest.fn() can have its calls and arguments
// accessed using doneMock.mock.PROPERTY - see use below for more notes
const doneMock = jest.fn();

describe('GitHub Passport configuration',
() => {
  describe('authCallback()',
  () => {
    const existingPayload = {
      id: '25523682',
      _json: {
        login: 'the-vampiire',
        avatar: 'https://avatars3.githubusercontent.com/u/25523682?v=4',
      },
    };

    const existingUser = {
      _id: new ObjectId('5aee3d10b0c3121b1d5f21c1'),
      githubID: '25523682',
      username: 'the-vampiireee',
      avatar: 'https://avatars3.githubusercontent.com/u/25523682?v=4',
      __v: 0,
    };

    describe('existing user login authentication',
    () => {
      beforeAll(
      async () => {
        // resets any cached mock data
        doneMock.mockClear();
        // resets any cached monckingoose data
        mockingoose.resetAll();
        // mocks the authCallback user.findOne() method call
        // no database needed!
        // https://github.com/alonronin/mockingoose
        mockingoose.User.toReturn(existingUser, 'findOne');
        // call the function to be tested
        authCallback(null, null, existingPayload, doneMock);
      });

      test('uses the done() callback',
      () => {
        // doneMock should be called one time
        // property: .calls contains an array of calls
        // length of the calls array should be one (one call)
        expect(doneMock.mock.calls.length).toBe(1);
      });

      test('passes the existing user to the done() callback',
      () => {
        // doneMock should be called one time with arguments
          // null -> no error
          // user -> the found user
        // outer indices: index of the arguments array for each call
        // inner indices: index of the argument in the arguments array
        expect(doneMock.mock.calls[0][0]).toBeNull();
        expect(doneMock.mock.calls[0][1]._id).toEqual(existingUser._id);
      });
    });

    describe('new user signup authentication',
    () => {
      const newPayload = {
        id: '25523543',
        _json: {
          login: 'Bigghead',
          avatar_url: 'https://avatars3.githubusercontent.com/u/25523543?v=4',
        },
      };

      const newUser = {
        _id: new ObjectId('5aee3d10b0c3121b1d5f22f5'),
        githubID: '25523543',
        username: 'Bigghead',
        avatar: 'https://avatars3.githubusercontent.com/u/25523682?v=4',
        __v: 0,
      };

      beforeAll(
      () => {
        doneMock.mockClear();
        mockingoose.resetAll();
        mockingoose.User.toReturn(newUser, 'save');
        authCallback(null, null, newPayload, doneMock);
      });

      test('uses the done() callback',
      () => expect(doneMock.mock.calls.length).toBe(1));

      test('passes the new user to the done() callback',
      () => {
        expect(doneMock.mock.calls[0][0]).toBeNull();
        expect(doneMock.mock.calls[0][1]._id).toEqual(newUser._id);
      });
    });
  });
});
