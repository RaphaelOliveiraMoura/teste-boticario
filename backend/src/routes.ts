import * as queries from "./main/queries";
import { httpServer } from "./main/services";

httpServer.bind("GET", "/categories", async () => {
  const data = await queries.listCategoriesQuery.execute();
  return { data, status: 200 };
});

httpServer.bind<{ Params: { id: string } }>(
  "GET",
  "/categories/:id",
  async ({ params }) => {
    const data = await queries.inspectCategoryQuery.execute({
      id: params.id,
    });
    return { data, status: 200 };
  },
);
