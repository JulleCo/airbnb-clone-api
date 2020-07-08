const jwtUtils = require('../utils/jwt.utils');

module.exports = (request, response, next) => {
    const headerAuth = request.headers['authorization'];
    const role = jwtUtils.getUserRole(headerAuth);
    const userId = jwtUtils.getUserId(headerAuth, response);

    if (userId < 0) {
        console.log("#6", userId)
        return response.status(401).json({
            'error': 'Connectez vous pour accéder à cette fonctionnalité'
        })
    }

    if (role !== 'host') {
        console.log("#7,5", role)
        return response.status(403).json({
            'error': "Vous n'avez pas les droits pour ajouter une fiche"
        })
    }
    console.log("#12", role)

    next()
}