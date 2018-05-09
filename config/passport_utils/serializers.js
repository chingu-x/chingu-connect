const { User } = require('../../db/user/user');

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

module.exports = {
  serializeUser,
  deserializeUser,
};
