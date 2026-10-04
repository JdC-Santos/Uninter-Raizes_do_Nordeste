import { buscarTodas } from '#services/auditoria.service.js';

const listarAuditorias = async (req, res, next) => {
  try {
    const auditorias = await buscarTodas();

    return res.status(200).json(auditorias);
  } catch (error) {
    next(error);
  }
};

export {
  listarAuditorias
};