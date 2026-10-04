import {
  registrarAuditoria,
  buscarAuditorias
} from '#repositories/auditoria.repository.js';

const registrar = async (idUsuario, acao) => {
  if (!idUsuario || !acao) {
    return;
  }

  await registrarAuditoria(idUsuario, acao);
};

const buscarTodas = async () => {
  return await buscarAuditorias();
};

export {
  registrar,
  buscarTodas
};