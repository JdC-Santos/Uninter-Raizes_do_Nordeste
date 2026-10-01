import db from '#infra/database.js';

const criarCliente = async (cliente) => {
  const query = `
    INSERT INTO tb_usuario (
      nm_usuario,
      ds_email,
      ds_senha,
      nr_cpf,
      cd_perfil,
      flg_ativo,
      qt_pontos
    ) VALUES (?,?,?,?, "CLIENTE", 1, 0)`;

  const valores = [
    cliente.nome,
    cliente.email,
    cliente.senha,
    cliente.CPF
  ];

  const [resultado] = await db.execute(query, valores);

  return resultado.insertId;
};

const buscarPorEmail = async (email) => {
  const query = 'SELECT * FROM tb_usuario WHERE ds_email = ?';
  const [registros] = await db.execute(query, [email]);

  return registros[0];
};

const buscarPorCPF = async (CPF) => {
  const query = 'SELECT * FROM tb_usuario WHERE nr_cpf = ?';
  const [registros] = await db.execute(query, [CPF]);

  return registros[0];
};

export {
  buscarPorEmail,
  buscarPorCPF,
  criarCliente
};
