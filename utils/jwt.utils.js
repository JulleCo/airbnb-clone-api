const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SIGN_SECRET = process.env.JWT_SECRET_LICORNE;

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      role: userData.role
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '4h'
    })
  },

  parseAuthorization: function(authorization) {
    console.log("#1", authorization)
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },

  getUserId: function(authorization, response) {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);
    console.log("#2", token)
    console.log("#2,5", userId)

    if(token) {
      console.log("#3", token)
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        console.log("#3,5", jwtToken)
        if(!jwtToken) {
          console.log("#4", token)
          return response.status(401).json({error : "Problème: pour accéder au jwtToken"})
        }
        console.log("#4,5", userId)
        userId = jwtToken.userId;
      }
      catch (err) {
        return response.status(401).json({error : 'Problème : le token est invalide'})
      }   
    }
    console.log("#5", userId)
    return userId;
  }, 

  getUserRole : function(authorization) {
    let role = null ;
    const token = module.exports.parseAuthorization(authorization);
    console.log("#7", role, token)
    if(token) {
      console.log("#8", role)
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        console.log("#9", jwtToken)
        if(!jwtToken) {
          console.log("#10", jwtToken)
          return response.status(401).json({error : "Problème: pour accéder au jwtToken"})
        }
        role = jwtToken.role;
      }
      catch (err) {
        return response.status(401).json({error : 'Problème : le token est invalide'})
      } 
    }
    console.log("#11", role)
    return role;
  }
}