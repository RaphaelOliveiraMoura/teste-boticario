import {
  pgTable,
  serial,
  varchar,
  unique,
  date,
  integer,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

const endereco = pgTable("endereco", {
  endereco_id: serial("endereco_id").primaryKey().notNull(),
  cep: varchar("cep", { length: 9 }),
  rua: varchar("rua", { length: 100 }),
  bairro: varchar("bairro", { length: 30 }),
  cidade: varchar("cidade", { length: 30 }),
  numero: varchar("numero", { length: 10 }),
  complemento: varchar("complemento", { length: 100 }),
  uf: varchar("uf", { length: 2 }),
});

const cliente = pgTable(
  "cliente",
  {
    cliente_id: serial("cliente_id").primaryKey().notNull(),
    email: varchar("email", { length: 50 }),
    username: varchar("username", { length: 15 }),
    senha: varchar("senha", { length: 20 }),
    nome: varchar("nome", { length: 200 }),
    cpf: varchar("cpf", { length: 11 }).notNull(),
    telefone: varchar("telefone", { length: 11 }),
    data_nascimento: date("data_nascimento"),
    endereco_id: integer("endereco_id").notNull(),
  },
  (table) => {
    return {
      cliente_cpf_key: unique("cliente_cpf_key").on(table.cpf),
    };
  },
);

const pedido = pgTable("pedido", {
  pedido_id: serial("pedido_id").primaryKey().notNull(),
  numero_pedido: integer("numero_pedido"),
  valor_total_pedido: numeric("valor_total_pedido"),
  data_pedido: date("data_pedido").defaultNow().notNull(),
  status: boolean("status"),
  cliente_id: integer("cliente_id")
    .notNull()
    .references(() => cliente.cliente_id),
});

const categoria = pgTable("categoria", {
  categoria_id: serial("categoria_id").primaryKey().notNull(),
  nome_categoria: varchar("nome_categoria", { length: 20 }),
  descricao_categoria: varchar("descricao_categoria", { length: 200 }),
});

const produto = pgTable("produto", {
  produto_id: serial("produto_id").primaryKey().notNull(),
  nome_produto: varchar("nome_produto", { length: 50 }),
  descricao_produto: varchar("descricao_produto", { length: 200 }),
  preco_produto: numeric("preco_produto"),
  qtd_estoque: integer("qtd_estoque"),
  data_cadastro_produto: date("data_cadastro_produto").defaultNow(),
  categoria_id: integer("categoria_id")
    .notNull()
    .references(() => categoria.categoria_id),
  imagem: varchar("imagem"),
});

const produto_pedido = pgTable("produto_pedido", {
  produto_pedido_id: serial("produto_pedido_id").primaryKey().notNull(),
  qtd_produto_pedido: integer("qtd_produto_pedido"),
  preco_produto_pedido: numeric("preco_produto_pedido"),
  produto_id: integer("produto_id").references(() => produto.produto_id),
  pedido_id: integer("pedido_id").references(() => pedido.pedido_id),
});

export const schema = {
  endereco,
  cliente,
  pedido,
  categoria,
  produto,
  produto_pedido,
};
