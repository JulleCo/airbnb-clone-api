const express = require('express');
const router = express.Router();

// ----- routes model USER
const userController = require('../controllers/userController');
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

// ----- routes model PLACE
const placeController = require('../controllers/placeController');
router.post('/places', placeController.addPlace);
router.get('/places', placeController.getPlaces);

// ----- route Cities
const cityController = require('../controllers/cityController');
router.get('/cities', cityController.getCities);

// ----- route HOME
router.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

// Gestion des erreurs
router.use('*', (req, res) => {
  res.status(404).json({
    error: "Oupsy, you'r lost in wonderland !",
  });
});

module.exports = router;