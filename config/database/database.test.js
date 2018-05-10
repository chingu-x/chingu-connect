const DB_URI = require('./database');

describe('DB_URI()',
() => {
  const mockEnv = {
    TEST_DB_URI: 'mongo://test',
    DEV_DB_URI: 'mongo://dev',
    PROD_DB_URI: 'mongo://prod',
  };

  test('returns test DB URI when NODE_ENV set to "test"',
  () => {
    mockEnv.NODE_ENV = 'test';
    const URI = DB_URI(mockEnv);
    expect(URI).toEqual('mongo://test');
  });
  
  test('returns dev DB URI when NODE_ENV set to "dev"',
  () => {
    mockEnv.NODE_ENV = 'dev';
    const URI = DB_URI(mockEnv);
    expect(URI).toEqual('mongo://dev');
  });

  test('returns prod DB URI when NODE_ENV set to "prod"',
  () => {
    mockEnv.NODE_ENV = 'prod';
    const URI = DB_URI(mockEnv);
    expect(URI).toEqual('mongo://prod');
  });
});
