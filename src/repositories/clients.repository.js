import db from '#infra/database.js';

const createCliente= async (cliente) => {
  const queryCampos = '(nm_usuario, ds_email, ds_senha, nr_cpf, cd_perfil, flg_ativo, qt_pontos)';
  const queryValues = '(?,?,?,?, "CLIENTE", 1, 0)'
  const query = `INSERT INTO tb_usuario ${queryCampos} VALUES ${queryValues}`;

  const valores = [
    cliente.nome,
    cliente.email,
    cliente.senha,
    cliente.CPF
  ];

  const [result] = await db.execute(query, valores);

  return result.insertId;
}

const findByEmail = async (email) => {
  const query = "SELECT * FROM tb_usuario WHERE ds_email = ?";
  const [rows] = await db.execute(query, [email]);
  const registroComEmail = rows[0];

  return registroComEmail;
}

const findByCPF = async (CPF) => {
  const query = "SELECT * FROM tb_usuario WHERE nr_cpf = ?";
  const [rows] = await db.execute(query, [CPF]);
  const registroComCPF = rows[0];

  return registroComCPF;
}

export {
  findByEmail,
  findByCPF,
  createCliente
}

