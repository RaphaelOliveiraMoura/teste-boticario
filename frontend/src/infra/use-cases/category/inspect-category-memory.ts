import {
  InspectCategoryUseCase,
  Output,
} from "@/domain/use-cases/category/inspect";
import { freeze } from "@/infra/utils/freeze";

export class InspectCategoryMemoryUseCase implements InspectCategoryUseCase {
  async execute(): Promise<Output> {
    await freeze();
    return {
      id: "",
      name: "",
      description: "",
    };
  }
}
