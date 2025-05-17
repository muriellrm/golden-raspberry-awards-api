# App

Gold Raspberry Awards API.

## RFs (Requisitos funcionais)
- [] Importar dados de filmes do arquivo CSV e persisti-los no banco de dados.
- [] Export um endpoint para calcular os intervalos
- [] Deve ser possivel a inclusão de outros arquivos CSV.



## RN (Regras de negócio)
- [] Um produtor pode ter multiplas vitórias
- [] Um filme pode ter multiplos produtores
- [] Apenas os vencedores podem ser considerados para o calculo de intervalo.
- [] Apenas produtores com pelomenos duas vitórias devem ser considerados.

## RNFs (Requisitos não-funcionais)
- [] O web service RESTful deve ser implementado com base no nível 2 de maturidade de Richardson;
- [] Devem ser implementados somente testes de integração. Eles devem garantir que os dados obtidos estão de acordo com os dados fornecidos na proposta;
- [] O banco de dados deve estar em memória utilizando um SGBD embarcado (por exemplo, H2). Nenhuma instalação externa deve ser necessária;
- [] A aplicação deve conter um readme com instruções para rodar o projeto e os testes de integração.
- [] O código-fonte deve ser disponibilizado em um repositório git (Github, Gitlab, Bitbucket, etc)
