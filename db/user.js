const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
});

const User = model('User', UserSchema);

module.exports = User;
