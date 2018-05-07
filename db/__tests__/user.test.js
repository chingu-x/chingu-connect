const { connect } = require('mongoose');
const { User } = require('../user');
const { UserMock } = require('../__mocks__/User');

describe('User Model',
() => {
// -- OFFLINE -- //
  describe('Offline',
  () => {
    describe('Good Path',
    () => {
      it('accepts a valid User construction',
      () => {
        const user = new User(UserMock.userOne);
        user.validate(error => expect(error).toBeNull());
      });
    });
    describe('Bad Path',
    () => {
      it('rejects an empty User construction',
      () => {
        const user = new User();
        user.validate(
          ({ errors }) => {
            expect(errors).toHaveProperty('githubID');
            expect(errors).toHaveProperty('username');
          });
      });

      it('rejects an invalid GitHub username',
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

      it('rejects a missing GitHub ID',
      () => {
        const { userOne: { username, avatar } } = UserMock;
        const user = new User({ username, avatar });
        user.validate(
          ({ errors }) => expect(errors).toHaveProperty('githubID'),
        );
      });

      it('ignores fields not defined in the schema',
      () => {
        const user = new User({ tit: 'tat', ...UserMock.userOne });
        user.validate(error => expect(error).toBeNull());
        expect(user.tit).toBeUndefined();
      });
    });
  });
});
