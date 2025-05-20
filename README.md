# App

Gold Raspberry Awards API.

## RFs (Requisitos funcionais)
- [x] Importar dados de filmes do arquivo CSV e persisti-los no banco de dados.
- [x] Um endpoint para calcular os intervalos
- [x] Deve ser possivel a inclusão de outros arquivos CSV.

## RN (Regras de negócio)
- [x] Um produtor pode ter multiplas vitórias
- [x] Apenas os vencedores podem ser considerados para o calculo de intervalo.
- [x] Apenas produtores com pelomenos duas vitórias devem ser considerados.

## RNFs (Requisitos não-funcionais)
- [x] O web service RESTful deve ser implementado com base no nível 2 de maturidade de Richardson;
- [x] Devem ser implementados somente testes de integração. Eles devem garantir que os dados obtidos estão de acordo com os dados fornecidos na proposta;
- [x] O banco de dados deve estar em memória utilizando um SGBD embarcado (por exemplo, H2). Nenhuma instalação externa deve ser necessária;
- [x] A aplicação deve conter um readme com instruções para rodar o projeto e os testes de integração.
- [x] O código-fonte deve ser disponibilizado em um repositório git (Github, Gitlab, Bitbucket, etc)

---

## Pré-requisitos
1. Possuir o node instalado na versão mínima:```18.x.x```
---

## Como executar o projeto pela primeira vez

1. Instale as dependências:
    ```npm install```

2. Gere o cliente Prisma:
    ```npx prisma generate```

3. Aplique o esquema do banco de dados (em memória):
    ```npx prisma db push```
    
4. Inicie a aplicação em modo de desenvolvimento:
    ```npm run start:dev```

---

## Como executar os testes

- Para rodar os testes de integração (end-to-end):
    ```npm run test:e2e```

- Para rodar os testes unitários:
    ```npm run test:unit```

- Para rodar todos os testes (unitários e integração):
    ```npm run test```

---

## Swagger
- Após ja ter iniciado a aplicação, basta acessar a rota a seguir para abrir o swagger, lembrando que host e port são variaveis e de acordo com a sua configuração:
    ```localhost:3333/api-docs```

---

## Observações

- O banco de dados utilizado é em memória, não requer configuração externa (SQLITE).
- O comando `npx prisma generate` gera o cliente Prisma para manipulação do banco.
- O comando `npx prisma db push` cria as tabelas conforme o schema Prisma.
- Use `npm run start:dev` para rodar o servidor com hot reload.
- Os testes garantem que os dados importados e as regras de negócio estão corretos.

---

## Estrutura do projeto

- `src/` - Código-fonte da aplicação
- `prisma/` - Esquema do banco de dados Prisma
- `.internals/fixtures` - Arquivos CSV para importar na aplicação e para o test e2e
- `.internals/tmp` - Pasta para arquivos temporários de upload
- `.github/workflows` - CI da aplicação para garantir que os casos de uso não irão quebrar nos commits feitos.

---