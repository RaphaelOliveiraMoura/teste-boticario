import {
  CategoryDto,
  ICategoryDataSource,
} from "@/application/category/queries/data-source";
import { Category } from "@/domain/entities/category";

export class CategoryDataSoruceMemory implements ICategoryDataSource {
  storage = {
    categories: [] as Category[],
  };

  async inspect(id: string): Promise<CategoryDto | null> {
    const category = this.storage.categories.find(
      ({ props }) => props.id === id,
    );

    if (!category) return null;

    return {
      id: category.props.id,
      name: category.props.name,
      description: category.props.description,
    };
  }

  async list(): Promise<CategoryDto[]> {
    return this.storage.categories.map((category) => ({
      id: category.props.id,
      name: category.props.name,
      description: category.props.description,
    }));
  }
}
