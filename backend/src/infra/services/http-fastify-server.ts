import Fastify from "fastify";

import { HttpError } from "@/application";
import { VerifyAuthUseCase } from "@/application/auth/use-case/verify-auth";
import { Client } from "@/domain/entities/client";
import { IConfigService } from "@/domain/services/config";
import {
  CallbackFunction,
  CallbackValidateFunction,
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
      validate?: CallbackValidateFunction<T>;
    } & (
      | { handleWithAuth: CallbackFunction<T, true> }
      | { handle: CallbackFunction<T, false> }
    ),
  ): void {
    const { method, path, validate } = params;

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
        if (validate) {
          const { valid, errors } = await validate({
            body: request.body as T["Body"],
            headers: request.headers as T["Headers"],
            params: request.params as T["Params"],
          });

          if (!valid) {
            return reply
              .status(400)
              .send({ message: "ValidationError", errors });
          }
        }

        const requiresAuth = "handleWithAuth" in params;

        const handleMethod = requiresAuth
          ? params.handleWithAuth
          : params.handle;

        const client = (
          requiresAuth
            ? await this.verifyAuthUseCase.execute({
                token: request.headers.authorization,
              })
            : undefined
        ) as Client;

        const response = await (handleMethod as CallbackFunction<T, true>)({
          body: request.body as T["Body"],
          headers: request.headers as T["Headers"],
          params: request.params as T["Params"],
          client,
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
