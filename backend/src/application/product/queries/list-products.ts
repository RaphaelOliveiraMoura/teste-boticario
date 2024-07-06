import { UseCase } from "@/application";
import { IProductDataSource } from "@/domain/data-sources/product";

export class ListCategoriesQuery implements UseCase<undefined, Output> {
  constructor(private readonly productDataSource: IProductDataSource) {}

  async execute(): Promise<Output> {
    return this.productDataSource.list();
  }
}

type Output = {
  id: string;
  name: string;
  description: string;
}[];
