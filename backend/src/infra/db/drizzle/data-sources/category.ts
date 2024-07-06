import { eq } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import {
  CategoryDto,
  ICategoryDataSource,
} from "@/application/category/queries/data-source";

export class CategoryDrizzleDataSource implements ICategoryDataSource {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  async inspect(id: string): Promise<CategoryDto | null> {
    const [result] = await this.drizzle
      .select()
      .from(schema.categoria)
      .where(eq(schema.categoria.categoria_id, +id))
      .limit(1);

    if (!result) return null;

    return {
      id: String(result.categoria_id),
      name: result.nome_categoria ?? "",
      description: result.descricao_categoria ?? "",
    };
  }

  async list(): Promise<CategoryDto[]> {
    const results = await this.drizzle.select().from(schema.categoria);

    return results.map((result) => ({
      id: String(result.categoria_id),
      name: result.nome_categoria ?? "",
      description: result.descricao_categoria ?? "",
    }));
  }
}
