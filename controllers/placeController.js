const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const authRoleMdlw = require('../middleware/roleMiddleware');

module.exports = {
    addPlace: (request, response) => {
        console.log("#0")
        const place = {
            idCity: request.body.idCity,
            idUser: request.body.idUser,
            name: request.body.name,
            description: request.body.description,
            rooms: request.body.rooms,
            bathrooms: request.body.bathrooms,
            maxGuests: request.body.maxGuests,
            priceByNight: request.body.priceByNight,
        };

        console.log(place.description)

        // const headerAuth = request.headers['authorization'];
        // const userId = jwtUtils.getUserId(headerAuth, response);
        // const role = jwtUtils.getUserRole(headerAuth);

        // if (userId < 0) {
        //     console.log("#6", userId)
        //     return response.status(401).json({
        //         'error': 'Connectez vous pour accéder à cette fonctionnalité'
        //     })
        // }

        // if (role !== 'host') {
        //     console.log("#7,5", role)
        //     return response.status(403).json({
        //         'error': "Vous n'avez pas les droits pour ajouter une fiche"
        //     })
        // }
        // console.log("#12", role)


        for (const key in place) {
            if (place[key] == null) {
                return response.status(400).json({
                    'error': `Le champs ${key} n'est pas rempli`
                });
            }
        }
        // condition string ou number strictement


        models.Places.findOne({
                attributes: ['name'],
                where: {
                    name: place.name
                },
            })
            .then((placeFound) => {
                console.log("#13", placeFound)
                if (!placeFound) {
                    console.log("#14", placeFound)
                    console.log("#14,5", place.name)
                    const newPlace = models.Places.create({
                            idCity: place.idCity,
                            idUser: place.idUser,
                            name: place.name,
                            description: place.description,
                            rooms: place.rooms,
                            bathrooms: place.bathrooms,
                            maxGuests: place.maxGuests,
                            priceByNight: place.priceByNight
                        })
                        .then((newPlace) => {
                            console.log("#14,8", place.name)
                            // console.log("#15", newPlace)
                            return response.status(201).json({
                                // id: ,
                                // city: ,
                                name: newPlace.name,
                                description: newPlace.description,
                                rooms: newPlace.rooms,
                                bathrooms: newPlace.bathrooms,
                                maxGuests: newPlace.maxGuests,
                                priceByNight: newPlace.priceByNight
                            })
                        })
                        .catch((error) => {
                            console.log("#15,5", newPlace)
                            // console.log(error)
                            return response.status(500).json({
                                'error': "Impossible d'ajouter cette fiche"
                            })
                        })
                } else {
                    return response.status(409).json({
                        'error': 'Place déjà référencée dans la base de donnée!'
                    })
                }
            })
            .catch((error) => {
                return response.status(500).json({
                    'error': "Impossible de vérifier si la fiche de ce lieu existe déjà"
                })
            })
    },
    getPlaces: (request, response) => {
        console.log("#20")
        models.Places.findAll({
                attributes: ['name'],
            })
            .then((placesFound) => {
                console.log("#21")
                return response.status(200).json(placesFound)
            })
            .catch((error) => {
                console.log("#22")
                return response.status(500).json({
                    'error': "Impossible d'afficher les fiches"
                })
            })
    }
}