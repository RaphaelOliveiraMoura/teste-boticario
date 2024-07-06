import { and, eq, ne } from "drizzle-orm";

import { DbConnectionDrizzleService } from "../db-connection";
import { schema } from "../schema";

import { Category } from "@/domain/entities/category";
import { ICategoryRepository } from "@/domain/repositories/category-repository";

export class CategoryDrizzleRepository implements ICategoryRepository {
  private drizzle = DbConnectionDrizzleService.getInstance().drizzle();

  async alreadyInUse(category: Category): Promise<boolean> {
    const [inUse] = await this.drizzle
      .select()
      .from(schema.categoria)
      .where(
        and(
          eq(schema.categoria.nome_categoria, category.props.name),
          ne(schema.categoria.categoria_id, Number(category.props.id)).if(
            category.props.id !== undefined && category.props.id !== "",
          ),
        ),
      )
      .limit(1);

    return !!inUse;
  }

  async findById(id: string): Promise<Category | null> {
    const [result] = await this.drizzle
      .select()
      .from(schema.categoria)
      .where(eq(schema.categoria.categoria_id, +id))
      .limit(1);

    if (!result) return null;

    return new Category({
      id: String(result.categoria_id),
      name: result.nome_categoria ?? "",
      description: result.descricao_categoria ?? "",
    });
  }

  async create(category: Category): Promise<void> {
    await this.drizzle.insert(schema.categoria).values({
      nome_categoria: category.props.name,
      descricao_categoria: category.props.description,
    });
  }

  async update(category: Category): Promise<void> {
    await this.drizzle
      .update(schema.categoria)
      .set({
        nome_categoria: category.props.name,
        descricao_categoria: category.props.description,
      })
      .where(eq(schema.categoria.categoria_id, +category.props.id));
  }

  async remove(id: string): Promise<void> {
    await this.drizzle
      .delete(schema.categoria)
      .where(eq(schema.categoria.categoria_id, +id));
  }
}
