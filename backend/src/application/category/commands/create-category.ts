import { CategoryAlreadyCreatedError } from "../errors/already-created";

import { UseCase } from "@/application";
import { Category } from "@/domain/entities/category";
import { ICategoryRepository } from "@/domain/repositories/category-repository";

export class CreateCategoryCommand implements UseCase<Input, void> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: Input): Promise<void> {
    const alreadyCreated =
      await this.categoryRepository.violateNameUniqueConstraint(input.name);

    if (alreadyCreated) {
      throw new CategoryAlreadyCreatedError(input.name);
    }

    const category = new Category({
      id: "",
      name: input.name,
      description: input.description,
    });

    await this.categoryRepository.create(category);
  }
}

interface Input {
  name: string;
  description: string;
}
