const models = require('../models');

module.exports = {
    getCities: (request, response) => {
        console.log("#1")
        models.City.findAll({
                attributes: ['name', 'id'],
            })
            .then((citiesFound) => {
                console.log("#2")
                return response.status(200).json(citiesFound)
            })
            .catch((error) => {
                console.log("#3")
                return response.status(500).json({
                    'error': "Impossible d'afficher les villes"
                })
            })
    }
}