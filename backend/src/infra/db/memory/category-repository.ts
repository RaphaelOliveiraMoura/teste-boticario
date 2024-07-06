import { randomUUID } from "crypto";

import { Category } from "@/domain/entities/category";
import { ICategoryRepository } from "@/domain/repositories/category-repository";

export class CategoryRepositoryMemory implements ICategoryRepository {
  storage = {
    categories: [] as Category[],
  };

  async violateNameUniqueConstraint(
    name: string,
    id?: string | undefined,
  ): Promise<boolean> {
    return this.storage.categories.some(
      (category) => category.props.name === name && category.props.id !== id,
    );
  }

  async findById(id: string): Promise<Category | null> {
    return (
      this.storage.categories.find((category) => category.props.id === id) ??
      null
    );
  }

  async create(category: Category): Promise<void> {
    const cloneCategory: Category = new Category({
      ...category.props,
      id: randomUUID(),
    });

    this.storage.categories.push(cloneCategory);
  }

  async update(category: Category): Promise<void> {
    const dbCategory = await this.findById(category.props.id);
    if (!dbCategory) throw new Error("CategoryNotFound");
    dbCategory.props = category.props;
  }
}
