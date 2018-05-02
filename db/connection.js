const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    validate: {
      validator: val => val.length < 140,
      msg: 'Tweet sized titles only!',
    },
  },
  description: {
    type: String,
    validate: {
      validator: val => val.length < 5000,
      msg: '500 characters or less',
    },
  },
  timestamp: String,
  lifespan: Number,
});

const Connection = mongoose.model('Connection', ConnectionSchema);

module.exports = Connection;
