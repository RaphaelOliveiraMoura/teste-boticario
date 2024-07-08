import { DeleteOrderUseCase, Output } from "@/domain/use-cases/order/delete";
import { freeze } from "@/infra/utils/freeze";

export class DeleteOrderMemoryUseCase implements DeleteOrderUseCase {
  async execute(): Promise<Output> {
    await freeze();
  }
}
