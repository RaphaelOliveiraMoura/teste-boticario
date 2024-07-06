import { Controller } from ".";
import { category } from "../application";

import { IHttpServer } from "@/domain/services/http-server";

export class CategoryController implements Controller {
  route(httpServer: IHttpServer): void {
    httpServer.bind({
      method: "GET",
      path: "/categories",
      handleWithAuth: async () => {
        const data = await category.list.execute();
        return { data, status: 200 };
      },
    });

    httpServer.bind<{ Params: { id: string } }>({
      method: "GET",
      path: "/categories/:id",
      handleWithAuth: async ({ params }) => {
        const data = await category.inspect.execute({
          id: params.id,
        });
        return { data, status: 200 };
      },
    });

    httpServer.bind<{ Body: CategoryBody }>({
      method: "POST",
      path: "/categories",
      handleWithAuth: async ({ body }) => {
        const data = await category.create.execute(body);
        return { data, status: 201 };
      },
      validate: async ({ body }) => this.validateBody(body),
    });

    httpServer.bind<{ Body: CategoryBody; Params: { id: string } }>({
      method: "PUT",
      path: "/categories/:id",
      handleWithAuth: async ({ body, params }) => {
        const data = await category.update.execute({
          id: params.id,
          ...body,
        });
        return { data, status: 200 };
      },
      validate: async ({ body }) => this.validateBody(body),
    });

    httpServer.bind<{ Params: { id: string } }>({
      method: "DELETE",
      path: "/categories/:id",
      handleWithAuth: async ({ params }) => {
        const data = await category.delete.execute({
          id: params.id,
        });
        return { data, status: 204 };
      },
    });
  }

  private validateBody(body: CategoryBody) {
    const errors = [];
    if (!body.name) errors.push("name is required");
    if (body.name.length > 20)
      errors.push("name must be lower then 20 characters");
    if (!body.description) errors.push("description is required");
    if (body.name.length > 200)
      errors.push("name must be lower then 200 characters");
    return { valid: errors.length === 0, errors };
  }
}

interface CategoryBody {
  name: string;
  description: string;
}
