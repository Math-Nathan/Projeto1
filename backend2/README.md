# Clínica BeMove - Backend API

Backend completo com CRUD para gerenciar Clientes e Sessões da Clínica BeMove.

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=clinica_bemove
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

## Executar

```bash
# Desenvolvimento com nodemon
npm run dev

# Produção
npm start
```

## Endpoints

### Cliente

- **POST** `/api/clientes` - Criar novo cliente
- **GET** `/api/clientes` - Listar todos os clientes
- **GET** `/api/clientes/:id` - Obter cliente por ID
- **PUT** `/api/clientes/:id` - Atualizar cliente
- **DELETE** `/api/clientes/:id` - Deletar cliente

### Sessão

- **POST** `/api/sessoes` - Criar nova sessão
- **GET** `/api/sessoes` - Listar todas as sessões
- **GET** `/api/sessoes/:id` - Obter sessão por ID
- **GET** `/api/sessoes/cliente/:id_cliente` - Obter sessões de um cliente
- **PUT** `/api/sessoes/:id` - Atualizar sessão
- **DELETE** `/api/sessoes/:id` - Deletar sessão

## Exemplos de Requisição

### Criar Cliente
```json
POST /api/clientes
{
  "nome": "João Silva",
  "cpf": "12345678901",
  "telefone": "11987654321",
  "email": "joao@email.com"
}
```

### Criar Sessão
```json
POST /api/sessoes
{
  "descricao": "Sessão de fisioterapia",
  "data": "2025-12-15",
  "horario": "14:30:00",
  "id_cliente_FK": 1
}
```

## Estrutura do Projeto

```
backend2/
├── models/              # Modelos de dados
│   ├── clienteModel.js
│   └── sessaoModel.js
├── controllers/         # Lógica de negócio
│   ├── clienteController.js
│   └── sessaoController.js
├── routes/              # Endpoints
│   ├── clienteRoute.js
│   └── sessaoRoute.js
├── app.js               # Aplicação principal
├── db.js                # Configuração de banco de dados
├── package.json
└── .env.example
```

## Tratamento de Erros

Todos os endpoints retornam respostas padronizadas em JSON com mensagens de erro descritivas.
