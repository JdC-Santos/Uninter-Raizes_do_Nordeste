import jwt from 'jsonwebtoken';

const autenticarToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    const error = new Error('Token não informado!');
    error.status = 401;
    error.code = 'NAO_AUTENTICADO';
    return next(error);
  }

  const [tipo, token] = authorization.split(' ');

  const tokenInvalido = tipo !== 'Bearer' || !token;

  if (tokenInvalido) {
    const error = new Error('Token inválido ou expirado!');
    error.status = 401;
    error.code = 'TOKEN_INVALIDO';
    return next(error);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload;

    return next();

  } catch (err) {
    let error = new Error('Token inválido ou expirado!');
    error.status = 401;
    error.code = 'TOKEN_INVALIDO';
    return next(error);
  }
};

export {
  autenticarToken
};