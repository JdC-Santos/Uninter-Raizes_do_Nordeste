import db from '#infra/database.js';

const buscarPedidoPorId = async (idPedido) => {
  const query = `
    SELECT *
    FROM tb_pedido
    WHERE id_pedido = ?
  `;

  const [registros] = await db.execute(query, [idPedido]);

  return registros[0];
};

const registrarPagamento = async (idPedido, valorPagamento, status, codigoTransacao) => {

  const query = `
    INSERT INTO tb_pagamento
      (id_pedido, vl_pagamento, cd_status, cd_transacao, dt_pagamento)
    VALUES (?, ?, ?, ?, NOW())
  `;

  const [resultado] = await db.execute(query, [
    idPedido,
    valorPagamento,
    status,
    codigoTransacao
  ]);

  return resultado.insertId;
};

const atualizarStatusPedido = async (idPedido, status) => {
  const query = `
    UPDATE tb_pedido
    SET cd_status = ?,
        dt_atualizacao = NOW()
    WHERE id_pedido = ?
  `;

  await db.execute(query, [status, idPedido]);
};

export {
  buscarPedidoPorId,
  registrarPagamento,
  atualizarStatusPedido
};