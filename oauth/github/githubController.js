const router = require('express').Router();
const passport = require('passport');
// /auth/login
router.get('/login', passport.authenticate('github'));
router.get(
  '/success',
  passport.authenticate('github'),
  (req, res) => res.redirect('/'),
);

module.exports = router;
