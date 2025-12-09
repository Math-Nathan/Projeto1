const pool = require('../db');

class ClienteModel {
  async create(cliente) {
    const { nome, cpf, telefone, email } = cliente;
    const [result] = await pool.query(
      'INSERT INTO Cliente (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)',
      [nome, cpf, telefone, email]
    );
    return result;
  }

  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Cliente');
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Cliente WHERE id_cliente_PK = ?', [id]);
    return rows[0];
  }

  async update(id, cliente) {
    const { nome, cpf, telefone, email } = cliente;
    const [result] = await pool.query(
      'UPDATE Cliente SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id_cliente_PK = ?',
      [nome, cpf, telefone, email, id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM Cliente WHERE id_cliente_PK = ?', [id]);
    return result;
  }
}

module.exports = new ClienteModel();
