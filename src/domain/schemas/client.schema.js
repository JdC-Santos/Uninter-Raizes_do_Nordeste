/**
 * Dados necessários para cadastrar um cliente.
 * @typedef {object} ClienteRequest
 * @property {string} nome.required - Nome do cliente
 * @property {string} email.required - E-mail do cliente
 * @property {string} senha.required - Senha do cliente
 * @property {string} CPF.required - CPF do cliente
 */

/**
 * Resposta do cadastro de cliente.
 * @typedef {object} ClienteResponse201
 * @property {integer} id - ID do cliente cadastrado
 * @property {string} message - Mensagem de sucesso
 */

/**
 * Resposta de erro.
 * @typedef {object} Response400
 * @property {string} error - Descrição do erro
 */