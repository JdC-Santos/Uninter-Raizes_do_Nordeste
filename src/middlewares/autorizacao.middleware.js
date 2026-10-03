const autorizarPerfis = (...perfisPermitidos) => {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        error: 'Usuário sem permissão para realizar esta operação!'
      });
    }

    next();
  };
};

export {
  autorizarPerfis
};