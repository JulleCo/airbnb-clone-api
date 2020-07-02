// const User = require('../models/user');
const models = require('../models');
// const User = '../models/user'
// const { Json } = require('sequelize/types/lib/utils');

module.exports =  {
    signup : (request, response) => {
        const user = {
            role: request.body.role,
            firstName: request.body.firstName,
            lastName: request.body.lastName, 
            email: request.body.email,
            password: request.body.password
        };

        // ---- erreur 400 ----
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ; 
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/ ;

        if (user.lastName == null || user.firstName == null) {
            return response.status(400).json({'error': "Il manque des info !"});
        }
        // ----- ajouter condition "doit etre une chaine de caractère"
        if (emailRegex.test(user.email) == false || user.email == null){
            return response.status(400).json({'error': "Email non valide"})
        }
        if (passwordRegex.test(user.password) == false){
            return response.status(400).json({'error' : "Le mot de passe doit faire entre 6 et 20 caractères, et avoir au minimum : 1 chiffre, une lettre majuscule, une lettre minuscule."})
        }
        if (user.role !== ('host' || 'tourist')){
            return response.status(400).json({'error' : "Veuillez choisir votre mode d'utilisation"})
        }
        
// ---- si tous les champs sont rempli correctement : ok ou deja existant
        models.User.findOne({
            attributes: ['email'],
            where: { email: user.email },
        })
            .then((userFound) => {
                if(userFound == false){
                    // bcrypt password hash
                    const newUser = models.User.create({role, firstName, lastName, email, password})
                    .then((newUser)=>{
                        return response.status(201).json({newUser})
                    })
                    .catch((error) => {
                        return response.status(500).json({ 'error' : "Impossible d'ajouter l'utilisateur.ice"})
                    })
                } else{
                    return response.status(409).json({'error': 'Adresse mail déjà utilisée!'})
                }
            })
            .catch((error) => {
                return response.status(500).json({'error': "Impossible de vérifier l'utilisateur.ice" })
            })      
    }        
 }
