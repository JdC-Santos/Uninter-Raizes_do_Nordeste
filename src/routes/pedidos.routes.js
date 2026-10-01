import { Router } from 'express';
import { cadastrarPedido } from '#controllers/pedidos.controller.js';
import { autenticarToken } from '../../middlewares/auth.middleware.js';

const rotas = Router();

/**
 * POST /pedidos/cadastrar
 * @summary Cria um novo pedido
 * @tags Pedidos
 * @description Valida os produtos, grava o pedido e seus itens e atualiza o estoque.
 * @security BearerAuth
 * @param {PedidoRequest} request.body.required - Dados do pedido
 * @returns {PedidoResponse201} 201 - Pedido criado com sucesso.
 * @returns {Response400} 400 - Dados do pedido inválidos.
 * @returns {Response401} 401 - Token não informado, inválido ou expirado.
 */
rotas.post('/cadastrar', autenticarToken, cadastrarPedido);

export default rotas;
