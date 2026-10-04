import {
  buscarPedidoPorId,
  registrarPagamento,
  atualizarStatusPedido
} from '#repositories/pagamentos.repository.js';
import { registrar } from '#services/auditoria.service.js';

const processarPagamento = async (idPedido, resultadoPagamento, idUsuario) => {
  const pedido = await buscarPedidoPorId(idPedido);

  if (!pedido) {
    throw new Error('Pedido não encontrado!');
  }

  if (pedido.cd_status !== 'AGU_PAG') {
    throw new Error('Pedido não está aguardando pagamento!');
  }

  const resultadosValidos = ['APROVADO', 'NEGADO'];

  if (!resultadosValidos.includes(resultadoPagamento)) {
    throw new Error('Resultado do pagamento inválido!');
  }

  const codigoTransacao = `MOCK-${Date.now()}`;

  const idPagamento = await registrarPagamento(
    idPedido,
    pedido.vl_total,
    resultadoPagamento,
    codigoTransacao
  );

  if (resultadoPagamento === 'APROVADO') {
    await atualizarStatusPedido(idPedido, 'PAGO');
  }

  await registrar(
    idUsuario,
    `Processou o pagamento do pedido ${idPedido} com resultado ${resultadoPagamento}`
  );

  return {
    idPagamento,
    status: resultadoPagamento,
    codigoTransacao
  };
};

export {
  processarPagamento
};