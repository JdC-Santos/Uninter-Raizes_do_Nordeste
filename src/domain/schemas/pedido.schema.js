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

/**
 * Pedido retornado pela consulta.
 * @typedef {object} PedidoResponse
 * @property {integer} id_pedido - ID do pedido
 * @property {integer} id_unidade - ID da unidade
 * @property {integer} id_usuario - ID do usuário
 * @property {string} cd_status - Status do pedido
 * @property {number} vl_total - Valor total do pedido
 * @property {string} cd_canal - Canal do pedido
 * @property {string} dt_criacao - Data de criação
 * @property {string} dt_atualizacao - Data da última atualização
 */
