import {
  inspectCategoryQuery,
  createCategoryCommand,
  updateCategoryCommand,
  deleteCategoryCommand,
  listCategoriesQuery,
} from "./main/queries-and-commands";
import { httpServer } from "./main/services";

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

httpServer.bind<{ Body: { name: string; description: string } }>(
  "POST",
  "/categories",
  async ({ body }) => {
    const data = await createCategoryCommand.execute(body);
    return { data, status: 201 };
  },
);

httpServer.bind<{
  Body: { name: string; description: string };
  Params: { id: string };
}>("PUT", "/categories/:id", async ({ body, params }) => {
  const data = await updateCategoryCommand.execute({
    id: params.id,
    ...body,
  });
  return { data, status: 200 };
});

httpServer.bind<{
  Params: { id: string };
}>("DELETE", "/categories/:id", async ({ params }) => {
  const data = await deleteCategoryCommand.execute({
    id: params.id,
  });
  return { data, status: 204 };
});
