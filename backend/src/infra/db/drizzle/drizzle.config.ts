import "dotenv/config";

import { defineConfig } from "drizzle-kit";

import { configService } from "@/main/services";
import { fileSystem } from "@/main/services";

export default defineConfig({
  schema: fileSystem.resolvePath("./schema.ts", __dirname),
  out: fileSystem.resolvePath(__dirname),
  dialect: "postgresql",
  dbCredentials: {
    url: configService.get("DB_CONNECION_URL"),
  },
  verbose: true,
  strict: true,
});
