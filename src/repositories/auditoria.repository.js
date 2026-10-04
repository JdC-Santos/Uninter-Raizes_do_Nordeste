import db from '#infra/database.js';

const registrarAuditoria = async (idUsuario, acao) => {
  const sql = `
    INSERT INTO tb_auditoria (id_usuario, ds_acao)
    VALUES (?, ?)
  `;

  const [resultado] = await db.execute(sql, [idUsuario, acao]);

  return resultado.insertId;
}

const buscarAuditorias = async () => {
  const sql = `
    SELECT
      id_auditoria,
      id_usuario,
      ds_acao,
      dt_criacao
    FROM tb_auditoria
    ORDER BY dt_criacao DESC
  `;

  const [auditorias] = await db.execute(sql);

  return auditorias;
}

export {
  registrarAuditoria,
  buscarAuditorias
}
