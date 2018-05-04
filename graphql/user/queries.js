const User = require('../../db/user');

module.exports = {
  Query: {
    user: id => User.findById(id),
    users: () => User.find({}),
  },
  User: {
    // reference Type resolvers
  },
};
