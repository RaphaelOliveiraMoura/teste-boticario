import { ICategoryDataSource } from "./data-source";
import { CategoryNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";

export class InspectCategoryQuery implements UseCase<Input, Output> {
  constructor(private readonly categoryDataSource: ICategoryDataSource) {}

  async execute(input: Input): Promise<Output> {
    const category = await this.categoryDataSource.inspect(input.id);

    if (!category) {
      throw new CategoryNotFoundError(input.id);
    }

    return category;
  }
}

interface Input {
  id: string;
}

interface Output {
  id: string;
  name: string;
  description: string;
}
