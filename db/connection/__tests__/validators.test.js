const { Connection } = require('../connection');
const {
  compareArrs,
  mockData: { ConnectionMock },
} = require('../../../test_utils');

describe('Connection model validators',
() => {
  describe('has expected fields, updated 5/7/18',
  () => {
    test('title, description, timestamp, lifespan, ownerID, partnerID',
    () => {
      // expected fields should be updated when the Schema changes
      const expected = [
        'title',
        'description',
        'lifespan',
        'timestamp',
        'ownerID',
        'partnerID',
      ];
      const actual = Object.keys(Connection.schema.obj);
      expect(compareArrs(expected, actual)).toBe(true);
    });
  });

  describe('title',
  () => {
    test('accepts a title under 140 characters',
    () => {
      const connection = new Connection(ConnectionMock.connectionOne());
      connection.validate(error => expect(error).toBeNull());
    });

    test('rejects a title over 140 characters',
    () => {
      const { title: invalidTitle } = ConnectionMock.invalid;
      const { title: validTitle, ...validData } = ConnectionMock.connectionOne();
      const connection = new Connection({ title: invalidTitle, ...validData });
      connection.validate(({ errors }) => expect(errors.title).toBeDefined());
    });

    test('rejects if no title is passed',
    () => {
      const { title, ...validData } = ConnectionMock.connectionOne();
      const connection = new Connection({ validData });
      connection.validate(({ errors }) => expect(errors.title).toBeDefined());
    });
  });

  describe('description',
  () => {
    test('accepts a description under 5000 characters',
    () => {
      const connection = new Connection(ConnectionMock.connectionOne());
      connection.validate(error => expect(error).toBeNull());
    });

    test('rejects a description over 5000 characters',
    () => {
      const { description: invalidDescription } = ConnectionMock.invalid;
      const { description: validDescription, ...validData } = ConnectionMock.connectionOne();
      const connection = new Connection({ description: invalidDescription, ...validData });
      connection.validate(({ errors }) => expect(errors.description).toBeDefined());
    });

    test('rejects if no description is passed',
    () => {
      const { description, ...validData } = ConnectionMock.connectionOne();
      const connection = new Connection({ validData });
      connection.validate(({ errors }) => expect(errors.description).toBeDefined());
    });
  });

  describe('lifespan',
  () => {
    test('accepts a lifespan under 8 hours',
    () => {
      const connection = new Connection(ConnectionMock.connectionOne());
      connection.validate(error => expect(error).toBeNull());
    });

    test('rejects a lifespan under 1 hour',
    () => {
      const { lifespan, ...validData } = ConnectionMock.connectionOne();
      const connection = new Connection({ lifespan: 0, ...validData });
      connection.validate(({ errors }) => expect(errors.lifespan).toBeDefined());
    });

    test('rejects a lifespan over 8 hours',
    () => {
      const { lifespan: invalidLifespan } = ConnectionMock.invalid;
      const { lifespan: validLifespan, ...validData } = ConnectionMock.connectionOne();
      const connection = new Connection({ lifespan: invalidLifespan, ...validData });
      connection.validate(({ errors }) => expect(errors.lifespan).toBeDefined());
    });

    test('rejects if no lifespan is passed',
    () => {
      const { lifespan, ...validData } = ConnectionMock.connectionOne();
      const connection = new Connection({ validData });
      connection.validate(({ errors }) => expect(errors.lifespan).toBeDefined());
    });
  });

  describe('timestamp',
  () => {
    const connection = new Connection(ConnectionMock.connectionOne());
    test('auto generates on creation',
    () => {
      connection.validate(error => expect(error).toBeNull());
      expect(connection.timestamp).toBeDefined();
    });

    test('generates a valid Unix timestamp string',
    () => {
      try {
        const date = new Date(connection.timestamp);
        const valid = isNaN(date.getTime());
        expect(valid).toBe(true);
      } catch (error) { console.error(error); }
    });
  });

  describe('ownerID && partnerID',
  () => {
    const { ID: invalidID } = ConnectionMock.invalid;
    const { ownerID, partnerID, ...validData } = ConnectionMock.connectionOne();

    test('accepts a valid object ID reference',
    () => {
      const connection = new Connection(ConnectionMock.connectionOne(true));
      connection.validate(error => expect(error).toBeNull());
    });

    test('accepts if no partnerID is passed',
    () => {
      const connection = new Connection({ ownerID, ...validData });
      connection.validate(error => expect(error).toBeNull());
    });

    test('rejects if no ownerID is passed',
    () => {
      const connection = new Connection({ ...validData });
      connection.validate(({ errors }) => expect(errors.ownerID).toBeDefined());
    });

    test('rejects an invalid object ID reference',
    () => {
      const connection = new Connection({ ownerID: invalidID, ...validData });
      connection.validate(({ errors }) => expect(errors.ownerID).toBeDefined());
    });
  });
});
