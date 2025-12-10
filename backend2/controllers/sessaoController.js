const sessaoModel = require('../models/sessaoModel');
const clienteModel = require('../models/clienteModel');

class SessaoController {
  async create(req, res) {
    try {
      const sessao = req.body;
      
      // Validar se cliente existe quando fornecido
      if (sessao.id_cliente_FK) {
        const cliente = await clienteModel.getById(sessao.id_cliente_FK);
        if (!cliente) {
          return res.status(404).json({
            error: 'Cliente não encontrado'
          });
        }
      }
      
      const created = await sessaoModel.create(sessao);
      res.status(201).json({
        message: 'Sessão criada com sucesso',
        id: created?.id_sessao_pk,
        data: created
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao criar sessão',
        message: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const sessoes = await sessaoModel.getAll();
      res.status(200).json({
        message: 'Sessões recuperadas com sucesso',
        data: sessoes
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao recuperar sessões',
        message: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const sessao = await sessaoModel.getById(id);
      
      if (!sessao) {
        return res.status(404).json({
          error: 'Sessão não encontrada'
        });
      }
      
      res.status(200).json({
        message: 'Sessão recuperada com sucesso',
        data: sessao
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao recuperar sessão',
        message: error.message
      });
    }
  }

  async getByClienteId(req, res) {
    try {
      const { id_cliente } = req.params;
      
      // Validar se cliente existe
      const cliente = await clienteModel.getById(id_cliente);
      if (!cliente) {
        return res.status(404).json({
          error: 'Cliente não encontrado'
        });
      }
      
      const sessoes = await sessaoModel.getByClienteId(id_cliente);
      res.status(200).json({
        message: 'Sessões do cliente recuperadas com sucesso',
        data: sessoes
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao recuperar sessões do cliente',
        message: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const sessao = req.body;
      
      const sessaoExistente = await sessaoModel.getById(id);
      if (!sessaoExistente) {
        return res.status(404).json({
          error: 'Sessão não encontrada'
        });
      }
      
      // Validar se cliente existe quando fornecido
      if (sessao.id_cliente_FK) {
        const cliente = await clienteModel.getById(sessao.id_cliente_FK);
        if (!cliente) {
          return res.status(404).json({
            error: 'Cliente não encontrado'
          });
        }
      }
      
      const updated = await sessaoModel.update(id, sessao);
      res.status(200).json({
        message: 'Sessão atualizada com sucesso',
        affectedRows: updated ? 1 : 0,
        data: updated
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao atualizar sessão',
        message: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      
      const sessaoExistente = await sessaoModel.getById(id);
      if (!sessaoExistente) {
        return res.status(404).json({
          error: 'Sessão não encontrada'
        });
      }
      
      const result = await sessaoModel.delete(id);
      res.status(200).json({
        message: 'Sessão deletada com sucesso',
        affectedRows: result.affectedRows
      });
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao deletar sessão',
        message: error.message
      });
    }
  }
}

module.exports = new SessaoController();
