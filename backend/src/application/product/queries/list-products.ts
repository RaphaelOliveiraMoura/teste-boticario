import { UseCase } from "@/application";
import {
  IProductDataSource,
  ListProductDto,
} from "@/domain/data-sources/product";

export class ListProductsQuery implements UseCase<undefined, Output> {
  constructor(private readonly productDataSource: IProductDataSource) {}

  async execute(): Promise<Output> {
    return this.productDataSource.list();
  }
}

type Output = ListProductDto[];
