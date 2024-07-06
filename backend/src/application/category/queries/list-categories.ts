import { ICategoryDataSource } from "./data-source";

import { UseCase } from "@/application";

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
