const express = require('express');
// require('dotenv').config();
const router = require('./routes');
const morgan = require('morgan');

const server = express();
server.use('/api', router);

server.use(morgan('dev'))

const port = 8000;

server.listen(port, () => {
  console.log(`Serveur demarre dans le port ${port}`);
});

module.exports = server;