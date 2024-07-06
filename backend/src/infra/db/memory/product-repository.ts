import { randomUUID } from "crypto";

import { Product } from "@/domain/entities/product";
import { IProductRepository } from "@/domain/repositories/product-repository";

export class ProductRepositoryMemory implements IProductRepository {
  storage = [] as Product[];

  async alreadyInUse(product: Product): Promise<boolean> {
    return this.storage.some(
      ({ props }) =>
        props.name === product.props.name && props.id !== product.props.id,
    );
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.storage.find((product) => product.props.id === id);

    if (!product) return null;

    return new Product({ ...product.props });
  }

  async create(product: Product): Promise<void> {
    const cloneProduct: Product = new Product({
      ...product.props,
      id: randomUUID(),
    });

    this.storage.push(cloneProduct);
  }

  async update(product: Product): Promise<void> {
    const idx = this.storage.findIndex(
      ({ props }) => props.id === product.props.id,
    );

    if (idx < 0) return;

    this.storage[idx] = new Product({ ...product.props });
  }

  async remove(id: string): Promise<void> {
    const idx = this.storage.findIndex((product) => product.props.id === id);

    if (idx < 0) return;

    this.storage.splice(idx, 1);
  }
}
