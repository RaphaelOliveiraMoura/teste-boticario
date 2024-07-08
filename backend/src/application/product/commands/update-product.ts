import { ProductAlreadyCreatedError } from "../errors/already-created";
import { CategoryNotFoundError } from "../errors/category-not-found";
import { ProductNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { ICategoryRepository } from "@/domain/repositories/category-repository";
import { IProductRepository } from "@/domain/repositories/product-repository";

export class UpdateProductCommand implements UseCase<Input, void> {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError(input.id);
    }

    const category = await this.categoryRepository.findById(input.idCategory);

    if (!category) {
      throw new CategoryNotFoundError(input.idCategory);
    }

    product.props.name = input.name;
    product.props.description = input.description;
    product.props.price = input.price;
    product.props.stock = input.stock;
    product.props.category = category;
    product.props.image = input.image;

    const duplicatedProduct =
      await this.productRepository.alreadyInUse(product);

    if (duplicatedProduct) {
      throw new ProductAlreadyCreatedError(input.name);
    }

    await this.productRepository.update(product);
  }
}

interface Input {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: string;
  image: string;
}
