const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');

const router = require('./routes');

const server = express();

server.use(morgan('dev'))

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


//appel des routes
server.use('/api', router);

// choix et ecoute du port
const port = 8001;

server.listen(port, () => {
  console.log(`Serveur demarre dans le port ${port}`);
});

module.exports = server;