import { Router } from 'express';
import { cadastrarCliente } from '#controllers/clientes.controller.js';

const rotas = Router();

/**
 * POST /clientes
 * @summary Cadastra um novo cliente
 * @tags Clientes
 * @description Cadastra um novo cliente no sistema.
 * @param {ClienteRequest} request.body.required - Dados do cliente
 * @returns {ClienteResponse201} 201 - Cliente cadastrado com sucesso.
 * @returns {Response400} 400 - Dados inválidos ou cliente já cadastrado.
 */
rotas.post('/', cadastrarCliente);

export default rotas;
