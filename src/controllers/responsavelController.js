const db = require('../config/database');
const bcrypt = require('bcrypt');

const responsavelController = {
    // 1. CONSULTA (READ)
    listar: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT id_responsavel, nome, cpf, telefone, email FROM responsaveis');
            return res.json(rows);
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao buscar responsáveis.' });
        }
    },

    // 2. INCLUSÃO (CREATE)
    cadastrar: async (req, res) => {
        try {
            const { nome, cpf, telefone, email, senha_hash } = req.body;

            if (!nome || !cpf || !email || !senha_hash) {
                return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
            }

            // Criptografa a senha antes de salvar
            const saltRounds = 10;
            const hash = await bcrypt.hash(senha_hash, saltRounds);

            const query = 'INSERT INTO responsaveis (nome, cpf, telefone, email, senha_hash) VALUES (?, ?, ?, ?, ?)';
            const [result] = await db.query(query, [nome, cpf, telefone, email, hash]);

            return res.status(201).json({ 
                message: 'Responsável cadastrado com segurança! 🔒👤', 
                id_responsavel: result.insertId 
            });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'E-mail ou CPF já cadastrado.' });
            }
            return res.status(500).json({ error: 'Erro ao cadastrar responsável.' });
        }
    },

    // 3. ALTERAÇÃO (UPDATE)
    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, cpf, telefone, email } = req.body;

            const query = 'UPDATE responsaveis SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id_responsavel = ?';
            const [result] = await db.query(query, [nome, cpf, telefone, email, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Responsável não encontrado.' });
            }

            return res.json({ message: 'Responsável atualizado com sucesso! 📝' });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao atualizar responsável.' });
        }
    },

    // 4. EXCLUSÃO (DELETE)
    deletar: async (req, res) => {
        try {
            const { id } = req.params;

            const query = 'DELETE FROM responsaveis WHERE id_responsavel = ?';
            const [result] = await db.query(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Responsável não encontrado.' });
            }

            return res.json({ message: 'Responsável excluído com sucesso! ❌' });
        } catch (err) {
            return res.status(500).json({ error: 'Erro ao excluir responsável.' });
        }
    }
};

module.exports = responsavelController;