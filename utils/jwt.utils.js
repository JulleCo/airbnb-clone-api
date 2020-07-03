const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SIGN_SECRET = JWT_SECRET_LICORNE;

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h'
    })
  },