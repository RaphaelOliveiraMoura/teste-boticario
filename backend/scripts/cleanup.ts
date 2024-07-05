import { DbConnection } from "@/main/services/db-connection";

DbConnection.getInstance()
  .rawQuery(
    `
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
    `,
  )
  .then(() => console.info("Banco de dados restaurado com sucesso"))
  .catch((err: Error) => console.error("Erro ao executar script", err));
