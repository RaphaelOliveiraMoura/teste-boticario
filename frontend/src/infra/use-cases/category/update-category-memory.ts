import {
  UpdateCategoryUseCase,
  Output,
} from "@/domain/use-cases/category/update";
import { freeze } from "@/infra/utils/freeze";

export class UpdateCategoryMemoryUseCase implements UpdateCategoryUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
