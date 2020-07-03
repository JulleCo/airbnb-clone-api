const models = require('../models');
const AuthJWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { Json } = require('sequelize/types/lib/utils');

module.exports =  {
    signup : (request, response) => {
        const user = {
            firstName: request.body.firstName,
            lastName: request.body.lastName, 
            email: request.body.email,
            password: request.body.password,
            role: request.body.role
        };

        // ---- erreur 400 ----
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/ ;

        for (const key in user) {
            if (user[key] == null) {
                return response.status(400).json({'error': `Le champs ${key} n'est pas rempli`});
            }
        }

        // ----- ajouter condition "doit etre une chaine de caractère"
        if (emailRegex.test(user.email) == false){
            return response.status(400).json({'error': "Email non valide"})
        }
        if (passwordRegex.test(user.password) == false){
            return response.status(400).json({'error' : "Le mot de passe doit faire entre 6 et 20 caractères, et avoir au minimum : 1 chiffre, une lettre majuscule, une lettre minuscule."})
        }
        if (user.role !== ('host' || 'tourist')){
            return response.status(400).json({'error' : "Veuillez choisir votre mode d'utilisation"})
        }
        // if (user.lastName == null || user.firstName == null) {
        //     return response.status(400).json({'error': "Il manque des info !"});
        // }
        
        // ---- si tous les champs sont rempli correctement : ok ou deja existant
        models.User.findOne({
            attributes: ['email'],
            where: { email: user.email },
        })
            .then((userFound) => {
                if(!userFound){
                    bcrypt.hash(user.password, 5, (error, bcryptedPassword) => {
                        const newUser = models.User.create({
                            firstName : user.firstName, 
                            lastName: user.lastName, 
                            email: user.email, 
                            password: bcryptedPassword, 
                            role : user.role
                        })
                        .then((newUser)=>{
                            return response.status(201).json({
                                firstName : newUser.firstName,
                                lastName : newUser.lastName,
                                email : newUser.email,
                                role : newUser.role
                            })
                        })
                        .catch((error) => {
                            return response.status(500).json({ 'error' : "Impossible d'ajouter l'utilisateur-ice"})
                        })
                    })
                } else{
                    return response.status(409).json({'error': 'Adresse mail déjà utilisée!'})
                }
            })
            .catch((error) => {
                return response.status(500).json({'error': "Impossible de vérifier l'utilisateur-ice" })
            })      
    },
    
    signin: (request, response) => {
        const user = {

        };

        // for (const key in user) {
        //     if (user[key] == null) {
        //         return response.status(400).json({'error': `Le champs ${key} n'est pas rempli`});
        //     }
        // }

        // if (email == null || password == null) {
        //     return res.status(400).json({ error: 'missing parameters' });
        //   }

        models.User.findOne({
            attributes: ['email'],
            where: { email: user.email },
        })
            .then(() => {

            })
            .catch((error) => {

            })
    }
}
