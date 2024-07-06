import { CategoryNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { ICategoryRepository } from "@/domain/repositories/category-repository";

export class DeleteCategoryCommand implements UseCase<Input, void> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: Input): Promise<void> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new CategoryNotFoundError(input.id);
    }

    await this.categoryRepository.remove(category.props.id);
  }
}

interface Input {
  id: string;
}
