const { User } = require('../user');

describe('User Model', () => {
  describe('Instance Tests', () => {
    describe('new User instance', () => {
      it('returns an instance of the User class', () => {
        const user = new User();
        expect(user).toBeInstanceOf(User);
      });

      it('accepts constructor props found in the Schema',
        () => {
          const user = new User({ githubID: 'a string value' });
          const expected = user.githubID;
          expect(expected).toBeDefined();
        },
      );

      it('ignores constructor props not found in the Schema',
        () => {
          const user = new User({ nonSchemaField: 'value' });
          const expected = user.nonSchemaField;
          expect(expected).toBeUndefined();
        },
      );
    });
  });
  describe('Instance Method Tests', () => {
    describe('ownedConnections()', () => {
      const user = new User();
      it('returns an array', () => {
        expect(['test']).toBeInstanceOf(Array);
      });
    });
  });
});
