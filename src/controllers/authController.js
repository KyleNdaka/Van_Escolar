const db = require('../config/database');
const bcrypt = require('bcrypt');

const authController = {
  loginResponsavel: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // 1. Validação básica
      if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      }

      // 2. Busca o usuário no banco pelo e-mail
      const query = 'SELECT * FROM responsaveis WHERE email = ?';
      const [results] = await db.query(query, [email]);

      if (results.length === 0) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
      }

      const usuario = results[0];

      // 3. Compara a senha digitada com o hash do banco
      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

      if (!senhaValida) {
        return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
      }

      // Login efetuado com sucesso!
      return res.status(200).json({
        message: 'Login realizado com sucesso! 🎉',
        usuario: {
          id: usuario.id_responsavel,
          nome: usuario.nome,
          email: usuario.email
        }
      });

    } catch (err) {
      console.error('Erro no login:', err);
      return res.status(500).json({ error: 'Erro interno no servidor ao tentar logar.' });
    }
  }
};

module.exports = authController;