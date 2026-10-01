/**
 * Item de um pedido.
 * @typedef {object} PedidoItem
 * @property {integer} idProduto.required - ID do produto
 * @property {integer} quantidade.required - Quantidade do produto
 */

/**
 * Dados necessários para criar um pedido.
 * @typedef {object} PedidoRequest
 * @property {integer} idUnidade.required - ID da unidade
 * @property {string} canalPedido.required - Canal do pedido - enum:APP,TOTEM,BALCAO,PICKUP,WEB
 * @property {array<PedidoItem>} itens.required - Itens do pedido
 */

/**
 * Resposta da criação de um pedido.
 * @typedef {object} PedidoResponse201
 * @property {integer} idPedido - ID do pedido criado
 * @property {number} valorTotal - Valor total do pedido
 */

/**
 * Resposta para uma requisição sem autenticação válida.
 * @typedef {object} Response401
 * @property {string} error - Descrição do erro
 */
