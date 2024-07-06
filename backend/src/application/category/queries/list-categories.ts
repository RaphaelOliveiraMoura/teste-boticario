import { UseCase } from "@/application";
import { ICategoryDataSource } from "@/domain/data-sources/category";

export class ListCategoriesQuery implements UseCase<undefined, Output> {
  constructor(private readonly categoryDataSource: ICategoryDataSource) {}

  async execute(): Promise<Output> {
    return this.categoryDataSource.list();
  }
}

type Output = {
  id: string;
  name: string;
  description: string;
}[];
