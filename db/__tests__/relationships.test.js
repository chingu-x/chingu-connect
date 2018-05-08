const { User, Connection } = require('../index');
const {
   testDB,
   mockData: { ConnectionMock, UserMock },
 } = require('../../test_utils');


describe('Relationship Test', () => {
  let owner;
  let partner;
  let connection;
  beforeAll(async () => {
    try {
      await testDB.connect(true);
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

  afterAll(async () => {
    // ===== delete everything we made =====
    try {
      await User.deleteMany({});
      await Connection.deleteMany({});
      testDB.disconnect(true);
    } catch (e) { console.log(e); }
  });

  describe('test the test', () => {
    it('should return true', () => {
      expect(true).toBe(true);
    });
  });
});
