import { Router } from 'express';
import { cadastrar } from '#controllers/clients.controller.js';

const router = Router();

/**
 * POST /clientes
 * @summary Cadastra um novo cliente
 * @tags Clientes
 * @description Cadastra um novo cliente no sistema.
 * @param {ClienteRequest} request.body.required - Dados do cliente
 * @returns {ClienteResponse201} 201 - Cliente cadastrado com sucesso.
 * @returns {Response400} 400 - Dados inválidos ou cliente já cadastrado.
 */
router.post('/', cadastrar);

export default router;