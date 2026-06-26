const db = require('../config/database');
const bcrypt = require('bcrypt'); // Importa o bcrypt

const responsavelController = {
  // 1. Cadastrar um novo Responsável com senha segura
  cadastrar: async (req, res) => {
    try {
      const { nome, cpf, telefone, email, senha_hash } = req.body;

      if (!nome || !cpf || !email || !senha_hash) {
        return res.status(400).json({ error: 'Os campos nome, cpf, email e senha_hash são obrigatórios.' });
      }

      // Criptografa a senha antes de mandar para o banco (10 é o nível de segurança)
      const senhaCriptografada = await bcrypt.hash(senha_hash, 10);

      const query = 'INSERT INTO responsaveis (nome, cpf, telefone, email, senha_hash) VALUES (?, ?, ?, ?, ?)';
      
      // Guardamos a 'senhaCriptografada' no lugar da senha original
      const [result] = await db.query(query, [nome, cpf, telefone, email, senhaCriptografada]);
      
      return res.status(201).json({ 
        message: 'Responsável cadastrado com segurança! 🧑‍💻🔐', 
        id_responsavel: result.insertId 
      });

    } catch (err) {
      console.error('Erro ao cadastrar responsável:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Este CPF ou E-mail já está cadastrado no sistema!' });
      }
      return res.status(500).json({ error: 'Erro interno no servidor ao salvar.' });
    }
  },

  // 2. Listar todos os Responsáveis
  listarTodos: async (req, res) => {
    try {
      const query = 'SELECT id_responsavel, nome, cpf, telefone, email FROM responsaveis';
      const [results] = await db.query(query);
      return res.status(200).json(results);
    } catch (err) {
      console.error('Erro ao listar responsáveis:', err);
      return res.status(500).json({ error: 'Erro interno no servidor ao buscar.' });
    }
  }
};

module.exports = responsavelController;