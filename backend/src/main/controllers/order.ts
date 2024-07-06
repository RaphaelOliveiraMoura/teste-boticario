import { Controller } from ".";
import { OrderBody, validateBody } from "./order.validation";
import { order } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class OrderController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind({
      method: "GET",
      path: "/orders",
      handleWithAuth: async () => {
        const data = await order.list.execute();
        return { data, status: 200 };
      },
    });

    httpServer.bind<{ Params: { id: string } }>({
      method: "GET",
      path: "/orders/:id",
      handleWithAuth: async ({ params }) => {
        const data = await order.inspect.execute({
          id: params.id,
        });
        return { data, status: 200 };
      },
    });

    httpServer.bind<{ Body: OrderBody }>({
      method: "POST",
      path: "/orders",
      handleWithAuth: async ({ body, client }) => {
        const data = await order.create.execute({
          ...body,
          idClient: client.props.id,
        });
        return { data, status: 201 };
      },
      validate: async ({ body }) => validateBody(body),
    });

    httpServer.bind<{ Params: { id: string } }>({
      method: "PUT",
      path: "/orders/:id",
      handleWithAuth: async ({ params }) => {
        const data = await order.update.execute({ id: params.id });
        return { data, status: 200 };
      },
    });

    httpServer.bind<{ Params: { id: string } }>({
      method: "DELETE",
      path: "/orders/:id",
      handleWithAuth: async ({ params }) => {
        const data = await order.delete.execute({
          id: params.id,
        });
        return { data, status: 204 };
      },
    });
  }
}
