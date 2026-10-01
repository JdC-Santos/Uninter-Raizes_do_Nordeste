import jwt from 'jsonwebtoken';

const autenticarToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: 'Token não informado!'
    });
  }

  const [tipo, token] = authorization.split(' ');

  const tokenInvalido = tipo !== 'Bearer' || !token;

  if (tokenInvalido) {
    return res.status(401).json({
      error: 'Token inválido!'
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload;

    return next();

  } catch (error) {

    return res.status(401).json({
      error: 'Token inválido ou expirado!'
    });
    
  }
};

export {
  autenticarToken
};