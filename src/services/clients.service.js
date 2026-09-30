import bcrypt from 'bcrypt';
import { limparCPF, validarCPF } from '#domain/validators/cpf.validator.js';

import {
  createCliente,
  findByCPF,
  findByEmail
} from '#repositories/clients.repository.js';

const cadastrarCliente = async (cliente) => {

  const { nome, email, senha, CPF } = cliente;

  const umOuMaisCamposNaoInformados = !nome || !email || !senha || !CPF;

  if (umOuMaisCamposNaoInformados) {
    throw new Error("Campos obrigatórios não informados!");
  }

  const cpfLimpo = limparCPF(CPF);

  if (!validarCPF(cpfLimpo)) {
    throw new Error("CPF inválido!");
  }

  const usuarioComEmail = await findByEmail(email);
  if (usuarioComEmail) {
    throw new Error("E-mail já cadastrado!")
  }

  const usuarioComCPF = await findByCPF(cpfLimpo);
  if (usuarioComCPF) {
    throw new Error("CPF já cadastrado!");
  }

  const senhaPossuiMinCaracteres = senha.length >= 8;
  const senhaPossuiNumeros = /\d/.test(senha);
  const senhaPossuiCaracterEspecial = /[^a-zA-Z0-9]/.test(senha);

  const senhaValida = senhaPossuiMinCaracteres && senhaPossuiNumeros && senhaPossuiCaracterEspecial;

  if (!senhaValida) {
    throw new Error("A senha deve possuir pelo menos 8 caracteres, um número e um caractere especial!");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const clienteCadastro = {
    ...cliente,
    CPF: cpfLimpo,
    senha: senhaHash
  }

  const idCliente = await createCliente(clienteCadastro);

  return idCliente
}

export {
  cadastrarCliente
}