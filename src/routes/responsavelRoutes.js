const express = require('express');
const router = express.Router();
const responsavelController = require('../controllers/responsavelController');

// Rota para cadastrar responsável
router.post('/responsaveis', responsavelController.cadastrar);

// Rota para listar todos os responsáveis
router.get('/responsaveis', responsavelController.listarTodos);

module.exports = router;