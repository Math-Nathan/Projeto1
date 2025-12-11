import axios from 'axios';

// ==================== CONFIGURAÇÃO ====================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || false; // Ativar com VITE_USE_MOCK=true

// ==================== MOCK DATA ====================

class MockStorage {
  constructor() {
    this.clientes = [
      { id_cliente_PK: 1, nome: "João Silva", email: "joao@email.com", telefone: "(61) 99999-9999", cpf: "123.456.789-00" },
      { id_cliente_PK: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(61) 88888-8888", cpf: "987.654.321-00" }
    ];
    
    this.sessoes = [
      { id_sessao_PK: 1, data: "2025-12-15", horario: "14:30", descricao: "Avaliação inicial", id_cliente_FK: 1, status: "confirmado" },
      { id_sessao_PK: 2, data: "2025-12-16", horario: "10:00", descricao: "Sessão de acompanhamento", id_cliente_FK: 2, status: "pendente" }
    ];
    
    this.nextClienteId = 3;
    this.nextSessaoId = 3;
  }

  // CLIENTES
  createCliente(data) {
    const novoCliente = {
      id_cliente_PK: this.nextClienteId++,
      ...data,
      data_criacao: new Date().toISOString()
    };
    this.clientes.push(novoCliente);
    return { id: novoCliente.id_cliente_PK, ...novoCliente };
  }

  getAllClientes() {
    return this.clientes;
  }

  getClienteById(id) {
    return this.clientes.find(c => c.id_cliente_PK === parseInt(id));
  }

  updateCliente(id, data) {
    const index = this.clientes.findIndex(c => c.id_cliente_PK === parseInt(id));
    if (index !== -1) {
      this.clientes[index] = { ...this.clientes[index], ...data };
      return this.clientes[index];
    }
    return null;
  }

  deleteCliente(id) {
    const index = this.clientes.findIndex(c => c.id_cliente_PK === parseInt(id));
    if (index !== -1) {
      this.clientes.splice(index, 1);
      return true;
    }
    return false;
  }

  // SESSÕES
  createSessao(data) {
    const novaSessao = {
      id_sessao_PK: this.nextSessaoId++,
      ...data,
      status: data.status || 'pendente',
      data_criacao: new Date().toISOString()
    };
    this.sessoes.push(novaSessao);
    return { id: novaSessao.id_sessao_PK, ...novaSessao };
  }

  getAllSessoes() {
    // Adiciona nome_cliente em cada sessão
    return this.sessoes.map(sessao => {
      const cliente = this.getClienteById(sessao.id_cliente_FK);
      return {
        ...sessao,
        nome_cliente: cliente ? cliente.nome : 'Desconhecido'
      };
    });
  }

  getSessaoById(id) {
    const sessao = this.sessoes.find(s => s.id_sessao_PK === parseInt(id));
    if (!sessao) return null;
    const cliente = this.getClienteById(sessao.id_cliente_FK);
    return {
      ...sessao,
      nome_cliente: cliente ? cliente.nome : 'Desconhecido'
    };
  }

  getSessoesByClienteId(id_cliente) {
    return this.sessoes
      .filter(s => s.id_cliente_FK === parseInt(id_cliente))
      .map(sessao => {
        const cliente = this.getClienteById(sessao.id_cliente_FK);
        return {
          ...sessao,
          nome_cliente: cliente ? cliente.nome : 'Desconhecido'
        };
      });
  }

  updateSessao(id, data) {
    const index = this.sessoes.findIndex(s => s.id_sessao_PK === parseInt(id));
    if (index !== -1) {
      this.sessoes[index] = { ...this.sessoes[index], ...data };
      const cliente = this.getClienteById(this.sessoes[index].id_cliente_FK);
      return {
        ...this.sessoes[index],
        nome_cliente: cliente ? cliente.nome : 'Desconhecido'
      };
    }
    return null;
  }

  deleteSessao(id) {
    const index = this.sessoes.findIndex(s => s.id_sessao_PK === parseInt(id));
    if (index !== -1) {
      this.sessoes.splice(index, 1);
      return true;
    }
    return false;
  }
}

const mockStorage = new MockStorage();

// ==================== AXIOS INSTANCE ====================

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de resposta
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

// ==================== HELPER PARA DELAY ====================

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== SESSÕES (Agendamentos) ====================

export const sessaoAPI = {
  // Criar nova sessão/agendamento
  create: async (sessaoData) => {
    try {
      if (USE_MOCK) {
        await delay(500); // Simular latência
        const result = mockStorage.createSessao(sessaoData);
        return {
          message: 'Sessão criada com sucesso',
          id: result.id,
          data: result
        };
      }
      const response = await api.post('/sessoes', sessaoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao criar sessão' };
    }
  },

  // Obter todas as sessões
  getAll: async () => {
    try {
      if (USE_MOCK) {
        await delay(300);
        const sessoes = mockStorage.getAllSessoes();
        return {
          message: 'Sessões recuperadas com sucesso',
          data: sessoes
        };
      }
      const response = await api.get('/sessoes');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar sessões' };
    }
  },

  // Obter sessão por ID
  getById: async (id) => {
    try {
      if (USE_MOCK) {
        await delay(300);
        const sessao = mockStorage.getSessaoById(id);
        if (!sessao) throw new Error('Sessão não encontrada');
        return {
          message: 'Sessão recuperada com sucesso',
          data: sessao
        };
      }
      const response = await api.get(`/sessoes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar sessão' };
    }
  },

  // Obter sessões por cliente
  getByClienteId: async (id_cliente) => {
    try {
      if (USE_MOCK) {
        await delay(300);
        const sessoes = mockStorage.getSessoesByClienteId(id_cliente);
        return {
          message: 'Sessões do cliente recuperadas com sucesso',
          data: sessoes
        };
      }
      const response = await api.get(`/sessoes/cliente/${id_cliente}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar sessões do cliente' };
    }
  },

  // Atualizar sessão
  update: async (id, sessaoData) => {
    try {
      if (USE_MOCK) {
        await delay(400);
        const sessao = mockStorage.updateSessao(id, sessaoData);
        if (!sessao) throw new Error('Sessão não encontrada');
        return {
          message: 'Sessão atualizada com sucesso',
          data: sessao
        };
      }
      const response = await api.put(`/sessoes/${id}`, sessaoData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar sessão' };
    }
  },

  // Deletar sessão
  delete: async (id) => {
    try {
      if (USE_MOCK) {
        await delay(300);
        const success = mockStorage.deleteSessao(id);
        if (!success) throw new Error('Sessão não encontrada');
        return {
          message: 'Sessão deletada com sucesso'
        };
      }
      const response = await api.delete(`/sessoes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao deletar sessão' };
    }
  },
};

// ==================== CLIENTES ====================

export const clienteAPI = {
  // Criar novo cliente
  create: async (clienteData) => {
    try {
      if (USE_MOCK) {
        await delay(500);
        const result = mockStorage.createCliente(clienteData);
        return {
          message: 'Cliente criado com sucesso',
          id: result.id_cliente_PK,
          data: result
        };
      }
      const response = await api.post('/clientes', clienteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao criar cliente' };
    }
  },

  // Obter todos os clientes
  getAll: async () => {
    try {
      if (USE_MOCK) {
        await delay(300);
        const clientes = mockStorage.getAllClientes();
        return {
          message: 'Clientes recuperados com sucesso',
          data: clientes
        };
      }
      const response = await api.get('/clientes');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar clientes' };
    }
  },

  // Obter cliente por ID
  getById: async (id) => {
    try {
      if (USE_MOCK) {
        await delay(300);
        const cliente = mockStorage.getClienteById(id);
        if (!cliente) throw new Error('Cliente não encontrado');
        return {
          message: 'Cliente recuperado com sucesso',
          data: cliente
        };
      }
      const response = await api.get(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar cliente' };
    }
  },

  // Atualizar cliente
  update: async (id, clienteData) => {
    try {
      if (USE_MOCK) {
        await delay(400);
        const cliente = mockStorage.updateCliente(id, clienteData);
        if (!cliente) throw new Error('Cliente não encontrado');
        return {
          message: 'Cliente atualizado com sucesso',
          data: cliente
        };
      }
      const response = await api.put(`/clientes/${id}`, clienteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao atualizar cliente' };
    }
  },

  // Deletar cliente
  delete: async (id) => {
    try {
      if (USE_MOCK) {
        await delay(300);
        const success = mockStorage.deleteCliente(id);
        if (!success) throw new Error('Cliente não encontrado');
        return {
          message: 'Cliente deletado com sucesso'
        };
      }
      const response = await api.delete(`/clientes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao deletar cliente' };
    }
  },
};

// ==================== HEALTH CHECK ====================

export const healthAPI = {
  // Verificar saúde da API
  check: async () => {
    try {
      if (USE_MOCK) {
        await delay(200);
        return {
          message: 'API está funcionando (MOCK)',
          timestamp: new Date(),
          mode: 'MOCK'
        };
      }
      const response = await api.get('/health', { baseURL: 'http://localhost:3000' });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'API indisponível' };
    }
  },
};

// ==================== STATUS ====================

export const apiStatus = {
  useMock: () => USE_MOCK,
  getMode: () => USE_MOCK ? 'MOCK (Teste sem banco)' : 'REAL (Conectado ao backend)',
  getMockStorage: () => mockStorage, // Para debug
};

export default api;
