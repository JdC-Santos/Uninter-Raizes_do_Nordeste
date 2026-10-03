import { autenticar } from '#services/auth.service.js';

const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const resultado = await autenticar(email, senha);

    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export {
  login
};