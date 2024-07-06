import { auth } from "./application";
import { configService } from "./services";

import { HttpFastifyServer } from "@/infra/services/http-fastify-server";

export const httpServer = new HttpFastifyServer(configService, auth.verifyAuth);
