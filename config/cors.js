const cors = require('cors');

module.exports = cors({
  origin: [
    'http://localhost:8008',
  ],
  methods: ['GET', 'POST'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200,
});
