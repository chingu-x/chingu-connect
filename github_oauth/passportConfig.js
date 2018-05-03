const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../db/user');

// define the strategy to be used by this passport endpoint
const strategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_AUTH_CALLBACK_URL,
    scope: 'read:user, user:email',
  },
  async (
    accessToken,
    refreshToken,
    { _json: { login, email, avatar_url } },
    done,
  ) => {
    try {
      const user = (
        await User.findOne({ username: login }) ||
        new User({ username: login, avatar: avatar_url, email }).save()
      );
      return done(null, user);
    } catch (error) { return done(error, null); }
  },
);

// initialize session middleware on the oAuth router
// TODO: wtf is router doing?
// it is a proxy stand-in for adding global middlewre to app?
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // store:
    // secure: // must ensure https server or proxy approval
    // proxy:
    cookie: {
      maxAge: 172800000, // 48 hour expiration
    },
  }),
);

// initialize passport middleware for the oAuth router
router.use(passport.initialize());
router.use(passport.session());

// define serializer / deserializer
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(strategy);

module.exports = router;
