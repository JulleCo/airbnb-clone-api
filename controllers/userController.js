const Users = require('../models/users');
// const { Json } = require('sequelize/types/lib/utils');


module.exports = {
    signup: (request, response) => {
        // const NewUser = New User(request.body);
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

        if (user.lastName == null || user.firstName == null){
            return response.status(400).Json({error: "Il manque des info !"});
        }
        // ----- ajouter condition "doit etre une chaine de caractère"
        if (emailRegex.test(user.email) || user.email == null){
            return response.status(400).Json({error: "Email non valide"})
        }
        if (passwordRegex.test(user.password)){
            return response.status(400).Json({error : "Le mot de passe doit faire entre 6 et 20 caractères, et avoir au minimum : 1 chiffre, une lettre majuscule, une lettre minuscule."})
        }
        if (user.role !== ('host' || 'tourist')){
            return response.status(400).Json({error : "Veuillez choisir votre mode d'utilisation"})
        }

        // ---- si tous les champs sont rempli correctement : ok ou deja existant
        // Users.findOne({
        //     attributes: ['email'],
        //     where: { email: user.email },
        // })

    } 
}




// -------- Input 
// {
//   "role": string,
//   "first_name": string,
//   "last_name": string,
//   "email": string,
//   "password": string
// }

// -------- Output 
// {
//   "role": "host",
//   "first_name": "Laurent",
//   "last_name": "Jade",
//   "email": "laurent@jade.fr"
// }

// 201 - Si la requête est un succès (nouvelle donnée créée en base)
// 400 - S'il y a une erreur dans l'input
// 409 - Si un utilisateur avec le même email exite déjà en base