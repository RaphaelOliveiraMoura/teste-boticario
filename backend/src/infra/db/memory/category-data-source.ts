import {
  InspectCategoryDto,
  ListCategoryDto,
  ICategoryDataSource,
} from "@/domain/data-sources/category";

export class CategoryDataSoruceMemory implements ICategoryDataSource {
  storage = [] as InspectCategoryDto[];

  async inspect(id: string): Promise<InspectCategoryDto | null> {
    const category = this.storage.find((category) => category.id === id);
    if (!category) return null;
    return category;
  }

  async list(): Promise<ListCategoryDto[]> {
    return this.storage;
  }
}
