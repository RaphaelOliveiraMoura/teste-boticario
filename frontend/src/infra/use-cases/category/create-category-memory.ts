import {
  CreateCategoryUseCase,
  Output,
} from "@/domain/use-cases/category/create";
import { freeze } from "@/infra/utils/freeze";

export class CreateCategoryMemoryUseCase implements CreateCategoryUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
