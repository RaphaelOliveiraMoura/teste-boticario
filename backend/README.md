## Configurando aplicação

> Setup banco de dados

```sh
# inicializa o banco de dados, utilizando configs do docker-compose.yml
$ docker-compose up -d

# configurando variáveis de ambiente
$ cp .env.example .env

# criando tabelas no banco de dados
$ npm run db:migrate
```

Alguns outros comandos que podem ser útil:

```sh
# caso queira limpar todas as tabelas do banco para deixa-lo zerado para execução das migrações
$ npm run db:cleanup
```
