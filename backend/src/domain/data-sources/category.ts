export interface InspectCategoryDto {
  id: string;
  name: string;
  description: string;
}

export interface ListCategoryDto {
  id: string;
  name: string;
  description: string;
}

export interface ICategoryDataSource {
  inspect(id: string): Promise<InspectCategoryDto | null>;
  list(): Promise<ListCategoryDto[]>;
}
