import { autenticar } from '#services/auth.service.js';

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const resultado = await autenticar(email, senha);

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(401).json({
      error: error.message
    });
  }
};

export {
  login
};