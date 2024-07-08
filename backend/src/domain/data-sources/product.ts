export interface InspectProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: string;
  category: string;
  image: string;
  createdAt: string;
}

export interface ListProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
}

export interface IProductDataSource {
  inspect(id: string): Promise<InspectProductDto | null>;
  list(): Promise<ListProductDto[]>;
}
