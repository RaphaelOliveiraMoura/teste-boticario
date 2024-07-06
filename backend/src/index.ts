import { DbConnection, httpServer } from "./main/services";

import "./main/routes";

DbConnection.getInstance()
  .initialize()
  .then(() => httpServer.listen());
