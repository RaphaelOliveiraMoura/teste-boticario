import { ProductNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { IProductRepository } from "@/domain/repositories/product-repository";

export class DeleteProductCommand implements UseCase<Input, void> {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(input: Input): Promise<void> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError(input.id);
    }

    await this.productRepository.remove(product.props.id);
  }
}

interface Input {
  id: string;
}
