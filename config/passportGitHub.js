const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const {
  authCallback,
  serializeUser,
  deserializeUser,
} = require('./passport_utils');

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

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// enable the configuration
passport.use(strategy);

module.exports = passport;
