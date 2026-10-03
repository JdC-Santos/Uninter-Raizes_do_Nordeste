const autorizarPerfis = (...perfisPermitidos) => {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      const error = new Error('Usuário sem permissão para realizar esta operação!');
      error.status = 403;
      error.code = 'ACESSO_NEGADO';
      return next(error);
    }

    next();
  };
};

export {
  autorizarPerfis
};