## Configurando aplicação

> Pré requisitos

- Docker ou Postgres instalado na máquina host
- NodeJs 18

> Setup banco de dados

```sh
# inicializa o banco de dados, utilizando configs do docker-compose.yml
$ docker-compose up -d

# configurando variáveis de ambiente
$ cp .env.example .env

# criando tabelas no banco de dados
$ npm run db:migrate

# populando o banco de dados com alguns valores fakes
$ npm run db:seed
```

Alguns outros comandos que podem ser útil:

```sh
# caso queira limpar todas as tabelas do banco para deixa-lo zerado para execução das migrações
$ npm run db:cleanup

# sobe um painel para visualizar as tabelas e dados do banco
$ npm run db:studio
```

> Executando o projeto

```sh
# instalando dependencias do projeto
$ npm install

# executando em modo de desenvolvimento
$ npm run dev


# para executar em modo de produção, siga os passos abaixo:
# gera o build da aplicação
$ npm run build

# executa a aplicação
$ npm run start
```

## Tecnologias utilizadas

- **NodeJs + Typescript** : Optei por utilizar ndoejs puro sem um framework mais robusto como o NestJs por exemplo
- **Fastify** : Foi utilizado o fastify para as configurações do servidor web http
- **DrizzleORM + Postgres** : Foi utilizado o drizzle orm juntamente como banco de dados PostgresSQL
- **Vitest** : Para desenvolvimento de alguns testes automatizados
- **Eslint + Prettier** : Como linter e formatter do projeto
- **tsx** : Para executar código typescript em modo de desenvolvimento

## Arquitetura

A aplicação toda foi desenvolvida baseado em aspectos do **clean architecture**, **DDD** e **CQRS**.

Algumas das nomeclaturas e conceitos utilizados:

- **Entity** : Entidade de négocio, onde vive grande parte das regras de negócio e restrições do sistema
- **Value Objects** : Conceito inspirado no DDD para se tratar de entidades que não possuem um identificador explícito, as próprias propriedades do value object garantem sua identidade
- **Commands** : Serviços que tem como responsabilidade realizar alguma mutação no servidor, age como um orquestrador de dados e fluxos. Em termos mais práticos podemos pensar em comandos como sendo funções que recebem valores como parâmetros, porém não retornam nada
- **Queries** : Ao contrário dos commands, as queries é utiliza para recuperação de dados, e não realizam mutação no estado da aplicação
- **Repositories** : São serviços responsável por restaurar ou persistir o estado de uma entity
- **Data Sources** : São serviços utilizados apenas para recuperar dados do banco de dados de forma mais performática, nesse caso os data sources não utilizam as entities do sistema

_Em cenários mais práticos talvez utilizar esse tipo de estruturação do sistema pode ser over engineer, pois traz um aumento da complexidade do projeto. Optei por seguir nessa linha apenas por se tratar de um teste técnico_

## Pontos de Melhorias

Acabou que não consegui ter tempo suficiente para atuar no desenvolvimento de alguns pontos da aplicação, mas gostaria de mencionar quais seriam eles

- **Validações mais robustas** : Seria interessante em sistemas maiores ter um mecanismo de validação mais robusto. Isso garante uma maior segurança e diminui a chance de eventuais erros.
- **Sonar e husky** : Em projetos que atuo, sempre costumo utilizar ferramentas como o sonar e husky para trazer uma garantia de qualidade maior para o sistema e sua evolução com o passar do tempo
- **Testes automizados** : Acabei tendo tempo para implementar apenas alguns poucos testes unitários na camada de aplicação e domínio, porém seria extremamente interessante em um projeto como esse explorar mais sobre testes automizados, principalmente por conta do desacoplamento proveniente do clean archicture.
- **Paginação, filtros e ordenação** : Para as rotas de listagem de recursos seria interessante trabalhar com esses 3 pilares que são bem importante em projetos reais. Tanto por conta de performance quanto por conta de usabilidade do sistema.
- **Alguns detalhes do REST** : Acabei optando por não seguir 100% as convenções do REST, pois queria explorar mais a separação de conceitos do CQRS. Portanto algumas rotas do backend não possui a navegabilidade proposta pelo padrão REST.
- **Integração com um serviço de object storage** : Para possibilitar que o usuário fizesse upload de arquivos diretamente. Precisaria utilizar algum serviço de object storage, ou então uma solução mais simples para rodar localmente seria o backend salvar os arquivos no próprio file system.
