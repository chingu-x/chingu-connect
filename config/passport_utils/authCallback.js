const { User } = require('../../db/user/user');

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

module.exports = authCallback;
