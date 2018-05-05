const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  githubID: String,
  avatar: String,
});

// -- INSTANCE METHODS -- //

// gets the Connection documents that belong to the User instance
UserSchema.methods.ownedConnections = function ownedConnections() {
  return this.model('Connection').find({ ownerID: this.id });
};

// gets the Connection documents that the User instance has joined as a partner
UserSchema.methods.joinedConnections = function joinedConnections() {
  return this.model('Connection').find({ partnerID: this.id });
};

module.exports = { User: mongoose.model('User', UserSchema) };
