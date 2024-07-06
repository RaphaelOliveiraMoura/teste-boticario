import * as queriesAndCommands from "./main/queries-and-commands";
import { httpServer } from "./main/services";

httpServer.bind("GET", "/categories", async () => {
  const data = await queriesAndCommands.listCategoriesQuery.execute();
  return { data, status: 200 };
});

httpServer.bind<{ Params: { id: string } }>(
  "GET",
  "/categories/:id",
  async ({ params }) => {
    const data = await queriesAndCommands.inspectCategoryQuery.execute({
      id: params.id,
    });
    return { data, status: 200 };
  },
);

httpServer.bind<{ Body: { name: string; description: string } }>(
  "POST",
  "/categories",
  async ({ body }) => {
    const data = await queriesAndCommands.createCategoryCommand.execute(body);
    return { data, status: 201 };
  },
);

httpServer.bind<{
  Body: { name: string; description: string };
  Params: { id: string };
}>("PUT", "/categories/:id", async ({ body, params }) => {
  const data = await queriesAndCommands.updateCategoryCommand.execute({
    id: params.id,
    ...body,
  });
  return { data, status: 200 };
});
