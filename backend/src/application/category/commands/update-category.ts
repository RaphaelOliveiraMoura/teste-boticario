import { CategoryAlreadyCreatedError } from "../errors/already-created";
import { CategoryNotFoundError } from "../errors/not-foud";

import { UseCase } from "@/application";
import { ICategoryRepository } from "@/domain/repositories/category-repository";

export class UpdateCategoryCommand implements UseCase<Input, void> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: Input): Promise<void> {
    const category = await this.categoryRepository.findById(input.id);

    if (!category) {
      throw new CategoryNotFoundError(input.id);
    }

    category.props.name = input.name;
    category.props.description = input.description;

    const duplicatedCategory =
      await this.categoryRepository.alreadyInUse(category);

    if (duplicatedCategory) {
      throw new CategoryAlreadyCreatedError(input.name);
    }

    await this.categoryRepository.update(category);
  }
}

interface Input {
  id: string;
  name: string;
  description: string;
}
