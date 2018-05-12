const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github'));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  process.env.GITHUB_AUTH_CALLBACK_ENDPOINT,
  passport.authenticate('github'),
  (req, res) => res.redirect('/'),
);

module.exports = router;
