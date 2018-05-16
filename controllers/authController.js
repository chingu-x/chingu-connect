const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('github'));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:8080');
});

router.get(
  process.env.GITHUB_AUTH_CALLBACK_ENDPOINT,
  passport.authenticate('github'),
  (req, res) => res.redirect('http://localhost:8080'),
);

module.exports = router;
