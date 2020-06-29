/* eslint-disable no-console */
/* eslint-disable eol-last */
const express = require('express');
require('dotenv').config();
const router = require('./routes');

const server = express();
server.use(router);

const port = 3000;

server.listen(port, () => {
  console.log(`Serveur demarre dans le port ${port}`);
});

module.exports = server;