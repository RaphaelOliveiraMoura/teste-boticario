export interface CategoryDto {
  id: string;
  name: string;
  description: string;
}

export interface ICategoryDataSource {
  inspect(id: string): Promise<CategoryDto | null>;
  list(): Promise<CategoryDto[]>;
}
