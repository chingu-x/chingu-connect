const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const { User } = require('../../db/user');

// define the strategy to be used by this passport endpoint
const strategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_AUTH_CALLBACK_URL,
    scope: 'read:user',
  },
  async (
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
  },
);

// initialize session middleware
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
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(
  (userID, done) => {
    User.findById(userID)
    .then((user) => {
      if (user) return done(null, user);
      return done('Authentication failed. User not found', null);
    });
  },
);

passport.use(strategy);

// router is being used as a stand-in for app.js so config can be done in this file
// without running into circular dep issues from passing app into this file
module.exports = router;
