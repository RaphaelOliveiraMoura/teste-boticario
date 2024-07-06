import { Controller } from ".";
import {
  inspectCategoryQuery,
  createCategoryCommand,
  updateCategoryCommand,
  deleteCategoryCommand,
  listCategoriesQuery,
} from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class CategoryController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind("GET", "/categories", async () => {
      const data = await listCategoriesQuery.execute();
      return { data, status: 200 };
    });

    httpServer.bind<{ Params: { id: string } }>(
      "GET",
      "/categories/:id",
      async ({ params }) => {
        const data = await inspectCategoryQuery.execute({
          id: params.id,
        });
        return { data, status: 200 };
      },
    );

    httpServer.bind<{ Body: CategoryBody }>(
      "POST",
      "/categories",
      async ({ body }) => {
        const data = await createCategoryCommand.execute(body);
        return { data, status: 201 };
      },
    );

    httpServer.bind<{ Body: CategoryBody; Params: { id: string } }>(
      "PUT",
      "/categories/:id",
      async ({ body, params }) => {
        const data = await updateCategoryCommand.execute({
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
        const data = await deleteCategoryCommand.execute({
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
