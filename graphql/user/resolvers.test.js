const {
  mockRequester,
  compareArrs,
  dbMock: { UserMock: { userOne } },
} = require('../../test_utils');

describe('User Resolver Tests',
() => {
  describe('[user] root Query',
  () => {
    let requestedUser;
    beforeAll(async () => {
      const response = await mockRequester(`
        {
          user(input:{ id:"m4n33d1Ld05" }) {
            id
            username
            githubID
            avatar
          }
        }
      `);
      requestedUser = response.user;
    });
    it('should return a User document',
    () => expect(requestedUser).toBeDefined());

    it('should return the requested fields',
    () => {
      const fields = Object.keys(requestedUser);
      const expectedFields = ['id', 'username', 'githubID', 'avatar'];
      expect(compareArrs(fields, expectedFields)).toBe(true);
    });

    it('should be the requested User document',
    () => expect(requestedUser.id).toEqual(String(userOne.id)));
  });


  describe('[users] root Query',
  () => {
    let allUsers;
    beforeAll(async () => {
      const response = await mockRequester(`
        query {
          users {
              id
              username
              githubID
              avatar
          }
        }
      `);
      allUsers = response.users;
    });

    it('should return an array',
    () => expect(allUsers).toBeInstanceOf(Array));

    it('should return two User documents',
    () => expect(allUsers.length).toBe(2));

    it('should return correct requested fields',
    () => expect(
      allUsers.every(user => (user.id && user.username && user.githubID && user.avatar)),
    ).toBe(true));
  });


  describe('[created] User field', () => {
    let requestedUser;
    let created;
    let createdConnection;
    beforeAll(async () => {
      const response = await mockRequester(`
         query {
            user(input:{ id:"m4n33d1Ld05" }) {
                id
                created {
                    title
                    description
                    owner {
                        id
                    }
                }
            }
          }
      `);
      requestedUser = response.user;
      created = requestedUser.created;
      createdConnection = created[0];
    });

    it('should return an array',
    () => expect(created).toBeInstanceOf(Array));

    it('should return one created Connection',
    () => expect(created.length).toBe(1));

    it('should return the requested created Connection fields',
    () => {
      const fields = Object.keys(createdConnection);
      const expectedFields = ['title', 'description', 'owner'];
      expect(compareArrs(fields, expectedFields)).toBe(true);
    });

    it('should return the Connection created by the user',
    () => expect(createdConnection.owner.id).toEqual(String(userOne.id)));
  });


  describe('[joined] User field',
  () => {
    let requestedUser;
    let joined;
    let joinedConnection;
    beforeAll(async () => {
      const response = await mockRequester(`
         query {
            user(input:{ id:"m4n33d1Ld05" }) {
                id
                joined {
                    title
                    description
                    partner {
                        id
                    }
                }
            }
          }
      `);
      requestedUser = response.user;
      joined = requestedUser.joined;
      joinedConnection = joined[0];
    });

    it('should return an array',
    () => expect(joined).toBeInstanceOf(Array));

    it('should return one joined Connection',
    () => expect(joined.length).toBe(1));

    it('should return the requested joined Connection fields',
    () => {
      const fields = Object.keys(joinedConnection);
      const expectedFields = ['title', 'description', 'partner'];
      expect(compareArrs(fields, expectedFields)).toBe(true);
    });

    it('should return the Connection joined by the user',
    () => expect(joinedConnection.partner.id).toEqual(String(userOne.id)));
  });
});
