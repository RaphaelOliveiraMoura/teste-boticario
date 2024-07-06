import { DbConnection, httpServer } from "./main/services";

import "./routes";

DbConnection.getInstance()
  .initialize()
  .then(() => httpServer.listen());
