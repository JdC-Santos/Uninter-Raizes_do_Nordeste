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