import { Router } from 'express';
import { autenticarToken } from '#middlewares/auth.middleware.js';
import {
  cadastrarPedido,
  consultarPedidos
} from '#controllers/pedidos.controller.js';

const rotas = Router();

/**
 * POST /pedidos/
 * @summary Cria um novo pedido
 * @tags Pedidos
 * @description Valida os produtos, grava o pedido e seus itens e atualiza o estoque.
 * @security BearerAuth
 * @param {PedidoRequest} request.body.required - Dados do pedido
 * @returns {PedidoResponse201} 201 - Pedido criado com sucesso.
 * @returns {Response400} 400 - Dados do pedido inválidos.
 * @returns {Response401} 401 - Token não informado, inválido ou expirado.
 */
rotas.post('/', autenticarToken, cadastrarPedido);

/**
 * GET /pedidos/
 * @summary Consulta os pedidos do usuário
 * @tags Pedidos
 * @description Retorna os pedidos do usuário autenticado, permitindo filtrar pelo canal do pedido.
 * @security BearerAuth
 * @param {string} canalPedido.query - Canal do pedido (APP, TOTEM, BALCAO, PICKUP ou WEB)
 * @returns {array<PedidoResponse>} 200 - Pedidos encontrados.
 * @returns {Response400} 400 - Canal do pedido inválido.
 * @returns {Response401} 401 - Token não informado, inválido ou expirado.
 */
rotas.get('/', autenticarToken, consultarPedidos);

export default rotas;
