## Executando o frontend

> Pré requisitos

- Nodejs 18

```sh
# instalando as dependencias do projeto
$ npm install

# configurando as variáveis de ambiente
$ cp .env.example .env

# executando em modo de desenvolvimento
$ npm run dev
```

_Observação: Por padrão o .env.exmplate está definido para apontar para o backend no endereço http://localhost:3001, caso esteja rodando o backend em outro endereço, basta alterar o seu .env. Se por acaso não for possível executar o backend é possível rodar o front com a configuração USE_MOCKS=true, oque torna o sistema acessível porém com algumas limitações e comportamentos mockados sem se integrar com o backend_

### Para executar em modo de produção

```sh
# gera o build da aplicação
$ npm run build

# executa o sistema baseado no build gerado
$ npm run start
```

## Tecnologias utilizadas e arquitetura

- **NextJs** : optei por ele para poder explorar um pouco do uso de server side rendering
- **Tailwind** : utilizado para estilização
- **Shadcn** : utlizei essa lib de componentes para agilizar no processo de construção do frontend
- **React Hook Form** : para controle dos formulários
- **Zod** : para validação de schemas, utilizei para todas as validações de formulários
- **Lucide** : biblioteca de ícones

### Arquitetura

Optei por seguir uma estrutura baseado no **clean architecture**, por mais que o sistema seja relativamente pequeno e em contextos como esse talvez uma estrutura como essa pode ser até algo desnecessário pois envolve aumentar bastante a complexidade do projeto, porém optei por seguir dessa forma por se tratar de um teste técnico.

Separação de pastas/camadas:

- **domain** : camada pura onde contem as interfaces de use-cases do sistema
- **infra** : camada com a implementação concreta das interfaces definidas no domain
- **main** : camada onde é injetado as dependências, serve como uma fachada para consumo de recursos do sistema
- **ui** : camada foi criado os componentes visuais do sistema

- **app** : camada onde é feito o roteamento e definições das páginas baseado no padrão do nextjs

## Aspectos de melhoria

Alguns tópicos eu gostaria de ter trabalhado melhor, porém acabei não tendo tempo sufiente:

- **Testes automzatizados** : Seria bem interesssante implementar testes em um sistema como esse, seja testes unitários, de integração ou e2e. Principalmente se tratando de uma arquitetura separada em várias camadas, a implementação desses testes acabaria sendo bastante favorável.
- **Paginação via backend** : Em sistemas maiores seria extremamente importante utilizar uma estratégia de paginação via server side, do modo que foi implementado todos os dados na listagem são carregados de uma só vez, a paginação ocorre apenas em tempo de execução pelo frontend
- **Filtros e ordenação** : Seria interessante ter funcionalidades de filtragem e ordenação em todas as tabelas do sistema, isso facilita bastante a navegação e visibilidade dos dados em uma lista.
- **Sonar, husky** : São algumas ferramentas que costumo usar em meus projetos para garantir uma maior qualidade na entrega.
- **Integração com viacep** : Seria legal uma integração com a api dos correios para fazer o autopreenchimento dos valores de endereço preenchidos pelo usuário
