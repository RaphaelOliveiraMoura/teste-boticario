import { ProductAlreadyCreatedError } from "../errors/already-created";
import { ProductNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { IProductRepository } from "@/domain/repositories/product-repository";

export class UpdateProductCommand implements UseCase<Input, void> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: Input): Promise<void> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError(input.id);
    }

    product.props.name = input.name;
    product.props.description = input.description;

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
}
