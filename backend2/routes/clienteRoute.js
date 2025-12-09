const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

// Rotas para Cliente
router.post('/', clienteController.create.bind(clienteController));
router.get('/', clienteController.getAll.bind(clienteController));
router.get('/:id', clienteController.getById.bind(clienteController));
router.put('/:id', clienteController.update.bind(clienteController));
router.delete('/:id', clienteController.delete.bind(clienteController));

module.exports = router;
