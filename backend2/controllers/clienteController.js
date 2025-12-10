const clienteModel = require('../models/clienteModel');

class ClienteController {
  async create(req, res) {
    try {
      const cliente = req.body;
      const created = await clienteModel.create(cliente);
      res.status(201).json({
        message: 'Cliente criado com sucesso',
        id: created?.id_cliente_pk,
        data: created
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao criar cliente',
        message: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const clientes = await clienteModel.getAll();
      res.status(200).json({
        message: 'Clientes recuperados com sucesso',
        data: clientes
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao recuperar clientes',
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await clienteModel.getById(id);
      
      if (!cliente) {
        return res.status(404).json({
          error: 'Cliente não encontrado'
        });
      }
      
      res.status(200).json({
        message: 'Cliente recuperado com sucesso',
        data: cliente
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao recuperar cliente',
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const cliente = req.body;
      
      const clienteExistente = await clienteModel.getById(id);
      if (!clienteExistente) {
        return res.status(404).json({
          error: 'Cliente não encontrado'
        });
      }
      
      const updated = await clienteModel.update(id, cliente);
      res.status(200).json({
        message: 'Cliente atualizado com sucesso',
        affectedRows: updated ? 1 : 0,
        data: updated
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao atualizar cliente',
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      
      const clienteExistente = await clienteModel.getById(id);
      if (!clienteExistente) {
        return res.status(404).json({
          error: 'Cliente não encontrado'
        });
      }
      
      const result = await clienteModel.delete(id);
      res.status(200).json({
        message: 'Cliente deletado com sucesso',
        affectedRows: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao deletar cliente',
        message: error.message
      });
    }
  }
}

module.exports = new ClienteController();
