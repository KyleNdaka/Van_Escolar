const db = require('../config/database');

const escolaController = {
  // 1. Cadastrar uma nova Escola
  cadastrar: async (req, res) => {
    try {
      const { nome_escola, endereco_escola, telefone_escola } = req.body;

      // Validação: nome e endereço são obrigatórios de acordo com o seu SQL
      if (!nome_escola || !endereco_escola) {
        return res.status(400).json({ error: 'Os campos nome_escola e endereco_escola são obrigatórios.' });
      }

      const query = 'INSERT INTO escolas (nome_escola, endereco_escola, telefone_escola) VALUES (?, ?, ?)';
      const [result] = await db.query(query, [nome_escola, endereco_escola, telefone_escola]);

      return res.status(201).json({
        message: 'Escola cadastrada com sucesso! 🏫',
        id_escola: result.insertId
      });

    } catch (err) {
      console.error('Erro ao cadastrar escola:', err);
      return res.status(500).json({ error: 'Erro interno no servidor ao salvar a escola.' });
    }
  },

  // 2. Listar todas as Escolas
  listarTodas: async (req, res) => {
    try {
      const query = 'SELECT * FROM escolas';
      const [results] = await db.query(query);

      return res.status(200).json(results);

    } catch (err) {
      console.error('Erro ao listar escolas:', err);
      return res.status(500).json({ error: 'Erro interno no servidor ao buscar as escolas.' });
    }
  }
};

module.exports = escolaController;