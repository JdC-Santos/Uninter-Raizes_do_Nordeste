/**
 * Dados para simulação do pagamento.
 * @typedef {object} PagamentoRequest
 * @property {string} resultadoPagamento.required - Resultado simulado do pagamento - enum:APROVADO,NEGADO
 */

/**
 * Pagamento processado.
 * @typedef {object} PagamentoResponse201
 * @property {integer} idPagamento - ID do pagamento registrado
 * @property {string} status - Status do pagamento
 * @property {string} codigoTransacao - Código da transação simulada
 */

/**
 * Dados para atualização do status do pedido.
 * @typedef {object} StatusPedidoRequest
 * @property {string} status.required - Novo status - enum:EM_PREPARO,PRONTO,ENTREGUE
 */

/**
 * Status do pedido atualizado.
 * @typedef {object} StatusPedidoResponse
 * @property {integer} idPedido - ID do pedido
 * @property {string} status - Novo status do pedido
 */