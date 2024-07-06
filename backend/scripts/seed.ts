import { DbConnection } from "@/main/services";
import { fileSystem } from "@/main/services";

fileSystem
  .readFile(fileSystem.resolvePath("populate.sql", __dirname))
  .then((sql) =>
    DbConnection.getInstance()
      .rawQuery(sql)
      .then(() => console.info("Script executado com sucesso")),
  )
  .catch((err) => console.error("Erro ao executar script", err));
