const { User, Connection } = require('../index');
const { dbMock: { UserMock, ConnectionMock, TestDB } } = require('../../test_utils');

const db = new TestDB();

describe('Relationship tests', () => {
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

  describe('User --> Connection methods', () => {
    // BEFORE ALL VARS ONLY EXIST IN TESTS
    describe('ownedConnections()', () => {
      let ownedConnections;
      beforeAll(async () => {
        ownedConnections = await owner.ownedConnections();
      });

      it('should return an array',
      () => expect(ownedConnections).toBeInstanceOf(Array));

      it('should only return connections owned by user',
      () => expect(ownedConnections.length).toBe(1));

      it('should return connection owned by user',
      () => expect(ownedConnections.map(doc => doc.id)).toContain(connection.id));
    });

    describe('joinedConnections()', () => {
      let joinedConnections;
      beforeAll(async () => {
        joinedConnections = await partner.joinedConnections();
      });

      it('should return an array',
      () => expect(joinedConnections).toBeInstanceOf(Array));

      it('should only return connections joined by user',
      () => expect(joinedConnections.length).toBe(1));

      it('should return connection joined by user',
      () => expect(joinedConnections.map(doc => doc.id)).toContain(connection.id));
    });
  });

  describe('Connection --> User methods', () => {
    // BEFORE ALL VARS ONLY EXIST IN TESTS
    describe('getOwner()', () => {
      let connectionOwner;
      beforeAll(async () => {
        connectionOwner = await connection.getOwner();
      });

      it('should return a User instance',
      () => expect(connectionOwner).toBeInstanceOf(User));

      it('should return the owner User',
      () => expect(connectionOwner.id).toBe(owner.id));
    });

    describe('getPartner()', () => {
      let connectionPartner;
      beforeAll(async () => {
        connectionPartner = await connection.getPartner();
      });

      it('should return a User instance',
      () => expect(connectionPartner).toBeInstanceOf(User));

      it('should return the partner User',
      () => expect(connectionPartner.id).toBe(partner.id));
    });
  });

  afterAll(async () => {
    // ===== delete everything we made =====
    try {
      await User.deleteMany({});
      await Connection.deleteMany({});
      await db.disconnect();
    } catch (e) { console.log(e); }
  });
});
