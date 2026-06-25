const db = require('../config/database');

const alunoController = {
  // 1. CREATE (Cadastrar Aluno - POST)
  async cadastrar(req, res) {
    try {
      const { nome_aluno, data_nascimento, id_responsavel, id_escola } = req.body;
      
      // Validação básica dos campos obrigatórios
      if (!nome_aluno || !id_responsavel || !id_escola) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
      }

      const sql = `INSERT INTO alunos (nome_aluno, data_nascimento, id_responsavel, id_escola) VALUES (?, ?, ?, ?)`;
      const [result] = await db.query(sql, [nome_aluno, data_nascimento, id_responsavel, id_escola]);

      return res.status(201).json({ 
        message: 'Aluno cadastrado com sucesso!', 
        id_aluno: result.insertId 
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // 2. READ (Consultar Alunos - GET)
  async listarTodos(req, res) {
    try {
      // Retorna os alunos trazendo também o nome da escola e do responsável (INNER JOIN)
      const sql = `
        SELECT a.id_aluno, a.nome_aluno, a.data_nascimento, r.nome AS nome_responsavel, e.nome_escola 
        FROM alunos a
        INNER JOIN responsaveis r ON a.id_responsavel = r.id_responsavel
        INNER JOIN escolas e ON a.id_escola = e.id_escola
      `;
      const [linhas] = await db.query(sql);
      return res.status(200).json(linhas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const sql = 'SELECT * FROM alunos WHERE id_aluno = ?';
      const [linhas] = await db.query(sql, [id]);

      if (linhas.length === 0) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
      }
      return res.status(200).json(linhas[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // 3. UPDATE (Alterar Aluno - PUT)
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome_aluno, data_nascimento, id_responsavel, id_escola } = req.body;

      const sql = `
        UPDATE alunos 
        SET nome_aluno = ?, data_nascimento = ?, id_responsavel = ?, id_escola = ? 
        WHERE id_aluno = ?
      `;
      const [result] = await db.query(sql, [nome_aluno, data_nascimento, id_responsavel, id_escola, id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Aluno não encontrado para atualização.' });
      }
      return res.status(200).json({ message: 'Dados do aluno atualizados com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // 4. DELETE (Excluir Aluno - DELETE)
  async excluir(req, res) {
    try {
      const { id } = req.params;
      const sql = 'DELETE FROM alunos WHERE id_aluno = ?';
      const [result] = await db.query(sql, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Aluno não encontrado para exclusão.' });
      }
      return res.status(200).json({ message: 'Aluno removido do transporte com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = alunoController;
