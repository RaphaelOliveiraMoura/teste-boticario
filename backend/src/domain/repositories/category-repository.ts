import { Category } from "../entities/category";

export interface ICategoryRepository {
  violateNameUniqueConstraint(name: string, id?: string): Promise<boolean>;

  findById(id: string): Promise<Category | null>;
  create(category: Category): Promise<void>;
  update(category: Category): Promise<void>;
  remove(id: string): Promise<void>;
}
