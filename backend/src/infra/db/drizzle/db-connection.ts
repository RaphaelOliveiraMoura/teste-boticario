import pg from "pg";

import { IDbConnectionService } from "@/domain/services/db-connection";
import { ConfigEnvService } from "@/infra/services/config-env";

export class DbConnectionDrizzleService implements IDbConnectionService {
  private static instance: DbConnectionDrizzleService;

  private client: pg.Client;

  private constructor() {
    this.client = new pg.Client({
      connectionString: new ConfigEnvService().get("DB_CONNECION_URL"),
    });
  }

  static getInstance() {
    if (!DbConnectionDrizzleService.instance) {
      DbConnectionDrizzleService.instance = new DbConnectionDrizzleService();
    }

    return DbConnectionDrizzleService.instance;
  }

  async rawQuery(sql: string) {
    await this.client.connect();
    await this.client.query(sql).finally(async () => {
      await this.client.end();
    });
  }
}
