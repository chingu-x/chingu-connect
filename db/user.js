const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  github_id: String,
  avatar: String,
});

// -- INSTANCE METHODS -- //
UserSchema.methods.ownedConnections = function ownedConnections() {
  return this.model('Connection').find({ owner_id: this.id });
};

UserSchema.methods.joinedConnections = function joinedConnections() {
  return this.model('Connection').find({ partner_id: this.id });
};

module.exports = { User: mongoose.model('User', UserSchema) };
