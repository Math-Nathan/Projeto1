const express = require('express');
const sessaoController = require('../controllers/sessaoController');

const router = express.Router();

// Rotas para Sessão
router.post('/', sessaoController.create.bind(sessaoController));
router.get('/', sessaoController.getAll.bind(sessaoController));
router.get('/:id', sessaoController.getById.bind(sessaoController));
router.get('/cliente/:id_cliente', sessaoController.getByClienteId.bind(sessaoController));
router.put('/:id', sessaoController.update.bind(sessaoController));
router.delete('/:id', sessaoController.delete.bind(sessaoController));

module.exports = router;
