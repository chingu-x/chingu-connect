const DB_URI = (env) => {
  switch (env.NODE_ENV) {
    case 'test': return env.TEST_DB_URI;
    case 'dev': return env.DEV_DB_URI;
    case 'prod': return env.PROD_DB_URI;
    default: throw new Error(`Invalid NODE_ENV: ${process.env.NODE_ENV}`);
  }
};

module.exports = DB_URI;
