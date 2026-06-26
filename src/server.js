const authRoutes = require('./routes/authRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const escolaRoutes = require('./routes/escolaRoutes');
const responsavelRoutes = require('./routes/responsavelRoutes');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const alunoRoutes = require('./routes/alunoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.json()); // Permite ler JSON enviado no corpo das requisições (req.body)

// Rotas da Aplicação
app.use('/api', alunoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/motoristas', motoristaRoutes);
app.use('/api/escolas', escolaRoutes);
app.use('/api', responsavelRoutes);

// Rota de teste do servidor
app.get('/', (req, res) => {
  res.send('Servidor do Rota Escolar rodando com sucesso! 🚐');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
