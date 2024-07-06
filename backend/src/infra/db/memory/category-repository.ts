import { randomUUID } from "crypto";

import { Category } from "@/domain/entities/category";
import { ICategoryRepository } from "@/domain/repositories/category-repository";

export class CategoryRepositoryMemory implements ICategoryRepository {
  storage = {
    categories: [] as Category[],
  };

  async alreadyInUse(category: Category): Promise<boolean> {
    return this.storage.categories.some(
      ({ props }) =>
        props.name === category.props.name && props.id !== category.props.id,
    );
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.storage.categories.find(
      (category) => category.props.id === id,
    );

    if (!category) return null;

    return new Category({ ...category.props });
  }

  async create(category: Category): Promise<void> {
    const cloneCategory: Category = new Category({
      ...category.props,
      id: randomUUID(),
    });

    this.storage.categories.push(cloneCategory);
  }

  async update(category: Category): Promise<void> {
    const idx = this.storage.categories.findIndex(
      ({ props }) => props.id === category.props.id,
    );

    if (idx < 0) return;

    this.storage.categories[idx] = new Category({ ...category.props });
  }

  async remove(id: string): Promise<void> {
    const idx = this.storage.categories.findIndex(
      (category) => category.props.id === id,
    );

    if (idx < 0) return;

    this.storage.categories.splice(idx, 1);
  }
}
