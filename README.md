# API Raízes do Nordeste

API desenvolvida para o Projeto Multidisciplinar da trilha Back-end da UNINTER.

Tecnologias utilizadas: Node.js, Express, MySQL, JWT, Swagger, Jest e Supertest.

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

Primeiro execute `raizes_nordeste.sql` e depois `massa_testes.sql`.

## Executar o projeto

```bash
npm run dev
```

A documentação da API está disponível em:

```text
http://localhost:PORTA/documentation
```

## Testes

Para executar os testes:

```bash
npm run test
```

O projeto possui 12 testes de integração utilizando Jest e Supertest.

## Insomnia

A collection do Insomnia está disponível em:

```text
docs/insomnia/
```

Ela contém as requisições utilizadas para testar os endpoints e os usuários da massa de testes.