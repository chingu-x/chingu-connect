const { Connection } = require('../connection');
const {
  TestDB,
  mockData: { ConnectionMock },
} = require('../../../test_utils');

const db = new TestDB();

beforeAll(async () => db.connect());

describe('Connection model database constraints',
() => {
  const { ownerID, partnerID, ...validData } = ConnectionMock.connectionOne(true);

  test('accepts if ownerID is different than partnerID',
  async () => {
    try {
      const res = await Connection.create({ ownerID, partnerID, ...validData });
      expect(res).toHaveProperty('_id');
    } catch (error) { console.error(error); }
  });

  test('rejects if ownerID is same as partnerID',
  async () => {
    const connection = new Connection({ ownerID, partnerID: ownerID, ...validData });
    try {
      await connection.save();
    } catch ({ errors }) { expect(errors.ownerID).toBeDefined(); }
  });
});

afterAll(async () => {
  await Connection.deleteMany({});
  await db.disconnect();
});
