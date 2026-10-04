/**
 * Dados para autenticação do usuário.
 * @typedef {object} LoginRequest
 * @property {string} email.required - E-mail do usuário
 * @property {string} senha.required - Senha do usuário
 */

/**
 * Autenticação realizada com sucesso.
 * @typedef {object} LoginResponse200
 * @property {string} token - Token JWT de autenticação
 */