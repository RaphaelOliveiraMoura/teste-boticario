import { DbConnection } from "@/main/services/db-connection";
import { fileSystem } from "@/main/services/file-system";

fileSystem
  .readFile(fileSystem.resolvePath("populate.sql", import.meta))
  .then((sql) =>
    DbConnection.getInstance()
      .rawQuery(sql)
      .then(() => console.info("Script executado com sucesso")),
  )
  .catch((err) => console.error("Erro ao executar script", err));
