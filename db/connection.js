const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  partner_id: {
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

// -- INSTANCE METHODS -- //
ConnectionSchema.methods.getOwner = function () {
  return this.model('User').findById(this.owner_id);
};

ConnectionSchema.methods.getPartner = function () {
  return this.model('User').findById(this.partner_id);
};

module.exports = { Connection: mongoose.model('Connection', ConnectionSchema) };
