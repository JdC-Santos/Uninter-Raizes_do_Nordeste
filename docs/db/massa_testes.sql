INSERT INTO tb_regiao (nm_regiao)
VALUES ('Nordeste');

INSERT INTO tb_unidade (
  id_regiao,
  nm_unidade,
  ds_logradouro,
  nr_endereco,
  ds_complemento,
  nm_cidade,
  sg_uf,
  nr_cep
)
VALUES (
  1,
  'Unidade Recife',
  'Rua de Teste',
  '100',
  NULL,
  'Recife',
  'PE',
  '50000000'
);

INSERT INTO tb_produto (
  nm_produto,
  ds_produto,
  flg_ativo,
  ds_imagem
)
VALUES
('Baião de Dois', 'Baião de dois tradicional', 1, NULL),
('Cuscuz Nordestino', 'Cuscuz tradicional', 1, NULL);

INSERT INTO tb_unidade_produto (
  tb_unidade_id_unidade,
  tb_produto_id_produto,
  qt_produto,
  vl_produto,
  flg_disponivel
)
VALUES
(1, 1, 50, 30.50, 1),
(1, 2, 30, 15.25, 1);


/* criando usuários do sistema para poder testar as rotas e permissoes */
-- Usuários funcionários para testes
-- Senha dos dois usuários: Teste@123

INSERT INTO tb_usuario (
  id_unidade,
  nm_usuario,
  ds_email,
  ds_senha,
  nr_cpf,
  cd_perfil,
  flg_ativo,
  qt_pontos
)
VALUES
(
  1,
  'Cozinha Teste',
  'cozinha@teste.com',
  '$2b$10$wY1rDwZSTUZ3fpid92KcX.lydeQ4VBzurlGjvra81TGe3XEaVAGlC',
  '11144477735',
  'COZINHA',
  1,
  0
),
(
  1,
  'Atendente Teste',
  'atendente@teste.com',
  '$2b$10$wY1rDwZSTUZ3fpid92KcX.lydeQ4VBzurlGjvra81TGe3XEaVAGlC',
  '52998224725',
  'ATENDENTE',
  1,
  0
);