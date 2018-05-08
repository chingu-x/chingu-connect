const mongoose = require('mongoose');
const collections = require('./collectionNames');

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
    required: true,
    validate: {
      validator: val => val.length <= 140,
      msg: 'Tweet sized titles only!',
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: val => val.length <= 5000,
      msg: '5000 characters or less',
    },
  },
  timestamp: {
    type: String,
    default: String(Date.now()),
  },
  lifespan: {
    type: Number,
    required: true,
    validate: {
      validator: val => val <= 8 && val >= 1,
    },
  },
});

// -- INSTANCE METHODS -- //

// gets the owner (User) document of the Connection instance
ConnectionSchema.methods.getOwner = function getOwner() {
  return this.model(collections.User).findById(this.ownerID);
};

// gets the partner (User) document of the Connection instance
ConnectionSchema.methods.getPartner = function getPartner() {
  return this.model(collections.User).findById(this.partnerID);
};

module.exports = { Connection: mongoose.model(collections.Connection, ConnectionSchema) };
