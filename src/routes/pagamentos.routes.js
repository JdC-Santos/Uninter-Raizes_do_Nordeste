import { Router } from 'express';
import {
  processarPagamento
} from '#controllers/pagamentos.controller.js';

import { autenticarToken } from '#middlewares/auth.middleware.js';

const router = Router();

/**
 * POST /pedidos/{id}/pagamento
 * @summary Processa o pagamento de um pedido
 * @tags Pagamentos
 * @description Simula o processamento do pagamento e registra o resultado.
 * @security BearerAuth
 * @param {integer} id.path.required - ID do pedido
 * @param {PagamentoRequest} request.body.required - Resultado simulado do pagamento
 * @returns {PagamentoResponse201} 201 - Pagamento processado com sucesso.
 * @returns {Response400} 400 - Pagamento inválido ou pedido não disponível para pagamento.
 * @returns {Response401} 401 - Token não informado, inválido ou expirado.
 */
router.post('/pedidos/:id/pagamento', autenticarToken, processarPagamento );

export default router;