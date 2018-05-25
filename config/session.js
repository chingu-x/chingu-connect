const session = require('express-session');
// const RedisStore = require('connect-redis')(session);

module.exports = session({
  // store: new RedisStore({ url: process.env.REDIS_URL }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
});
