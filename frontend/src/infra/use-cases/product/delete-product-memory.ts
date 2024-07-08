import {
  DeleteProductUseCase,
  Output,
} from "@/domain/use-cases/product/delete";
import { freeze } from "@/infra/utils/freeze";

export class DeleteProductMemoryUseCase implements DeleteProductUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
