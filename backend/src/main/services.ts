import { DbConnectionDrizzleService } from "@/infra/db/drizzle/db-connection";
import { ConfigEnvService } from "@/infra/services/config-env";
import { EncryptDecryptService } from "@/infra/services/encrypt-decrypt";
import { FileSystemNodeService } from "@/infra/services/file-system-node";
import { HashJwtService } from "@/infra/services/hash-jwt";

export const DbConnection = DbConnectionDrizzleService;

export const configService = new ConfigEnvService();
export const fileSystem = new FileSystemNodeService();
export const encrypter = new EncryptDecryptService();
export const hasher = new HashJwtService(configService);
