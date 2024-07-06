import Fastify from "fastify";

import { HttpError } from "@/application";
import { VerifyAuthUseCase } from "@/application/auth/use-case/verify-auth";
import { IConfigService } from "@/domain/services/config";
import {
  CallbackFunction,
  HttpCallbackParamsTypes,
  IHttpServer,
} from "@/domain/services/http-server";

export class HttpFastifyServer implements IHttpServer {
  private fastify = Fastify({ logger: true });

  constructor(
    private readonly configService: IConfigService,
    private readonly verifyAuthUseCase: VerifyAuthUseCase,
  ) {}

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
    params: {
      method: "POST" | "GET" | "PUT" | "DELETE";
      path: string;
      requireAuth?: boolean;
    },
    callback: CallbackFunction<T>,
  ): void {
    const { method, path, requireAuth = false } = params;

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

    this.fastify[fastifyMethod](path, async (request, reply) => {
      try {
        if (requireAuth) {
          const token = request.headers.authorization;
          await this.verifyAuthUseCase.execute({ token });
        }

        const response = await callback({
          body: request.body as T["Body"],
          headers: request.headers as T["Headers"],
          params: request.params as T["Params"],
        });

        return reply.status(response.status).send(response.data);
      } catch (error) {
        if (error instanceof HttpError) {
          return reply.status(error.status).send({ message: error.message });
        }

        throw error;
      }
    });
  }
}
