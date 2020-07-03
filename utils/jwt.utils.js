const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SIGN_SECRET = 'hkdssfjfdisjoezpopzccdsioqcqlqpzoiefoskcl767456jhffjfdhhj9654323235677ncjdhfjke';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  }
}