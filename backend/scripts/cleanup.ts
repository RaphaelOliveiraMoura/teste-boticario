import { DrizzleConnection } from "../src/infra/db/drizzle/connection";

DrizzleConnection.getInstance()
  .rawQuery(
    `
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `,
  )
  .then(() => console.info("Banco de dados restaurado com sucesso"))
  .catch((err) => console.error("Erro ao executar script", err));
