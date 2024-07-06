import { randomUUID } from "crypto";

import { Category } from "@/domain/entities/category";
import { ICategoryRepository } from "@/domain/repositories/category-repository";

export class CategoryRepositoryMemory implements ICategoryRepository {
  storage = [] as Category[];

  async alreadyInUse(category: Category): Promise<boolean> {
    return this.storage.some(
      ({ props }) =>
        props.name === category.props.name && props.id !== category.props.id,
    );
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.storage.find((category) => category.props.id === id);

    if (!category) return null;

    return new Category({ ...category.props });
  }

  async create(category: Category): Promise<void> {
    const cloneCategory: Category = new Category({
      ...category.props,
      id: randomUUID(),
    });

    this.storage.push(cloneCategory);
  }

  async update(category: Category): Promise<void> {
    const idx = this.storage.findIndex(
      ({ props }) => props.id === category.props.id,
    );

    if (idx < 0) return;

    this.storage[idx] = new Category({ ...category.props });
  }

  async remove(id: string): Promise<void> {
    const idx = this.storage.findIndex((category) => category.props.id === id);

    if (idx < 0) return;

    this.storage.splice(idx, 1);
  }
}
