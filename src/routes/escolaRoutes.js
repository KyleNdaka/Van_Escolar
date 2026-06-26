const express = require('express');
const router = express.Router();
const escolaController = require('../controllers/escolaController');

// Definição das rotas para /api/escolas
router.post('/', escolaController.cadastrar);
router.get('/', escolaController.listarTodas);

module.exports = router;