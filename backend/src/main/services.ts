import { DbConnectionDrizzleService } from "@/infra/db/drizzle/db-connection";
import { ConfigEnvService } from "@/infra/services/config-env";
import { FileSystemNodeService } from "@/infra/services/file-system-node";
import { HttpFastifyServer } from "@/infra/services/http-fastify-server";

export const DbConnection = DbConnectionDrizzleService;

export const configService = new ConfigEnvService();
export const fileSystem = new FileSystemNodeService();
export const httpServer = new HttpFastifyServer(configService);
