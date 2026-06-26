const express = require('express');
const router = express.Router();
const motoristaController = require('../controllers/motoristaController');

// Rotas para /api/motoristas
router.post('/', motoristaController.cadastrar);
router.get('/', motoristaController.listarTodos);

module.exports = router;