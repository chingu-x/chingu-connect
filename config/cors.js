const cors = require('cors');

module.exports = cors({
  origin: true,
  methods: ['GET', 'POST'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200,
});
