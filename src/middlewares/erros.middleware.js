const tratarErros = (error, req, res, next) => {
  const status = error.status || 400;

  return res.status(status).json({
    error: error.code || 'ERRO_REQUISICAO',
    message: error.message || 'Ocorreu um erro ao processar a requisição.',
    details: error.details || [],
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
};

export {
  tratarErros
};