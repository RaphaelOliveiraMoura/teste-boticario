import pg from "pg";

import { ConfigEnvService } from "@/infra/services/config-env";

export class DrizzleConnection {
  private static instance: DrizzleConnection;

  private configService = new ConfigEnvService();
  private client: pg.Client;

  private constructor() {
    this.client = new pg.Client({
      connectionString: this.configService.get("DB_CONNECION_URL"),
    });
  }

  static getInstance() {
    if (!DrizzleConnection.instance) {
      DrizzleConnection.instance = new DrizzleConnection();
    }

    return DrizzleConnection.instance;
  }

  async rawQuery(sql: string) {
    await this.client.connect();
    await this.client.query(sql);
    await this.client.end();
  }
}
