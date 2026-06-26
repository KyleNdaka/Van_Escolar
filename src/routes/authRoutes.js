const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de login do responsável
router.post('/login', authController.loginResponsavel);

module.exports = router;