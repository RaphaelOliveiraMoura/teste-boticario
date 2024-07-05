import { DbConnection } from "@/main/services/db-connection";
import { fileSystem } from "@/main/services/file-system";

fileSystem
  .readFile(fileSystem.resolvePath("ddl.sql", import.meta))
  .then((ddlSql) =>
    DbConnection.getInstance()
      .rawQuery(ddlSql)
      .then(() => console.info("Script executado com sucesso")),
  )
  .catch((err) => console.error("Erro ao executar script", err));
