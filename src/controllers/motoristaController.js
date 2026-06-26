const db = require('../config/database');

const motoristaController = {
  // 1. Cadastrar Motorista
  cadastrar: async (req, res) => {
    try {
      const { nome, cnh, telefone, email, senha_hash } = req.body;

      // Validação de campos obrigatórios de acordo com seu SQL
      if (!nome || !cnh || !email || !senha_hash) {
        return res.status(400).json({ error: 'Os campos nome, cnh, email e senha_hash são obrigatórios.' });
      }

      const query = 'INSERT INTO motoristas (nome, cnh, telefone, email, senha_hash) VALUES (?, ?, ?, ?, ?)';
      const [result] = await db.query(query, [nome, cnh, telefone, email, senha_hash]);

      return res.status(201).json({
        message: 'Motorista cadastrado com sucesso! 🚐',
        id_motorista: result.insertId
      });

    } catch (err) {
      console.error('Erro ao cadastrar motorista:', err);

      // Trata duplicidade de CNH ou Email (Campos UNIQUE no seu banco)
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Esta CNH ou E-mail já está cadastrado!' });
      }

      return res.status(500).json({ error: 'Erro interno no servidor ao salvar o motorista.' });
    }
  },

  // 2. Listar todos os Motoristas
  listarTodos: async (req, res) => {
    try {
      const query = 'SELECT id_motorista, nome, cnh, telefone, email FROM motoristas';
      const [results] = await db.query(query);

      return res.status(200).json(results);

    } catch (err) {
      console.error('Erro ao listar motoristas:', err);
      return res.status(500).json({ error: 'Erro interno no servidor ao buscar motoristas.' });
    }
  }
};

module.exports = motoristaController;