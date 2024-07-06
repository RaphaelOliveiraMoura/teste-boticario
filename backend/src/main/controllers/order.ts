import { Controller } from ".";
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
      handleWithAuth: async ({ body }) => {
        const data = await order.create.execute({ ...body });
        return { data, status: 201 };
      },
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

interface OrderBody {
  idClient: string;
  products: {
    idProduct: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}
