const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Mapeamento dos endpoints para o CRUD de Alunos
router.post('/alunos', alunoController.cadastrar);
router.get('/alunos', alunoController.listarTodos);
router.get('/alunos/:id', alunoController.buscarPorId);
router.put('/alunos/:id', alunoController.atualizar);
router.delete('/alunos/:id', alunoController.excluir);

module.exports = router;
