const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');


module.exports =  {
    addPlace: (request, response) => {
        const place = {
            // cityId : request.body.cityId,
            name: request.body.name,
            description: request.body.description,
            rooms: request.body.rooms,
            bathrooms: request.body.bathrooms,
            maxGuests: request.body.maxGuests,
            priceByNight: request.body.priceByNight,
            // available: array (date ISO 8601 string / UTC)
        };

        console.log(place.description)    

        const headerAuth = request.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth, response);
        // var userRole = jwtUtils.getUserRole(headerAuth);

        if (userId < 0) {
            console.log("#6", userId)
            return response.status(401).json({'error': 'Connectez vous pour accéder à cette fonctionnalité 2'})
        }

        // if (userRole !== host){
        //     return response.status(403).json({'error': "Vous n'avez pas les droits pour ajouter une fiche"})
        // }

        for (const key in place) {
            if (place[key] == null) {
                return response.status(400).json({'error': `Le champs ${key} n'est pas rempli`});
            }
        }
        // condition string ou number strictement


        models.Places.findOne({
            attributes: ['name'],
            where: { name: place.name },
        })
            .then((placeFound) => {
                if(!placeFound){
                    const newPlace = models.Places.create({
                        // cityId : place.cityId,
                        name: place.name,
                        description: place.description,
                        rooms: place.rooms,
                        bathrooms: place.bathrooms,
                        maxGuests: place.maxGuests,
                        priceByNight: place.priceByNight
                        // available: ,
                    })
                    .then((newPlace) => {
                        return response.status(201).json({
                            // id: ,
                            // city: ,
                            name: newPlace.name,
                            description: newPlace.description,
                            rooms: newPlace.rooms,
                            bathrooms: newPlace.bathrooms,
                            maxGuests: newPlace.maxGuests,
                            priceByNight: newPlace.priceByNight
                            // available: ,
                        })
                    })
                    .catch((error) => {
                        return response.status(500).json({ 'error' : "Impossible d'ajouter cette fiche"})
                    })
                } else{
                    return response.status(409).json({'error': 'Place déjà référencée dans la base de donnée!'})
                }
            })
            .catch((error) => {
                    return response.status(500).json({'error': "Impossible de vérifier si la fiche de ce lieu existe déjà" })
            })
                
    }
}