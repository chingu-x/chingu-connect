// -- MIDDLEWARE -- //
const router = require('express').Router(); // router as a stand-in for app for modular configuration
const bp = require('body-parser');
const cors = require('./cors');
const session = require('./session');
const passport = require('./passportGitHub');

router.use(bp.json());
router.use(cors);
router.use(session);
router.use(passport.initialize());
router.use(passport.session());

module.exports = router;
