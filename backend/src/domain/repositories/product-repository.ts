import { Product } from "../entities/product";

export interface IProductRepository {
  alreadyInUse(product: Product): Promise<boolean>;

  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  remove(id: string): Promise<void>;
}
