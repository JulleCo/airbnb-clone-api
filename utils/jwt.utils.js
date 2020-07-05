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
      expiresIn: '1h'
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

    //   try {
    //     const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
    //     console.log("#4", jwtToken)
    //     if (!jwtToken) {
    //       return response.status(401).json({
    //         error: 'Token null lors de la verification! ❌',
    //       });
    //     }
    //     console.log("#4,5", jwtToken.userId)

    //   userId = jwtToken.userId;
    //   } catch (e) {
    //     if (e instanceof jwt.JsonWebTokenError) {
    //       return response.status(401).json({
    //         error: 'Token invalide lors de la verification! ❌',
    //       });
    //     }
    //   }
    // }


      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        console.log("#3,4", jwtToken)
        if(!jwtToken) {
          console.log("#4", token)
          return response.status(401).json({error : "il y a un probleme"})
        }
        console.log("#4,5", userId)
        userId = jwtToken.userId;
      }
      // catch(err) { }
      catch (err) {
        return response.status(401).json({error : 'Connectez vous pour accéder à cette fonctionnalité'})
      }   
    }
    console.log("#5", userId)

    return userId;
  }, 

  // getUserRole : function(authorization) {
  //   const role = host ;
  //   const token = module.exports.parseAuthorization(authorization);
  //   if(token != null) {
  //     try {
  //       var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
  //       if(jwtToken != null)
  //         userRole = jwtToken.role;
  //     } catch(err) { }
  //       // catch(error) {"Vous n'avez pas les droits pour ajouter une fiche"}
  //   }
  //   return role;
  // }
}