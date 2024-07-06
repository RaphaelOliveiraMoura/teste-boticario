import { httpServer } from "./main/server";
import { DbConnection } from "./main/services";

import "./main/routes";

DbConnection.getInstance()
  .initialize()
  .then(() => httpServer.listen());
