const mockingoose = require('mockingoose').default;
const { User } = require('../../db');
const {
  mockRequester,
  compareArrs,
  dbMock: { UserMock: { userOne } },
} = require('../../test_utils');
const { getUser, getUsers } = require('./resolvers');

describe('User Query resolvers',
() => {
  describe('getUser()',
  () => {
    let inputs;
    beforeAll(
    () => {
      mockingoose.resetAll();

      const expectedUser = Object.assign({}, userOne);
      expectedUser._id = userOne.id;
      mockingoose.User.toReturn(expectedUser, 'findOne');

      inputs = {
        id: userOne.id,
        githubID: userOne.githubID,
        username: userOne.username,
      };
    });

    test('returns a User given an ID',
    async () => {
      const args = { input: { id: inputs.id } };
      const output = await getUser(null, args, { models: { User } });
      expect(output._id).toEqual(userOne.id);
    });

    test('returns a User given a githubID',
    async () => {
      const args = { input: { githubID: inputs.githubID } };
      const output = await getUser(null, args, { models: { User } });
      expect(output._id).toEqual(userOne.id);
    });

    test('returns a User given a username',
    async () => {
      const args = { input: { username: inputs.username } };
      const output = await getUser(null, args, { models: { User } });
      expect(output._id).toEqual(userOne.id);
    });

    test('returns null given an unexpected input',
    async () => {
      const args = { input: { tit: 'tat' } };
      const output = await getUser(null, args, { models: { User } });
      expect(output).toBeNull();
    });

    test('returns null given an identifier for a non-existant User',
    async () => {
      mockingoose.User.toReturn(null, 'findOne');
      const args = { input: { id: 'made this up' } };
      const output = await getUser(null, args, { models: { User } });
      expect(output).toBeNull();
    });
  });


  describe('getUsers()',
  () => {
    beforeAll(
    () => {
      mockingoose.resetAll();
    });

    test('returns an array',
    async () => {
      mockingoose.User.toReturn([], 'find');
      const output = await getUsers(null, null, { models: { User } });
      expect(output).toEqual([]);
    });

    test('contains User document elements',
    async () => {
      mockingoose.User.toReturn([new User()]);
      const output = await getUsers(null, null, { models: { User } });
      expect(output[0]).toBeInstanceOf(User);
    });
  });
});

describe('User Type Tests',
() => {
  describe('single User query',
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
  });


  describe('multiple Users query',
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

    it('the documents should contain all of the User fields',
    () => {
      const fields = Object.keys(allUsers[0]);
      const expectedFields = ['id', 'username', 'githubID', 'avatar'];
      expect(compareArrs(fields, expectedFields)).toBe(true);
    });
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
  });
});
