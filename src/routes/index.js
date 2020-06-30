const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

// Gestion des erreurs
router.use('*', (req, res) => {
  res.status(404).json({
    error: "Oupsy, you'r lost in wonderland !",
  });
});

module.exports = router;