import { ProductNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import {
  IProductDataSource,
  InspectProductDto,
} from "@/domain/data-sources/product";

export class InspectProductQuery implements UseCase<Input, Output> {
  constructor(private readonly productDataSource: IProductDataSource) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productDataSource.inspect(input.id);

    if (!product) {
      throw new ProductNotFoundError(input.id);
    }

    return product;
  }
}

interface Input {
  id: string;
}

type Output = InspectProductDto;
