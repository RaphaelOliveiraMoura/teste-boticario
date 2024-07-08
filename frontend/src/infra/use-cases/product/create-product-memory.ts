import {
  CreateProductUseCase,
  Output,
} from "@/domain/use-cases/product/create";
import { freeze } from "@/infra/utils/freeze";

export class CreateProductMemoryUseCase implements CreateProductUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
