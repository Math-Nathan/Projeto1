require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clienteRoute = require('./routes/clienteRoute');
const sessaoRoute = require('./routes/sessaoRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - CORS e JSON parsing configurados

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas
app.use('/api/clientes', clienteRoute);
app.use('/api/sessoes', sessaoRoute);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.status(200).json({
    message: 'API está funcionando',
    timestamp: new Date()
  });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`CORS habilitado para: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});

module.exports = app;
