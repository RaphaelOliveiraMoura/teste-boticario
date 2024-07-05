import { readFile } from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { DrizzleConnection } from "../src/infra/db/drizzle/connection";

const currentDir = dirname(fileURLToPath(import.meta.url));

const ddlSqlPath = path.resolve(currentDir, "ddl.sql");

readFile(ddlSqlPath, "utf-8")
  .then((ddlSql) =>
    DrizzleConnection.getInstance()
      .rawQuery(ddlSql)
      .then(() => console.info("Script executado com sucesso")),
  )
  .catch((err) => console.error("Erro ao executar script", err));
