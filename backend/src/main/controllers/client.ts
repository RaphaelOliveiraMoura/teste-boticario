import { Controller } from ".";
import {
  inspectClientQuery,
  createClientCommand,
  updateClientCommand,
  deleteClientCommand,
  listClientsQuery,
} from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class ClientController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind("GET", "/clients", async () => {
      const data = await listClientsQuery.execute();
      return { data, status: 200 };
    });

    httpServer.bind<{ Params: { id: string } }>(
      "GET",
      "/clients/:id",
      async ({ params }) => {
        const data = await inspectClientQuery.execute({
          id: params.id,
        });
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Body: ClientBody }>(
      "POST",
      "/clients",
      async ({ body }) => {
        const data = await createClientCommand.execute({
          ...body,
          birthDate: new Date(body.birthDate),
        });
        return { data, status: 201 };
      },
    );

    httpServer.bind<{ Body: ClientBody; Params: { id: string } }>(
      "PUT",
      "/clients/:id",
      async ({ body, params }) => {
        const data = await updateClientCommand.execute({
          id: params.id,
          ...body,
          birthDate: new Date(body.birthDate),
        });
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Params: { id: string } }>(
      "DELETE",
      "/clients/:id",
      async ({ params }) => {
        const data = await deleteClientCommand.execute({
          id: params.id,
        });
        return { data, status: 204 };
      },
    );
  }
}

interface ClientBody {
  email: string;
  username: string;
  name: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: string;
  address: {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    number: string;
    complement: string;
  };
}
