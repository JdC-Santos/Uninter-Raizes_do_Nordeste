import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../app.js';
import db from '#infra/database.js';

const tokenCliente = jwt.sign(
  {
    idUsuario: 1,
    perfil: 'CLIENTE',
    idUnidade: null
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

describe('Autenticação das rotas protegidas', () => {

  let estoqueOriginalProduto1;

  beforeAll(async () => {
    const [registros] = await db.query(
      `SELECT qt_produto
       FROM tb_unidade_produto
       WHERE tb_unidade_id_unidade = ?
         AND tb_produto_id_produto = ?`,
      [1, 1]
    );

    estoqueOriginalProduto1 = registros[0].qt_produto;

    await db.query(
      `UPDATE tb_unidade_produto
       SET qt_produto = ?
       WHERE tb_unidade_id_unidade = ?
         AND tb_produto_id_produto = ?`,
      [100, 1, 1]
    );
  });

  afterAll(async () => {
    await db.query(
      `UPDATE tb_unidade_produto
       SET qt_produto = ?
       WHERE tb_unidade_id_unidade = ?
         AND tb_produto_id_produto = ?`,
      [estoqueOriginalProduto1, 1, 1]
    );

    await db.end();
  });

  test('Deve retornar 401 ao acessar pedidos sem token', async () => {
    const resposta = await request(app)
      .get('/pedidos');

    expect(resposta.status).toBe(401);
    expect(resposta.body.error).toBe('NAO_AUTENTICADO');
  });

  test('Deve retornar 401 ao acessar pedidos com token inválido', async () => {
    const resposta = await request(app)
      .get('/pedidos')
      .set('Authorization', 'Bearer token-invalido');

    expect(resposta.status).toBe(401);
    expect(resposta.body.error).toBe('TOKEN_INVALIDO');
  });

  test('Deve retornar 403 quando cliente tentar atualizar status do pedido', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .patch('/pedidos/1/status')
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'EM_PREPARO'
      });

    expect(resposta.status).toBe(403);
    expect(resposta.body.error).toBe('ACESSO_NEGADO');
  });

  test('Deve retornar 400 ao consultar pedidos com canal inválido', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .get('/pedidos?canalPedido=INVALIDO')
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(400);
    expect(resposta.body.message).toBe('Canal do pedido inválido!');
  });

  test('Deve consultar pedidos filtrando por canal válido', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .get('/pedidos?canalPedido=WEB')
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test('Deve consultar os pedidos do usuário autenticado', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .get('/pedidos')
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  test('Deve criar um pedido válido', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 1,
            quantidade: 1
          }
        ]
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('idPedido');
    expect(resposta.body).toHaveProperty('valorTotal');
  });

  test('Deve rejeitar pedido com produto inexistente', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 999999,
            quantidade: 1
          }
        ]
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body.message).toBe('Produto não encontrado nesta unidade!');
  });

  test('Deve rejeitar pedido com estoque insuficiente', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 1,
            quantidade: 999999
          }
        ]
      });

    expect(resposta.status).toBe(400);
    expect(resposta.body.message).toBe('Estoque insuficiente!');
  });

  test('Deve aprovar o pagamento de um pedido', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const pedido = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 1,
            quantidade: 1
          }
        ]
      });

    expect(pedido.status).toBe(201);

    const resposta = await request(app)
      .post(`/pedidos/${pedido.body.idPedido}/pagamento`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        resultadoPagamento: 'APROVADO'
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body.status).toBe('APROVADO');
    expect(resposta.body).toHaveProperty('idPagamento');
    expect(resposta.body).toHaveProperty('codigoTransacao');
  });

  test('Deve registrar pagamento negado de um pedido', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const pedido = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 1,
            quantidade: 1
          }
        ]
      });

    expect(pedido.status).toBe(201);

    const resposta = await request(app)
      .post(`/pedidos/${pedido.body.idPedido}/pagamento`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        resultadoPagamento: 'NEGADO'
      });

    expect(resposta.status).toBe(201);
    expect(resposta.body.status).toBe('NEGADO');
    expect(resposta.body).toHaveProperty('idPagamento');
    expect(resposta.body).toHaveProperty('codigoTransacao');
  });

  test('Deve permitir que a cozinha atualize pedido pago para em preparo', async () => {
    const tokenCliente = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const tokenCozinha = jwt.sign(
      {
        idUsuario: 3,
        perfil: 'COZINHA',
        idUnidade: 1
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const pedido = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${tokenCliente}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 1,
            quantidade: 1
          }
        ]
      });

    expect(pedido.status).toBe(201);

    const pagamento = await request(app)
      .post(`/pedidos/${pedido.body.idPedido}/pagamento`)
      .set('Authorization', `Bearer ${tokenCliente}`)
      .send({
        resultadoPagamento: 'APROVADO'
      });

    expect(pagamento.status).toBe(201);

    const resposta = await request(app)
      .patch(`/pedidos/${pedido.body.idPedido}/status`)
      .set('Authorization', `Bearer ${tokenCozinha}`)
      .send({
        status: 'EM_PREPARO'
      });

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('EM_PREPARO');
  });

  it('deve realizar login com credenciais válidas', async () => {
    const resposta = await request(app)
      .post('/auth/login')
      .send({
        email: 'cozinha@teste.com',
        senha: 'Teste@123'
      });

    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveProperty('token');
  });

  it('deve rejeitar pedido sem canalPedido', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${tokenCliente}`)
      .send({
        idUnidade: 1,
        itens: [
          {
            idProduto: 1,
            quantidade: 1
          }
        ]
      });

    expect(resposta.status).toBe(400);
  });

  it('deve rejeitar pedido com quantidade inválida', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${tokenCliente}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 1,
            quantidade: -1
          }
        ]
      });

    expect(resposta.status).toBe(400);
  });

  it('deve permitir que administrador consulte os registros de auditoria', async () => {
    const token = jwt.sign(
      {
        idUsuario: 1,
        perfil: 'ADMIN',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .get('/auditoria')
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
  });

  it('deve impedir que cliente consulte os registros de auditoria', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resposta = await request(app)
      .get('/auditoria')
      .set('Authorization', `Bearer ${token}`);

    expect(resposta.status).toBe(403);
  });

  it('deve registrar auditoria ao criar um pedido', async () => {
    const token = jwt.sign(
      {
        idUsuario: 2,
        perfil: 'CLIENTE',
        idUnidade: null
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const respostaPedido = await request(app)
      .post('/pedidos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idUnidade: 1,
        canalPedido: 'WEB',
        itens: [
          {
            idProduto: 1,
            quantidade: 1
          }
        ]
      });

    expect(respostaPedido.status).toBe(201);

    const [registros] = await db.query(
      `SELECT *
       FROM tb_auditoria
      WHERE id_usuario = ?
        AND ds_acao LIKE ?
      ORDER BY id_auditoria DESC
      LIMIT 1`,
      [
        2,
        `%Criou o pedido ${respostaPedido.body.idPedido}%`
      ]
    );

    expect(registros.length).toBe(1);
    expect(registros[0].ds_acao).toContain(
      `Criou o pedido ${respostaPedido.body.idPedido}`
    );
  });
});
