import Fastify from "fastify";

import { IConfigService } from "@/domain/services/config";
import {
  CallbackFunction,
  HttpCallbackParamsTypes,
  IHttpServer,
} from "@/domain/services/http-server";

export class HttpFastifyServer implements IHttpServer {
  private fastify = Fastify({ logger: true });

  constructor(private readonly configService: IConfigService) {}

  listen(): void {
    this.fastify.listen(
      { port: +this.configService.get("PORT") },
      function (err, address) {
        if (err) {
          console.error(err);
          return process.exit(1);
        }

        console.info(`Server is now listening on ${address}`);
      },
    );
  }

  bind<T extends HttpCallbackParamsTypes>(
    method: "POST" | "GET" | "PUT" | "DELETE",
    path: string,
    callback: CallbackFunction<T>,
  ): void {
    const fastifyMethodMap = {
      POST: "post",
      GET: "get",
      PUT: "put",
      DELETE: "delete",
    } as const;

    const fastifyMethod = fastifyMethodMap[method];

    if (!fastifyMethod) {
      throw new Error(`Fastify method invalid [${fastifyMethod}]`);
    }

    this.fastify[fastifyMethod](path, async function (request, reply) {
      const response = await callback({
        body: request.body as T["Body"],
        headers: request.headers as T["Headers"],
        params: request.params as T["Body"],
      });

      reply.send(response.data).status(response.status);
    });
  }
}
