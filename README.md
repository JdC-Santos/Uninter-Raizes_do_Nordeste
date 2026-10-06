# API Raízes do Nordeste

API desenvolvida para o Projeto Multidisciplinar da trilha Back-end da UNINTER.

Tecnologias utilizadas: Node.js, Express, MySQL, JWT, Swagger, Jest e Supertest.

## Requisitos

- Node.js 22
- MySQL
- npm

## Instalação

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` utilizando o `.env.example` como referência.

Execute os scripts do banco disponíveis em:

```text
docs/db/
```

Primeiro execute `raizes_nordeste.sql` para criar o banco e depois `massa_testes.sql` para inserir os dados utilizados nos testes.

## Executar o projeto

```bash
npm run dev
```

A documentação Swagger da API está disponível em:

```text
http://localhost:3000/documentation
```

## Testes

Antes de executar os testes, verifique se o banco de dados está configurado e se os scripts `raizes_nordeste.sql` e `massa_testes.sql` foram executados.

Para executar os testes:

```bash
npm run test
```

O projeto possui 18 testes de integração utilizando Jest e Supertest, incluindo cenários de autenticação, autorização, pedidos, pagamentos, estoque, atualização de status e auditoria.

## Insomnia

A collection do Insomnia está disponível em:

```text
docs/insomnia/
```

Ela contém as requisições utilizadas para testar os endpoints e os usuários da massa de testes.

Para utilizar a collection, importe o arquivo no Insomnia, configure o ambiente com a URL da API e realize o login para obter o token JWT utilizado nas rotas protegidas.

Ordem sugerida para execução manual: iniciar a API, realizar o login com um usuário da massa de testes, copiar o token JWT retornado e utilizá-lo nas rotas protegidas. Em seguida, executar as requisições de pedidos, pagamento, atualização de status e auditoria conforme o fluxo da aplicação.