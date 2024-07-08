import {
  UpdateProductUseCase,
  Output,
} from "@/domain/use-cases/product/update";
import { freeze } from "@/infra/utils/freeze";

export class UpdateProductMemoryUseCase implements UpdateProductUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
