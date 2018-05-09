const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const { User } = require('../db/user/user');

/**
 * Callback function for GitHub oAuth handshake in Passport
 *
 * Finds or creates an authenticated user
 *
 * @param {string} accessToken ignored
 * @param {string} refreshToken ignored
 * @param {Object} githubData destructured username, ID, and avatar URL
 * @callback done Passport callback: authenticated user
 */
const authCallback = async (
  accessToken,
  refreshToken,
  { id, _json: { login, avatar_url } },
  done,
) => {
  try {
    const user = (
      await User.findOne({ githubID: id }) ||
      await new User({ githubID: id, username: login, avatar: avatar_url }).save()
    );
    return done(null, user);
  } catch (error) { return done(error, null); }
};

// define the strategy to be used by this passport endpoint
const strategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_AUTH_CALLBACK_URL,
    scope: 'read:user',
  },
  authCallback,
);

/**
 * Serializes a user ID to be stored in the coooookie
 * @param {string} user User instance
 * @callback Passport callback: serialized user ID
 */
const serializeUser = (user, done) => done(null, user.id);

/**
 * Deserializes a user ID to find the authenticated user
 * @param {string} userID user ID deserialized from the cookie
 * @callback Passport callback: found user
 */
const deserializeUser = (userID, done) => {
  User.findById(userID)
  .then((user) => {
    if (user) return done(null, user);
    return done('Authentication failed. User not found', null);
  });
};

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// enable the configuration
passport.use(strategy);

// router is being used as a stand-in for app.js so config can be done in this file
// without running into circular dep issues from passing app into this file
module.exports = passport;
