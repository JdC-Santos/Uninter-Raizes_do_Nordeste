import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { buscarPorEmail } from '#repositories/clientes.repository.js';

const autenticar = async (email, senha) => {

  const campoNaoInformado = !email || !senha;

  if (campoNaoInformado) {
    throw new Error('E-mail e senha são obrigatórios!');
  }

  const usuario = await buscarPorEmail(email);

  if (!usuario) {
    throw new Error('E-mail ou senha inválidos!');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.ds_senha);

  if (!senhaValida) {
    throw new Error('E-mail ou senha inválidos!');
  }

  if (!usuario.flg_ativo) {
    throw new Error('Usuário inativo!');
  }

  const payload = {
    idUsuario: usuario.id_usuario,
    perfil: usuario.cd_perfil,
    idUnidade: usuario.id_unidade
  };

  const token = jwt.sign(payload,process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return {
    token
  };
};

export {
  autenticar
};
