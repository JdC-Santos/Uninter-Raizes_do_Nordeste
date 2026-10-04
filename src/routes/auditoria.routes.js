import { Router } from 'express';

import { listarAuditorias } from '#controllers/auditoria.controller.js';
import { autenticarToken } from '#middlewares/auth.middleware.js';
import { autorizarPerfis } from '#middlewares/autorizacao.middleware.js';

const rotas = Router();

/**
 * GET /auditoria/
 * @summary Consulta os registros de auditoria
 * @tags Auditoria
 * @description Retorna os registros de auditoria do sistema. A consulta é permitida apenas para administradores.
 * @security BearerAuth
 * @returns {array<object>} 200 - Registros de auditoria encontrados.
 * @returns {Response401} 401 - Token não informado, inválido ou expirado.
 * @returns {Response403} 403 - Usuário sem permissão para consultar os registros de auditoria.
 */
rotas.get('/', autenticarToken, autorizarPerfis('ADMIN'), listarAuditorias );

export default rotas;