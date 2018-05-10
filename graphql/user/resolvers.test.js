const { User, Connection } = require('../../db/index');
const {
    TestDB,
    mockData: { ConnectionMock, UserMock },
} = require('../../test_utils');
const axios = require('axios');

const db = new TestDB();

const graphQuery = async (query) => {
  try {
    const { data: { data } } = await axios.post('http://localhost:8008/graphql', {
      query,
    });
    return data;
  } catch (e) { console.log(e.response.data.errors); }
};


describe('User Resolver Tests', () => {
  let owner;
  let partner;
  let connection;

  beforeAll(async () => {
    try {
      await db.connect();

      const { userOne, userTwo } = UserMock;
      const {
            ownerID,
            partnerID,
            ...data
      } = ConnectionMock.connectionOne(false, false);

      owner = await User.create(userOne);
      partner = await User.create(userTwo);
      connection = await Connection.create({
        ownerID: owner.id,
        partnerID: partner.id,
        ...data,
      });
    } catch (e) { console.log(e); }
  });


  describe('User Query', async () => {
    let user;

    beforeAll(async () => {
      const response = await graphQuery(`
        {
          user(input:{ id:"${owner.id}" }) {
            id
            username
            githubID
            avatar
          }
        }
      `);
      user = response.user;
    });

    it('should return single User object', async () => {
    //   const user = await User.findById(owner.id);
      expect(user.id).toBe(owner.id);
    });

    it('should return the same fields as created owner', () => {
      const { id, username, githubID, avatar } = user;
      expect(id).not.toBeNull();
      expect(username).not.toBeNull();
      expect(githubID).not.toBeNull();
      expect(avatar).not.toBeNull();
    });
  });


  describe('Users Query', async () => {
    let allUsers;
    beforeAll(async () => {
      const response = await graphQuery(`
          {
            users{
                id
                username
                githubID
                avatar
            }
          }
        `);
      allUsers = response.users;
    });

    it('should return an array', () => {
      expect(allUsers).not.toBe(null);
      expect(allUsers).toBeInstanceOf(Array);
    });

    it('should return correct User objects', () => {
      const userIds = allUsers.map(u => u.id);
      expect(userIds).toContain(owner.id);
      expect(userIds).toContain(partner.id);
    });

    it('should return correct requested fields', () => {
      expect(allUsers.every(user => (user.id && user.username && user.githubID && user.avatar)))
        .toBe(true);
    });
  });


  describe('User -> Created Resolver', () => {
    let user;
    beforeAll(async () => {
      const response = await graphQuery(`
          {
            user(input:{ id:"${owner.id}"}){
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
      user = response.user;
    });

    it('should return an array', async () => {
      expect(user.created).toBeInstanceOf(Array);
    });

    it('should return correct requested fields', () => {
      const { title, description, owner } = user.created;
      expect(title).not.toBeNull();
      expect(description).not.toBeNull();
      expect(owner).not.toBeNull();
    });

    it('should return only connections created by user', () => {
      expect(user.created.every(cr => cr.owner.id === user.id)).toBe(true);
    });
  });


  describe('User -> Joined Resolver', () => {
    let user;
    beforeAll(async () => {
      const response = await graphQuery(`
        {
          user(input:{ id:"${owner.id}"}){
              id
              joined {
                  title
                  description
                  owner {
                      id
                  }
              }
          }
        }
      `);
      user = response.user;
    });

    it('should return an array', async () => {
      expect(user.joined).toBeInstanceOf(Array);
    });

    it('should return correct requested fields', () => {
      const { title, description, partner } = user.joined;
      expect(title).not.toBeNull();
      expect(description).not.toBeNull();
      expect(partner).not.toBeNull();
    });

    it('should return only connections created by user', () => {
      expect(user.joined.every(cr => cr.partner.id === user.id)).toBe(true);
    });
  });

  afterAll(async () => {
    // ===== delete everything we made =====
    try {
      await User.deleteMany({});
      await Connection.deleteMany({});
      db.disconnect();
    } catch (e) { console.log(e); }
  });
});
