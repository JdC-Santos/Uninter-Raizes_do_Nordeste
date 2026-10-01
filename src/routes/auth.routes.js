import { Router } from 'express';
import { login } from '#controllers/auth.controller.js';

const router = Router();

/**
 * POST /auth/login
 * @summary Autentica um usuário
 * @tags Autenticação
 * @description Autentica o usuário e retorna um token JWT.
 * @param {LoginRequest} request.body.required - Credenciais do usuário
 * @returns {LoginResponse200} 200 - Usuário autenticado com sucesso.
 * @returns {Response401} 401 - Credenciais inválidas.
 */
router.post('/login', login);

export default router;