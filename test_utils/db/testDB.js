require('dotenv').config();
const mongoose = require('mongoose');

class TestDB {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) return;
    await mongoose.connect(
      process.env.TEST_DB_URI,
      (err) => { if (err) console.error(err); },
    );
    this.connection = mongoose.connection;
  }

  async disconnect() {
    if (!this.connection) return;
    await this.connection.close((err) => { if (err) console.error(err); });
    this.connection = null;
  }
}

module.exports = TestDB;
