import { Controller } from ".";
import { category } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class CategoryController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind(
      { method: "GET", path: "/categories", requireAuth: true },
      async () => {
        const data = await category.list.execute();
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Params: { id: string } }>(
      { method: "GET", path: "/categories/:id", requireAuth: true },
      async ({ params }) => {
        const data = await category.inspect.execute({
          id: params.id,
        });
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Body: CategoryBody }>(
      { method: "POST", path: "/categories", requireAuth: true },
      async ({ body }) => {
        const data = await category.create.execute(body);
        return { data, status: 201 };
      },
    );

    httpServer.bind<{ Body: CategoryBody; Params: { id: string } }>(
      { method: "PUT", path: "/categories/:id", requireAuth: true },
      async ({ body, params }) => {
        const data = await category.update.execute({
          id: params.id,
          ...body,
        });
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Params: { id: string } }>(
      { method: "DELETE", path: "/categories/:id", requireAuth: true },
      async ({ params }) => {
        const data = await category.delete.execute({
          id: params.id,
        });
        return { data, status: 204 };
      },
    );
  }
}

interface CategoryBody {
  name: string;
  description: string;
}
