import {
  CategoryDto,
  ICategoryDataSource,
} from "@/domain/data-sources/category";
import { Category } from "@/domain/entities/category";

export class CategoryDataSoruceMemory implements ICategoryDataSource {
  storage = [] as Category[];

  async inspect(id: string): Promise<CategoryDto | null> {
    const category = this.storage.find(({ props }) => props.id === id);

    if (!category) return null;

    return {
      id: category.props.id,
      name: category.props.name,
      description: category.props.description,
    };
  }

  async list(): Promise<CategoryDto[]> {
    return this.storage.map((category) => ({
      id: category.props.id,
      name: category.props.name,
      description: category.props.description,
    }));
  }
}
