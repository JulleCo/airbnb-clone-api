const express = require('express');
const router = express.Router();

// const userRoute = require('./userRoute');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);


router.get('/', (req, res) => {
  res.json({message: 'Hello World'});
});

// Gestion des erreurs
router.use('*', (req, res) => {
  res.status(404).json({
    error: "Oupsy, you'r lost in wonderland !",
  });
});


// router.use(userRoute);

module.exports = router;