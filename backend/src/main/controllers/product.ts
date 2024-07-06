import { Controller } from ".";
import { product } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class ProductController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind("GET", "/categories", async () => {
      const data = await product.list.execute();
      return { data, status: 200 };
    });

    httpServer.bind<{ Params: { id: string } }>(
      "GET",
      "/categories/:id",
      async ({ params }) => {
        const data = await product.inspect.execute({
          id: params.id,
        });
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Body: ProductBody }>(
      "POST",
      "/categories",
      async ({ body }) => {
        const data = await product.create.execute({
          ...body,
          createdAt: new Date(),
        });
        return { data, status: 201 };
      },
    );

    httpServer.bind<{ Body: ProductBody; Params: { id: string } }>(
      "PUT",
      "/categories/:id",
      async ({ body, params }) => {
        const data = await product.update.execute({
          id: params.id,
          ...body,
        });
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Params: { id: string } }>(
      "DELETE",
      "/categories/:id",
      async ({ params }) => {
        const data = await product.delete.execute({
          id: params.id,
        });
        return { data, status: 204 };
      },
    );
  }
}

interface ProductBody {
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: string;
  image: string;
}
