import { Controller } from ".";
import { ClientBody, validateBody } from "./client.validation";
import { client } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class ClientController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind({
      method: "GET",
      path: "/clients",
      handleWithAuth: async () => {
        const data = await client.list.execute();
        return { data, status: 200 };
      },
    });

    httpServer.bind<{ Params: { id: string } }>({
      method: "GET",
      path: "/clients/:id",
      handleWithAuth: async ({ params }) => {
        const data = await client.inspect.execute({
          id: params.id,
        });
        return { data, status: 200 };
      },
    });

    httpServer.bind<{ Body: ClientBody }>({
      method: "POST",
      path: "/clients",
      handle: async ({ body }) => {
        const data = await client.create.execute({
          ...body,
          birthDate: new Date(body.birthDate),
        });
        return { data, status: 201 };
      },
      validate: async ({ body }) => validateBody(body),
    });

    httpServer.bind<{ Body: ClientBody; Params: { id: string } }>({
      method: "PUT",
      path: "/clients/:id",
      handleWithAuth: async ({ body, params }) => {
        const data = await client.update.execute({
          id: params.id,
          ...body,
          birthDate: new Date(body.birthDate),
        });
        return { data, status: 200 };
      },
      validate: async ({ body }) => validateBody(body),
    });

    httpServer.bind<{ Params: { id: string } }>({
      method: "DELETE",
      path: "/clients/:id",
      handleWithAuth: async ({ params }) => {
        const data = await client.delete.execute({
          id: params.id,
        });
        return { data, status: 204 };
      },
    });
  }
}
