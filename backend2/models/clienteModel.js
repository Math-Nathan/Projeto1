const supabase = require('../db');

const TABLE = 'cliente';

class ClienteModel {
  async create(cliente) {
    const { nome, cpf, telefone, email } = cliente;
    const { data, error } = await supabase
      .from(TABLE)
      .insert([{ nome, cpf, telefone, email }])
      .select('*')
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('id_cliente_pk', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id_cliente_pk', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.details?.includes('Results contain 0 rows')) return null;
      throw new Error(error.message);
    }
    return data;
  }

  async update(id, cliente) {
    const { nome, cpf, telefone, email } = cliente;
    const { data, error } = await supabase
      .from(TABLE)
      .update({ nome, cpf, telefone, email })
      .eq('id_cliente_pk', id)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.details?.includes('Results contain 0 rows')) return null;
      throw new Error(error.message);
    }
    return data;
  }

  async delete(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id_cliente_pk', id)
      .select('id_cliente_pk');

    if (error) throw new Error(error.message);
    return { affectedRows: data?.length || 0 };
  }
}

module.exports = new ClienteModel();
