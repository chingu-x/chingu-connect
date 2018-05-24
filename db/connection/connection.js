const mongoose = require('mongoose');
const collections = require('../collectionNames');

const ConnectionSchema = new mongoose.Schema({
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
    type: Date,
    default: Date.now,
  },
  lifespan: {
    type: Number,
    required: true,
    validate: {
      validator: val => val <= 8 && val >= 1,
    },
  },
});

// -- MIDDLEWARE -- //
function ownerDifferentFromPartner(next) {
  // ===== Need to compare string types as Mongoose's ObjectIDs are objects themselves ===== //
  if (this.ownerID.toString() !== this.partnerID.toString()) return next();

  const { ValidationError, ValidatorError } = mongoose.Error;
  const error = new ValidationError(this);
  error.errors.ownerID = new ValidatorError({
    message: 'Owner can not be same as partner',
    path: 'ownerID',
    type: 'notvalid',
    value: this.ownerID,
    reason: 'Attempt to save new Connection document with ownerID matching partnerID',
  });
  // ===== If this fails, then we want to throw so Mongoose will catch it ===== //
  throw new Error(error);
}

/**
 * Should throw an error if somebody attempts to add themselves
 * into a connection that already has a partner
 */
function hasPartner(next) {
  if (!this.partnerID) return next();
  throw new Error('Connection has an existing partner');
}

ConnectionSchema.pre('save', ownerDifferentFromPartner);
ConnectionSchema.pre('save', hasPartner);

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
