const supabase = require('../db');

const TABLE = 'sessao';

class SessaoModel {
  // Converte várias formas de data para o formato DATE (YYYY-MM-DD)
  _formatDate(dateInput) {
    if (!dateInput) return null;
    const toDate = (d) => {
      const yy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yy}-${mm}-${dd}`;
    };

    if (dateInput instanceof Date) return toDate(dateInput);

    if (typeof dateInput === 'string') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) return dateInput;

      const parsed = new Date(dateInput);
      if (!Number.isNaN(parsed.getTime())) {
        const yyyy = parsed.getUTCFullYear();
        const mm = String(parsed.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(parsed.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      }

      const parts = dateInput.split(/[/\-.]/);
      if (parts.length === 3) {
        if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2,'0')}-${parts[2].padStart(2,'0')}`;
        return `${parts[2].padStart(4,'0')}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
      }
    }

    return null;
  }

  async create(sessao) {
    const { descricao, data, horario, id_cliente_FK } = sessao;
    const dataFormatada = this._formatDate(data);
    const { data: created, error } = await supabase
      .from(TABLE)
      .insert([{ descricao, data: dataFormatada, horario, id_cliente_fk: id_cliente_FK }])
      .select('*')
      .single();

    if (error) throw new Error(error.message);
    return created;
  }

  async getAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('id_sessao_pk', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id_sessao_pk', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.details?.includes('Results contain 0 rows')) return null;
      throw new Error(error.message);
    }
    return data;
  }

  async getByClienteId(id_cliente) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id_cliente_fk', id_cliente)
      .order('id_sessao_pk', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async update(id, sessao) {
    const { descricao, data, horario, id_cliente_FK } = sessao;
    const dataFormatada = this._formatDate(data);
    const { data: updated, error } = await supabase
      .from(TABLE)
      .update({ descricao, data: dataFormatada, horario, id_cliente_fk: id_cliente_FK })
      .eq('id_sessao_pk', id)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.details?.includes('Results contain 0 rows')) return null;
      throw new Error(error.message);
    }
    return updated;
  }

  async delete(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id_sessao_pk', id)
      .select('id_sessao_pk');

    if (error) throw new Error(error.message);
    return { affectedRows: data?.length || 0 };
  }
}

module.exports = new SessaoModel();
