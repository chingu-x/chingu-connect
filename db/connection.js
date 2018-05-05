const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  partnerID: {
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

// gets the owner (User) document of the Connection instance
ConnectionSchema.methods.getOwner = function getOwner() {
  return this.model('User').findById(this.ownerID);
};

// gets the partner (User) document of the Connection instance
ConnectionSchema.methods.getPartner = function getPartner() {
  return this.model('User').findById(this.partnerID);
};

module.exports = { Connection: mongoose.model('Connection', ConnectionSchema) };
