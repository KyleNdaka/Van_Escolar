const express = require('express');
const router = express.Router();
const responsavelController = require('../controllers/responsavelController');

router.get('/', responsavelController.listar);
router.post('/', responsavelController.cadastrar);
router.put('/:id', responsavelController.atualizar);     
router.delete('/:id', responsavelController.deletar);  

module.exports = router;