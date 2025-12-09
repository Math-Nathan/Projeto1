// Configuração da API para o frontend React
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Função genérica para fazer requisições
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Erro ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

// ============ CLIENTE ============

export const clienteAPI = {
  // Criar novo cliente
  create: (cliente) =>
    apiRequest('/clientes', {
      method: 'POST',
      body: JSON.stringify(cliente),
    }),

  // Obter todos os clientes
  getAll: () =>
    apiRequest('/clientes', {
      method: 'GET',
    }),

  // Obter cliente por ID
  getById: (id) =>
    apiRequest(`/clientes/${id}`, {
      method: 'GET',
    }),

  // Atualizar cliente
  update: (id, cliente) =>
    apiRequest(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cliente),
    }),

  // Deletar cliente
  delete: (id) =>
    apiRequest(`/clientes/${id}`, {
      method: 'DELETE',
    }),
};

// ============ SESSÃO ============

export const sessaoAPI = {
  // Criar nova sessão
  create: (sessao) =>
    apiRequest('/sessoes', {
      method: 'POST',
      body: JSON.stringify(sessao),
    }),

  // Obter todas as sessões
  getAll: () =>
    apiRequest('/sessoes', {
      method: 'GET',
    }),

  // Obter sessão por ID
  getById: (id) =>
    apiRequest(`/sessoes/${id}`, {
      method: 'GET',
    }),

  // Obter sessões por cliente
  getByClienteId: (id_cliente) =>
    apiRequest(`/sessoes/cliente/${id_cliente}`, {
      method: 'GET',
    }),

  // Atualizar sessão
  update: (id, sessao) =>
    apiRequest(`/sessoes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sessao),
    }),

  // Deletar sessão
  delete: (id) =>
    apiRequest(`/sessoes/${id}`, {
      method: 'DELETE',
    }),
};

export default {
  clienteAPI,
  sessaoAPI,
};
