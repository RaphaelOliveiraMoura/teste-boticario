import Fastify from "fastify";

import { configService } from "./main/services/config";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.listen({ port: +configService.get("PORT") }, function (err, address) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  console.info(`Server is now listening on ${address}`);
});
