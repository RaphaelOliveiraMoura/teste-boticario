import "dotenv/config";

import { defineConfig } from "drizzle-kit";

import { configService } from "@/main/services/config";
import { fileSystem } from "@/main/services/file-system";

export default defineConfig({
  schema: "./schema.ts",
  out: fileSystem.resolvePath(__dirname),
  dialect: "postgresql",
  dbCredentials: {
    url: configService.get("DB_CONNECION_URL"),
  },
  verbose: true,
  strict: true,
});
