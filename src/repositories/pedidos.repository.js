import db from '#infra/database.js';

const buscarUnidadePorId = async (idUnidade) => {
  const query = `
    SELECT *
    FROM tb_unidade
    WHERE id_unidade = ?
  `;

  const [registros] = await db.execute(query, [idUnidade]);

  return registros[0];
};

const buscarProdutoPorUnidade = async (idUnidade, idProduto) => {
  const query = `
    SELECT
      p.id_produto,
      p.nm_produto,
      up.qt_produto,
      up.vl_produto,
      up.flg_disponivel
    FROM tb_produto p
    INNER JOIN tb_unidade_produto up
      ON up.tb_produto_id_produto = p.id_produto
    WHERE up.tb_unidade_id_unidade = ?
      AND p.id_produto = ?
  `;

  const [registros] = await db.execute(query, [
    idUnidade,
    idProduto
  ]);

  return registros[0];
};

const registrarPedido = async (idUsuario, idUnidade, canalPedido, itens) => {
  const conexao = await db.getConnection();

  try {
    await conexao.beginTransaction();

    let valorTotal = 0;

    for (const item of itens) {
      const produto = await buscarProdutoPorUnidade(
        idUnidade,
        item.idProduto
      );

      valorTotal += Number(produto.vl_produto) * item.quantidade;
    }

    const queryPedido = `
      INSERT INTO tb_pedido
        (id_unidade, id_usuario, cd_status, vl_total, cd_canal)
      VALUES (?, ?, 'AGU_PAG', ?, ?)
    `;

    const [resultadoPedido] = await conexao.execute(queryPedido, [
      idUnidade,
      idUsuario,
      valorTotal,
      canalPedido
    ]);

    const idPedido = resultadoPedido.insertId;

    for (const item of itens) {
      const produto = await buscarProdutoPorUnidade(
        idUnidade,
        item.idProduto
      );

      const queryItem = `
        INSERT INTO tb_item_pedido
          (id_pedido, id_produto, qt_produto, vl_unitario)
        VALUES (?, ?, ?, ?)
      `;

      await conexao.execute(queryItem, [
        idPedido,
        item.idProduto,
        item.quantidade,
        produto.vl_produto
      ]);

      const queryEstoque = `
        UPDATE tb_unidade_produto
        SET qt_produto = qt_produto - ?
        WHERE tb_unidade_id_unidade = ? AND tb_produto_id_produto = ?
      `;

      await conexao.execute(queryEstoque, [
        item.quantidade,
        idUnidade,
        item.idProduto
      ]);
    }

    await conexao.commit();

    return {
      idPedido,
      valorTotal
    };
  } catch (error) {
    await conexao.rollback();
    throw error;
  } finally {
    conexao.release();
  }
};

const buscarPedidos = async (idUsuario, canalPedido) => {
  let query = `
    SELECT *
    FROM tb_pedido
    WHERE id_usuario = ?
  `;

  const valores = [idUsuario];

  if (canalPedido) {
    query += ` AND cd_canal = ?`;
    valores.push(canalPedido);
  }

  query += ` ORDER BY dt_criacao DESC`;

  const [pedidos] = await db.execute(query, valores);

  return pedidos;
};

export {
  buscarUnidadePorId,
  buscarProdutoPorUnidade,
  registrarPedido,
  buscarPedidos
};
