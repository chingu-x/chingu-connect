const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  github_id: String,
  avatar: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
