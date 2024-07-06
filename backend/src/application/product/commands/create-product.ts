import { ProductAlreadyCreatedError } from "../errors/already-created";
import { CategoryNotFoundError } from "../errors/category-not-found";

import { UseCase } from "@/application";
import { Product } from "@/domain/entities/product";
import { ICategoryRepository } from "@/domain/repositories/category-repository";
import { IProductRepository } from "@/domain/repositories/product-repository";

export class CreateProductCommand implements UseCase<Input, void> {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const category = await this.categoryRepository.findById(input.idCategory);

    if (!category) {
      throw new CategoryNotFoundError(input.idCategory);
    }

    const product = new Product({
      id: "",
      category,
      ...input,
    });

    const alreadyCreated = await this.productRepository.alreadyInUse(product);

    if (alreadyCreated) {
      throw new ProductAlreadyCreatedError(input.name);
    }

    await this.productRepository.create(product);
  }
}

interface Input {
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: string;
  image: string;
  createdAt: Date;
}
