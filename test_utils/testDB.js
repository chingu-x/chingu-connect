require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const testDB = {
  connection: null,

  connect(report = false) {
    if (this.connection) return;

    mongoose.connect(process.env.TEST_DB_URI);
    this.connection = mongoose.connection;
    if (report) console.log('connected to test DB');
  },

  disconnect(report = false) {
    if (!this.connection) return;

    this.connection.close();
    this.connection = null;
    if (report) console.log('disconnected from test DB');
  },
};

module.exports = testDB;
