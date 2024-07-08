import {
  DeleteCategoryUseCase,
  Output,
} from "@/domain/use-cases/category/delete";
import { freeze } from "@/infra/utils/freeze";

export class DeleteCategoryMemoryUseCase implements DeleteCategoryUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
