import {
  registrarPedido,
  buscarUnidadePorId,
  buscarProdutoPorUnidade,
  buscarPedidos
} from '#repositories/pedidos.repository.js';

const CANAIS_VALIDOS = [
  'APP',
  'TOTEM',
  'BALCAO',
  'PICKUP',
  'WEB'
];

const criarPedido = async (idUsuario, pedido) => {
  const { idUnidade, canalPedido, itens } = pedido;

  if (!idUsuario || !idUnidade || !canalPedido || !itens?.length) {
    throw new Error('Dados obrigatórios do pedido não informados!');
  }

  if (!CANAIS_VALIDOS.includes(canalPedido)) {
    throw new Error('Canal do pedido inválido!');
  }

  const unidade = await buscarUnidadePorId(idUnidade);

  if (!unidade) {
    throw new Error('Unidade não encontrada!');
  }

  for (const item of itens) {
    if (!item.idProduto || !Number.isInteger(item.quantidade) || item.quantidade <= 0) {
      throw new Error('Item do pedido inválido!');
    }

    const produto = await buscarProdutoPorUnidade(
      idUnidade,
      item.idProduto
    );

    if (!produto) {
      throw new Error('Produto não encontrado nesta unidade!');
    }

    if (!produto.flg_disponivel) {
      throw new Error('Produto indisponível!');
    }

    if (produto.qt_produto < item.quantidade) {
      throw new Error('Estoque insuficiente!');
    }
  }

  return registrarPedido(idUsuario, idUnidade, canalPedido, itens);
};

const consultarPedidos = async (idUsuario, canalPedido) => {
  
  const canalInvalido = canalPedido && !CANAIS_VALIDOS.includes(canalPedido)
  if (canalInvalido) {
    throw new Error('Canal do pedido inválido!');
  }

  const pedidos = await buscarPedidos(
    idUsuario,
    canalPedido
  );

  return pedidos;
};

export {
  criarPedido,
  consultarPedidos
};
