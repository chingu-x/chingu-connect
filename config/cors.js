const cors = require('cors');

module.exports = cors({
  origin: [
    'http://localhost:8008',
    'http://localhost:8080',
    'https://github.com',
  ],
  methods: ['GET', 'POST'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true,
  optionsSuccessStatus: 200,
});
