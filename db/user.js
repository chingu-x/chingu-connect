const mongoose = require('mongoose');
const collections = require('./collectionNames');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        // https://github.com/shinnn/github-username-regex
        const githubLoginRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,38}$/i;
        return githubLoginRegex.test(val);
      },
    },
  },
  githubID: {
    type: String,
    required: true,
  },
  avatar: String,
});

// -- INSTANCE METHODS -- //

// gets the Connection documents that belong to the User instance
UserSchema.methods.ownedConnections = function ownedConnections() {
  return this.model(collections.Connection).find({ ownerID: this.id });
};

// gets the Connection documents that the User instance has joined as a partner
UserSchema.methods.joinedConnections = function joinedConnections() {
  return this.model(collections.Connection).find({ partnerID: this.id });
};

module.exports = { User: mongoose.model(collections.User, UserSchema) };
