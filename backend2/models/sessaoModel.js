const pool = require('../db');

class SessaoModel {
  // Converte várias formas de data para o formato MySQL DATE (YYYY-MM-DD)
  _formatDateForMySQL(dateInput) {
    if (!dateInput) return null;
    // Se já for Date
    const toDate = (d) => {
      const yy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yy}-${mm}-${dd}`;
    };

    if (dateInput instanceof Date) {
      return toDate(dateInput);
    }

    if (typeof dateInput === 'string') {
      // Se já estiver no formato YYYY-MM-DD, retorne diretamente (evita shift por fuso)
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        return dateInput;
      }

      // Aceita formatos como '2024-04-11T03:00:00.000Z' ou outras ISO
      // Tenta converter para Date e extrair a parte de data (usando UTC para evitar shifts)
      const parsed = new Date(dateInput);
      if (!Number.isNaN(parsed.getTime())) {
        // Extrai parte UTC para garantir que timestamps com Z sejam tratados corretamente
        const yyyy = parsed.getUTCFullYear();
        const mm = String(parsed.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(parsed.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      }

      // Se for algo como '11/04/2024', tentar rearranjar (DD/MM/YYYY)
      const parts = dateInput.split(/[\/\-\.]/);
      if (parts.length === 3) {
        // detectar ordem: se primeiro tem 4 dígitos, é YYYY-MM-DD
        if (parts[0].length === 4) {
          return `${parts[0]}-${parts[1].padStart(2,'0')}-${parts[2].padStart(2,'0')}`;
        }
        // assumimos DD/MM/YYYY
        return `${parts[2].padStart(4,'0')}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
      }
    }

    return null;
  }
  async create(sessao) {
    const { descricao, data, horario, id_cliente_FK } = sessao;
    const dataFormatada = this._formatDateForMySQL(data);
    const [result] = await pool.query(
      'INSERT INTO Sessao (descricao, data, horario, id_cliente_FK) VALUES (?, ?, ?, ?)',
      [descricao, dataFormatada, horario, id_cliente_FK]
    );
    return result;
  }

  async getAll() {
    const [rows] = await pool.query(
      `SELECT s.*, c.nome AS nome_cliente
       FROM Sessao s
       LEFT JOIN Cliente c ON s.id_cliente_FK = c.id_cliente_PK`
    );
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT s.*, c.nome AS nome_cliente
       FROM Sessao s
       LEFT JOIN Cliente c ON s.id_cliente_FK = c.id_cliente_PK
       WHERE s.id_sessao_PK = ?`,
      [id]
    );
    return rows[0];
  }

  async getByClienteId(id_cliente) {
    const [rows] = await pool.query(
      `SELECT s.*, c.nome AS nome_cliente
       FROM Sessao s
       LEFT JOIN Cliente c ON s.id_cliente_FK = c.id_cliente_PK
       WHERE s.id_cliente_FK = ?`,
      [id_cliente]
    );
    return rows;
  }

  async update(id, sessao) {
    const { descricao, data, horario, id_cliente_FK } = sessao;
    const dataFormatada = this._formatDateForMySQL(data);
    const [result] = await pool.query(
      'UPDATE Sessao SET descricao = ?, data = ?, horario = ?, id_cliente_FK = ? WHERE id_sessao_PK = ?',
      [descricao, dataFormatada, horario, id_cliente_FK, id]
    );
    return result;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM Sessao WHERE id_sessao_PK = ?', [id]);
    return result;
  }
}

module.exports = new SessaoModel();
